import CONFIG from "../../../../configuration";
import Janus from "../janus.mobile";
import socketListeners from "./socket/socketListeners";
import requestHandler from "./requestHandler";
import gatewayCallbacks from "./callbacks/gatewayCallbacks";

export default class AudioBridge {
  initialized = false;
  socketEvents = [
    "create",
    "edit",
    "destroy",
    "allowed",
    "kick",
    "mute",
    "unmute",
    "muteSelf",
    "mute_room",
    "silenceUser",
    "muteUser",
    "unmute_room",
    "join",
    "configure",
    "changeRoom",
    "changeroom",
    "leave",
  ];
  server;
  dispatch;
  socket;
  opaqueID;
  roomNumber = 1234; //default
  _roomName;
  handler;
  janus;
  username;
  id;
  audio;
  webrtcUp;
  updates;
  spinner = null;

  constructor(server, socket) {
    this.opaqueID = Janus.randomString(12);
    this.server = server;
    this.socket = socket;
    // this.truncateString = this.truncateString.bind(this);
  }

  set roomName(name) {
    this._roomName = name;
    this.roomNumber = this.stringToNumberID(name);
  }

  get roomName() {
    return this._roomName;
  }

  initialize() {
    return new Promise((res, rej) => {
      Janus.init({
        debug: "all",
        callback: () => {
          this.initialized = true;
          console.log("initialized!");
          res(true);
        },
      });
    });
  }

  async createSession(dispatch) {
    if (!this.initialized) await this.initialize();
    return new Promise((res, rej) => {
      const callbacks = gatewayCallbacks(this, res, rej, dispatch);
      this.janus = new Janus(callbacks);
      setTimeout(() => rej("timeout"), 5000);
    });
  }

  static async connect({
    socket,
    server,
    dispatch,
    user,
    setListeners,
    currentRoom,
    InCallManager,
    retries,
    refresh,
  }) {
    if (retries && retries > 3)
      return dispatch({
        type: "audio/leave",
        payload: { lostConnection: true },
      });
    const janusServer = server || CONFIG.janusURL;
    this.dispatch = dispatch;
    if (setListeners) socket.disconnect();
    const isConnected = socket.connected;
    if (!isConnected) socket.connect();
    await new Promise((res, rej) => {
      if (setListeners) {
        socketListeners(socket, dispatch);
        if (!isConnected)
          socket.on("connect", () => {
            dispatch({ type: "audio/setSocketActive", payload: true });
            socket.emit("list-server");
            console.log("Connected!");
            res(true);
          });
      } else {
        res(true);
      }
    });

    console.log(
      "================================================================================"
    );
    console.log("Socket connected: " + socket.connected);
    console.log(
      "================================================================================"
    );
    const audioBridge = new AudioBridge(janusServer, socket);
    audioBridge.initialize();
    try {
      const success = await audioBridge.createSession(dispatch);
      console.log(success);
      if (success === true) {
        dispatch({ type: "audio/initBridge", payload: audioBridge });
        dispatch({ type: "audio/setDispatch", payload: dispatch });
        dispatch({
          type: "audio/reconnectingStatus",
          payload: { reconnecting: false, previousRoomID: 0 },
        });
        const init = {
          sessionID: audioBridge.handler.session.getSessionId(),
          pluginID: audioBridge.handler.getId(),
        };
        const { username, photo: userImage, firstName, lastName } = user;
        if (refresh) {
          if (InCallManager) {
            InCallManager.start({ media: "audio" });
            InCallManager.setSpeakerphoneOn(true);
            InCallManager.setForceSpeakerphoneOn(true);
          }
          setTimeout(
            () =>
              audioBridge.handler.send({
                message: {
                  request: "kick",
                  room: refresh.roomID,
                  id: audioBridge.stringToNumberID(refresh.username),
                },
              }),
            1000
          );
        }
        audioBridge.socket.emit("init", {
          username,
          userImage,
          firstName,
          lastName,
          roomID: currentRoom?.room,
          roomName: currentRoom?.roomName,
          muted: currentRoom?.muted,
          pluginID: init.pluginID,
          sessionID: init.sessionID,
        });
        if (retries) alert("Reconnection successful!");
        if (currentRoom) {
          const { room, display, muted } = currentRoom;
          const id = audioBridge.stringToNumberID(display);

          audioBridge.handler.send({
            message: { request: "kick", room, id },
            error: (error) => {
              console.warn("failed to kick participant");
            },
            success: async (s) => {
              setTimeout(() => {
                audioBridge.handler.send({
                  message: { request: "join", muted, room, display, id },
                  error: (error) => {
                    console.warn("failed to join room");
                  },
                  success: async (s) => {
                    console.warn("joined audiobridge room");
                  },
                });
              }, 3000);
            },
          });
        }
        /***********************Creation testing ***********************/
        //feel free to delete this code in production
        const newRoom = {
          roomName: user.username,
          roomID: audioBridge.stringToNumberID(user.username),
          creator: user.username,
          roomImage: "https://source.unsplash.com/random/700x700",
          category: "Testing Room Creation",
          description: "Testing Room Creation",
          conversationType: "Testing Room Creation",
          allowed: [],
          permanent: false,
          secret: "",
          tags: ["testing"],
          private: false,
          silence: true,
          pin: "",
          token: "testing",
          moderators: { [user.username]: { level: 3 } },
          speakers: [],
          silenced: [],
          banned: [],
          participants: {},
        };
        username === "Testing" &&
          dispatch({ type: "audio/create", payload: newRoom });
        /***********************Creation testing end ***********************/
      } else {
        console.warn("failed to create session on success");
      }
    } catch (error) {
      console.warn("failed to create session, rejected");
      if (error === "timeout") {
        let retried = retries || 0;
        retried++;
        alert("Attempting to reconnect to server... " + retried);
        this.connect({
          socket,
          server,
          dispatch,
          user,
          setListeners,
          currentRoom,
          InCallManager,
          retries: retried,
        });
      }
    }
  }
  stringToNumberID(str) {
    if (str === "") return "Empty string not valid.";
    const max = 15;
    const newString = str
      .split("")
      .map((char) => char.charCodeAt(0))
      .join("");
    let truncString = this.truncateString(newString, max).toString();
    if (truncString.length < 15) {
      truncString += newString.slice(0, 15 - truncString.length);
    }
    return parseInt(truncString);
  }

  truncateString(str, maxLength) {
    const length = str.length;
    if (length > maxLength) {
      const half = Math.floor(length / 2);
      const combined =
        this.truncateString(str.slice(0, half), maxLength) +
        this.truncateString(str.slice(half, length), maxLength);
      return combined;
    } else {
      return parseInt(str);
    }
  }
  async request(name, state, payload) {
    try {
      const response = await requestHandler(name, state, payload);
      return response;
    } catch (error) {
      console.log("------------------------request error");
      console.log(error);
      if (error) {
        if (error.socketConnection === false) {
          state.audio.dispatch({
            type: "audio/reInit",
            payload: { socketDisconnect: true },
          });
        }
        if (error.code === 458) {
          state.audio.dispatch({
            type: "audio/reInit",
            payload: { initAudioBridge: true },
          });
        }
      }
      if (error.error && error.error.message?.includes("initialized")) {
        console.log("--------------------Not initialized, so reInit");
        state.audio.dispatch({ type: "audio/reInit", payload: {} });
      }
      return error;
    }
  }
}
