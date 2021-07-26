/**
 * 7th Ave - Audio Model
 *
 * This is the Audio model for the application
 * All audio state functionality is managed here
 *
 */
import { io } from "socket.io-client";
import { OnChatData } from "../../@types/global";
import { navigate } from "../../routers/RootNavigation";
import AudioBridge from "../janus/AudioBridge";
import socketResponse from "../janus/AudioBridge/socket/socketResponse";
import InCallManager from "react-native-incall-manager";
import { Alert, DeviceEventEmitter } from "react-native";
import CONFIG from "../../../configuration";
/**
 * AWS
 */
// import { Analytics } from "aws-amplify";

const initState = {
  handsModal: false,
  leaveModal: false,
  error: "",
  inRoom: false,
  socketActive: false,
  calling: false,
  showSheet: false,
  minimized: false,
  localStream: { toURL: () => null },
  socket: io(CONFIG.metaSeventhURL),
  // socket: io("http://192.168.1.2:4000"),
  yield: null,
  audioBridge: null,
  roomList: [],
  chat: [],
  handsRaised: {
    previousTime: 0,
  },
  previousRoomID: 0,
  reconnecting: false,
  nameFromID: {},
  speakerInvitation: {
    sender: { username: "", firstName: "", lastName: "", id: "" },
    invitation: false,
  },
  currentRoom: {
    category: "",
    roomID: 31531531467,
    roomName: "",
    description: "",
    conversationType: "",
    createdAt: "",
    roomImage: "",
    tags: [],
    secret: "",
    permanent: false,
    allowed: [],
    banned: [],
    silenced: [],
    speakers: [],
    silence: false,
    creator: "",
    moderators: {},
    private: false,
    pin: "",
    participants: {},
  },
};

export default {
  namespace: "audio",
  state: initState,
  reducers: {
    // Modal Controls
    closeHandsModal(state: any, { payload }: any) {
      return {
        ...state,
        handsModal: false,
      };
    },
    openHandsModal(state: any, { payload }: any) {
      return {
        ...state,
        handsModal: true,
      };
    },
    closeLeaveModal(state: any, { payload }: any) {
      return {
        ...state,
        leaveModal: false,
      };
    },
    openLeaveModal(state: any, { payload }: any) {
      return {
        ...state,
        leaveModal: true,
      };
    },
    // End Modal Controls
    changeUserId(state: any, { payload }: any) {
      return {
        ...state,
        userId: payload,
      };
    },
    changeRemoteList(state: any, { payload }: any) {
      return {
        ...state,
        remoteList: payload,
      };
    },

    setShowSheet(state: any, { payload }: any) {
      return {
        ...state,
        showSheet: payload,
      };
    },
    setMinimized(state: any, { payload }: any) {
      return {
        ...state,
        minimized: payload,
      };
    },
    setRoomID(state: any, { payload }: any) {
      return {
        ...state,
        roomID: payload,
      };
    },
    setCalling(state: any, { payload }: any) {
      return {
        ...state,
        calling: payload,
      };
    },
    setLocalStream(state: any, { payload }: any) {
      return {
        ...state,
        localStream: payload,
      };
    },
    setRemoteStream(state: any, { payload }: any) {
      return {
        ...state,
        remoteStream: payload,
      };
    },
    setError(state: any, { payload }: any) {
      return {
        ...state,
        error: payload,
      };
    },
    chat(state: any, { payload }: any) {
      return {
        ...state,
        chat: [...state.chat, payload],
      };
    },

    /**********************************AudioBridge**************************************/

    initBridge(state: any, { payload }: any) {
      return {
        ...state,
        audioBridge: payload,
      };
    },

    clearAudioBridge(state: any, { payload }: any) {
      return {
        ...state,
        audioBridge: null,
      };
    },

    setDispatch(state: any, { payload }: any) {
      return {
        ...state,
        dispatch: payload,
      };
    },

    setSocketActive(state: any, { payload }: any) {
      return {
        ...state,
        socketActive: payload,
      };
    },
    sendChat(state: any, { payload }: any) {
      return {
        ...state,
        chat: [...state.chat, payload],
      };
    },
    createRoom(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    leaveRoom(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
        inRoom: false,
        handsRaised: { previousTime: 0 },
        nameFromID: {},
      };
    },
    enterRoom(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    mute(state: any, { payload }: any) {
      return { ...state, currentRoom: payload };
    },
    banned(state: any, { payload }: any) {
      const roomList = state.roomList.map((room: any) => {
        if (room.roomID === state.currentRoom.roomID) {
          room.banned.push(payload);
          return room;
        } else return room;
      });
      return { ...state, roomList };
    },
    kickUser(state: any, { payload }: { payload: any }) {
      return { ...state, ...payload };
    },
    userMuted(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    addModerator(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    setSpeaker(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    reconnectingStatus(state: any, { payload }: any) {
      return { ...state, ...payload };
    },
    talking(state: any, { payload }: any) {
      const participants = { ...state.currentRoom.participants };
      if (!state.nameFromID[payload]) return state;
      participants[state.nameFromID[payload]].talking = true;
      return {
        ...state,
        currentRoom: { ...state.currentRoom, participants },
      };
    },
    stoppedTalking(state: any, { payload }: any) {
      const participants = { ...state.currentRoom.participants };
      if (typeof payload === "number") {
        if (!state.nameFromID[payload]) return state;
        participants[state.nameFromID[payload]].talking = false;
      } else participants[payload].talking = false;
      return {
        ...state,
        currentRoom: { ...state.currentRoom, participants },
      };
    },
    handRaised(state: any, { payload }: { payload: any }) {
      const user = Object.keys(payload)[0];
      const handRaised = Object.values(payload)[0];
      const handsRaised = { ...state.handsRaised };
      handsRaised[user] ? delete handsRaised[user] : (handsRaised[user] = true);
      payload.previousTime && (handsRaised.previousTime = payload.previousTime);
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          participants: {
            ...state.currentRoom.participants,
            [user]: { ...state.currentRoom.participants[user], handRaised },
          },
        },
        handsRaised,
      };
    },
    handResolved(state: any, { payload }: { payload: any }) {
      const { participant, moderator } = payload;
      const handsRaised = { ...state.handsRaised };
      handsRaised[participant] && delete handsRaised[participant];
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          participants: {
            ...state.currentRoom.participants,
            [participant]: {
              ...state.currentRoom.participants[participant],
              handRaised: false,
            },
          },
        },
        handsRaised,
      };
    },
    roomUserID(state: any, { payload }: any) {
      const currentRoom = { ...state.currentRoom };
      const { username, roomUserID } = payload;
      if (!currentRoom.participants[username]) return state;
      currentRoom.participants[username].roomUserID = roomUserID;
      return {
        ...state,
        nameFromID: { ...state.nameFromID, [roomUserID]: username },
        currentRoom,
      };
    },
    changeRoomList(state: any, { payload }: any) {
      return {
        ...state,
        roomList: payload,
      };
    },
    participantJoined(state: any, { payload }: any) {
      const participants = { ...state.currentRoom.participants };
      participants[payload.username] = payload;
      return {
        ...state,
        currentRoom: { ...state.currentRoom, participants },
      };
    },
    participantLeft(state: any, { payload }: any) {
      const participants = { ...state.currentRoom.participants };
      delete participants[payload.username];
      const speakers = [...state.currentRoom.speakers];
      const index = speakers.indexOf(payload.username);
      const handsRaised = { ...state.handsRaised };
      handsRaised[payload.username] && delete handsRaised[payload.username];
      if (index !== -1) speakers.splice(index, 1);
      const moderators = { ...state.currentRoom.moderators };
      if (moderators[payload.username]) delete moderators[payload.username];
      return {
        ...state,
        handsRaised,
        currentRoom: {
          ...state.currentRoom,
          participants,
          speakers,
          moderators,
        },
      };
    },
    participantMute(state: any, { payload }: any) {
      // alert(`${payload.username} is ${!payload.muted ? "now unmuted" : "muted"}`);
      const participants = { ...state.currentRoom.participants };
      participants[payload.username].muted = payload.muted;
      return {
        ...state,
        currentRoom: { ...state.currentRoom, participants },
      };
    },
    newRoom(state: any, { payload }: any) {
      const newArray = [...state.roomList, payload];
      const uniqueRooms = newArray.filter(function (item, pos) {
        return newArray.indexOf(item) == pos;
      });
      return {
        ...state,
        roomList: uniqueRooms,
      };
    },
    cleanRoom(state: any, { payload }: any) {
      return {
        ...state,
        inRoom: false,
        handsRaised: { previousTime: 0 },
        nameFromID: {},
        currentRoom: initState.currentRoom,
        roomList: state.roomList.filter((room: any) => room.roomID !== payload),
      };
    },
    setInvite(state: any, { payload }: any) {
      return { ...state, speakerInvitation: payload };
    },
  },
  effects: {
    *kick({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const { audioBridge, dispatch } = state.audio;
      if (payload.username === state.user.username)
        return dispatch({
          type: "app/newInAppNotification",
          payload: {
            title: "Cannot Self Kick",
            message: `You can't kick yourself from a room.`,
          },
        });
      const response = yield audioBridge.request("kick", state, payload);
      if (response.error) return console.log(response.error);
      yield put({
        type: "kickUser",
        payload: response,
      });
      return dispatch({
        type: "app/newInAppNotification",
        payload: {
          type: "action",
          title: "User Kicked",
          message: `You've just kicked ${payload.username} from this room.`,
        },
      });
    },
    *muteSelf({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const { audioBridge } = state.audio;
      const response = yield audioBridge.request("muteSelf", state, payload);
      if (response.error) return console.log(response.error);
      console.log(response.currentRoom);

      yield put({
        type: "mute",
        payload: response,
      });
    },

    *raiseHand({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const username = state.user.username;
      const currentTime = new Date().getTime();
      const dispatch = state.audio.dispatch;
      const handCooldown = currentTime - state.audio.handsRaised.previousTime;
      let raised = false;
      if (!state.audio.handsRaised[username]) raised = true;
      else {
        yield put({
          type: "handResolved",
          payload: { participant: username },
        });
        return state.audio.socket.emit("hand-resolved", username);
      }
      if (handCooldown > 120000) {
        state.audio.socket.emit("hand-raised", raised);
        yield put({
          type: "handRaised",
          payload: { [username]: raised, previousTime: currentTime },
        });
      } else if (raised)
        dispatch({
          type: "app/newInAppNotification",
          payload: {
            title: "Hand Timer",
            message: `You can only raise your hand every 2 minutes. ${Math.floor(
              (120000 - handCooldown) / 1000
            )} seconds until you can raise your hand again.`,
          },
        });
      else
        dispatch({
          type: "app/newInAppNotification",
          payload: {
            type: "action",
            title: "Hand Lowered",
            message: `Your hand has been lowered.`,
          },
        });
    },

    *userSilenced({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const dispatch = state.audio.dispatch;
      const currentRoom = { ...state.audio.currentRoom };
      if (payload.muted) {
        if (state.user.username === payload.username)
          dispatch({
            type: "app/newInAppNotification",
            payload: {
              title: "Silenced",
              message: "You've been silenced.",
            },
          });
        else
          dispatch({
            type: "app/newInAppNotification",
            payload: {
              title: "Silenced",
              message: payload.username + " has been silenced.",
            },
          });
        currentRoom.silenced.push(payload.username);
        currentRoom.participants[payload.username].muted = true;
      } else {
        if (state.user.username === payload.username)
          dispatch({
            type: "app/newInAppNotification",
            payload: {
              type: "action",
              title: "Unsilenced",
              message: "You've been unsilenced.",
            },
          });
        else
          dispatch({
            type: "app/newInAppNotification",
            payload: {
              type: "action",
              title: "Unsilenced",
              message: payload.username + " has been unsilenced.",
            },
          });
        let index = currentRoom.silenced.indexOf(payload.username);
        if (index !== -1) currentRoom.silenced.splice(index, 1);
      }

      return yield put({
        type: "userMuted",
        payload: { currentRoom },
      });
    },

    *silenceUser({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      if (state.user.username === payload.username) return;
      const { audioBridge } = state.audio;
      const response = yield audioBridge.request("silenceUser", state, payload);
      if (response.error) return console.log(response.error);
      yield put({
        type: "userMuted",
        payload: response,
      });
    },
    *muteUser({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      if (state.user.username === payload.username) return;
      const { audioBridge } = state.audio;
      const response = yield audioBridge.request("muteUser", state, payload);
      if (response.error) return console.log(response.error);
      yield put({
        type: "userMuted",
        payload: response,
      });
    },

    *newModerator({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const dispatch = state.audio.dispatch;
      if (payload.level) {
        if (state.user.username === payload.username)
          dispatch({
            type: "app/newInAppNotification",
            payload: {
              type: "action",
              title: "Promoted To Moderator",
              message: `You've been promoted to a level ${payload.level} moderator.`,
            },
          });
        else
          dispatch({
            type: "app/newInAppNotification",
            payload: {
              type: "action",
              title: "Moderator Promotion",
              message: "A user has been promoted.",
            },
          });
        const currentRoom = { ...state.audio.currentRoom };
        currentRoom.moderators[payload.username] = { level: payload.level };
        return yield put({
          type: "addModerator",
          payload: { currentRoom },
        });
      }
      const { audioBridge } = state.audio;
      const response = yield audioBridge.request(
        "newModerator",
        state,
        payload
      );
      if (response.error) return console.log(response.error);
      console.log(response.currentRoom);
      delete response.complete;
      yield put({
        type: "addModerator",
        payload: response,
      });
    },

    *addSpeaker({ payload }: any, { call, put, select }: any): any {
      const currentRoom: any = yield select((state: any) => {
        return { ...state.audio.currentRoom };
      });
      const dispatch: any = yield select((state: any) => state.audio.dispatch);
      if (currentRoom.speakers.length > 5) {
        return dispatch({
          type: "app/newInAppNotification",
          payload: {
            title: "Speaker Limit Reached",
            message:
              "We're sorry, only six speakers are allowed on stage at any given time.",
          },
        });
      }
      const { participant, moderator } = payload;
      const username: any = yield select((state: any) => state.user.username);
      const socket: any = yield select((state: any) => state.audio.socket);
      if (participant === username) {
        socket.emit("speaker", true);
      }
      if (!currentRoom.speakers.includes(participant))
        currentRoom.speakers.push(participant);
      const handsRaised: any = yield select((state: any) => {
        return { ...state.audio.handsRaised };
      });
      if (handsRaised[participant]) {
        delete handsRaised[participant];
        currentRoom.participants[participant].handRaised = false;
      }
      moderator &&
        dispatch({
          type: "app/newInAppNotification",
          payload: {
            type: "action",
            title: "New Speaker",
            message: `${participant} has been brought on stage.`,
          },
        });
      yield put({ type: "setSpeaker", payload: { handsRaised, currentRoom } });
    },

    *removeSpeaker({ payload }: any, { call, put, select }: any): any {
      const { participant, moderator } = payload;
      const socket: any = yield select((state: any) => state.audio.socket);
      const dispatch: any = yield select((state: any) => state.audio.dispatch);
      const username: any = yield select((state: any) => state.user.username);
      if (participant === username) {
        socket.emit("speaker", false);
      }
      const currentRoom: any = yield select((state: any) => {
        return { ...state.audio.currentRoom };
      });
      const index = currentRoom.speakers.indexOf(participant);
      if (index !== -1) currentRoom.speakers.splice(index, 1);
      moderator &&
        dispatch({
          type: "app/newInAppNotification",
          payload: {
            type: "action",
            title: "Speaker Removed",
            message: `${participant} has been removed as a speaker.`,
          },
        });
      yield put({ type: "setSpeaker", payload: { currentRoom } });
    },
    *speakerInvitation({ payload }: any, { call, put, select }: any): any {
      const { firstName, lastName, username, socket, speakerInvitation }: any =
        yield select((state: any) => {
          return {
            username: state.user.username,
            firstName: state.user.firstName,
            lastName: state.user.lastName,
            socket: state.audio.socket,
            speakerInvitation: state.audio.speakerInvitation,
          };
        });
      switch (payload) {
        case "accept":
          socket.emit("invite-response", {
            accepted: true,
            to: speakerInvitation.sender.id,
            from: { username, firstName, lastName },
          });
          socket.emit("new-speaker", username);
          const res = yield socketResponse(socket, "new-speaker-successful");
          if (res.error) return console.log(res.error);
          yield put({
            type: "addSpeaker",
            payload: { participant: username },
          });
          yield put({
            type: "setInvite",
            payload: {
              sender: { username: "", firstName: "", lastName: "", id: "" },
              invitation: false,
            },
          });
          break;
        case "decline":
          socket.emit("invite-response", {
            accepted: false,
            to: speakerInvitation.sender.id,
            from: { username, firstName, lastName },
          });
          yield put({
            type: "setInvite",
            payload: {
              sender: { username: "", firstName: "", lastName: "", id: "" },
              invitation: false,
            },
          });
          break;
        default:
          yield put({
            type: "setInvite",
            payload: { sender: payload, invitation: true },
          });
          break;
      }
    },
    *inviteResponse(
      { payload }: { payload: any },
      { call, put, select }: any
    ): any {
      const dispatch: any = yield select((state: any) => state.audio.dispatch);
      dispatch({
        type: "app/newInAppNotification",
        payload: {
          title: "Speaker Invitation",
          message: `${payload.from.firstName} ${payload.from.lastName} has ${
            payload.accepted ? "accepted" : "declined"
          } your invitation to speak.`,
          type: "action",
        },
      });
    },
    *speaker({ payload }: { payload: any }, { call, put, select }: any): any {
      // Send whole render item
      const socket: any = yield select((state: any) => state.audio.socket);
      if (!socket) return console.log("no socket available.");
      const moderators: any = yield select(
        (state: any) => state.audio.currentRoom.moderators
      );
      const participants: any = yield select(
        (state: any) => state.audio.currentRoom.participants
      );
      const username: any = yield select((state: any) => state.user.username);
      if (!moderators[username]) return console.log("You are not a moderator");
      const speakers: any = yield select(
        (state: any) => state.audio.currentRoom.speakers
      );
      if (!speakers.includes(payload.username)) {
        if (payload.username === username) {
          socket.emit("new-speaker", username);
          const res = yield socketResponse(socket, "new-speaker-successful");
          if (res.error) return console.log(res.error);
          return yield put({
            type: "addSpeaker",
            payload: { participant: username },
          });
        } else {
          const participant = participants[payload.username];
          socket.emit("invite-speaker", participant);
        }
      } else {
        socket.emit("remove-speaker", payload.username);
        const res = yield socketResponse(socket, "remove-speaker-successful");
        if (res.error) return console.log(res.error);
        yield put({
          type: "removeSpeaker",
          payload: { participant: payload.username },
        });
        // alert(participants[payload.username].muted);
        if (!participants[payload.username].muted) {
          yield put({
            type: "muteUser",
            payload: {
              username: payload.username,
              id: participants[payload.username].roomUserID,
            },
          });
        }
      }
    },
    *create({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const { audioBridge } = state.audio;
      if (!audioBridge) {
        return yield put({
          type: "reInit",
          payload: { initAudioBridge: true },
        });
      }
      const newPayload = {
        ...payload,
        roomID: audioBridge.stringToNumberID(payload.roomName),
        token: audioBridge.stringToNumberID(payload.roomName),
        description: JSON.stringify(payload),
      };
      payload.roomID = audioBridge.stringToNumberID(payload.roomName);
      payload.token = audioBridge.stringToNumberID(payload.roomName);
      const response = yield audioBridge.request("create", state, newPayload);
      response.currentRoom.speakerInvitation = {
        sender: { username: "", firstName: "", lastName: "", id: "" },
        invitation: false,
      };

      if (response.error) return console.log(response.error);
      yield put({
        type: "createRoom",
        payload: response,
      });
      console.log("navigate chat");
      yield InCallManager.start({ media: "audio" });
      yield InCallManager.setSpeakerphoneOn(true);
      yield InCallManager.setForceSpeakerphoneOn(true);
      yield navigate("Chat", { screen: "Room" });

      // Analytics.record({
      //   name: "Room Created",
      //   // Attribute values must be strings
      //   attributes: {
      //     username: state.user.username,
      //     roomName: payload.roomName,
      //   },
      // });
    },
    *fetchRooms({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const { audioBridge } = state.audio;
      const response = yield audioBridge.request("list", state);
      console.log("response rooms::", response);
      yield put({
        type: "changeRoomList",
        payload: response,
      });
    },
    *enter({ payload }: any, { call, put, select }: any): any {
      const socket: any = yield select((state: any) => state.audio.socket);
      const dispatch: any = yield select((state: any) => state.audio.dispatch);
      socket.emit("get-participants", payload.roomID);
      try {
        const participants = yield socketResponse(
          socket,
          "get-participants-successful"
        );
        if (Object.keys(participants).length > 19)
          return dispatch({
            type: "app/newInAppNotification",
            payload: {
              title: "Room Full",
              message: "We're sorry, this room has reached its max capacity.",
            },
          });
      } catch (error) {
        console.log(error);
        return;
      }
      const state: any = yield select((state: any) => state);
      const audioBridge = yield select((state: any) => state.audio.audioBridge);
      const user: any = yield select((state: any) => state.audio.user);
      if (!audioBridge) {
        yield AudioBridge.connect({
          socket,
          dispatch,
          user,
          setListeners: true,
        });
      } else !socket.connected && socket.connect();

      const response = yield audioBridge.request("join", state, payload);
      if (response.error) {
        yield put({ type: "leave", payload: {} });
        return console.log(response.error);
      }
      const nameFromID: any = {};
      for (let participant in response.participants) {
        if (response.participants[participant].roomUserID)
          nameFromID[response.participants[participant].roomUserID] =
            participant;
      }
      if (!response.currentRoom || !response.currentRoom.participants)
        return console.warn(response.currentRoom);
      yield put({
        type: "enterRoom",
        payload: {
          nameFromID,
          speakerInvitation: {
            sender: { username: "", firstName: "", lastName: "", id: "" },
            invitation: false,
          },
          handsRaised: {
            previousTime: 0,
          },
          ...response,
        },
      });
      InCallManager.start({ media: "audio" });
      InCallManager.setSpeakerphoneOn(true);
      InCallManager.setForceSpeakerphoneOn(true);
      yield navigate("Chat", { screen: "Room" });
    },
    *leave({ payload }: any, { call, put, select }: any): any {
      const state: any = yield select((state: any) => state);
      const { username } = state.user;
      const { currentRoom } = state.audio;
      if (!state.audio.inRoom) return;
      if (payload === "banned") {
        yield put({
          type: "banned",
          payload: username,
        });
      }
      if (payload?.socketDisconnect && !payload.lostConnection) {
        return yield put({
          type: "reInit",
          payload: {},
        });
      }
      yield put({
        type: "leaveRoom",
        payload: {
          currentRoom: initState.currentRoom,
          previousRoomID: payload?.lostConnection ? currentRoom.roomID : 0,
        },
      });
      yield put({
        type: "setMinimized",
        payload: false,
      });
      yield navigate("Home", {});
      const { audioBridge } = state.audio;
      InCallManager.stop();
      const response = yield audioBridge?.request("leave", state, payload);
      if (payload === "destroyed") {
        const dispatch: any = yield select(
          (state: any) => state.audio.dispatch
        );
        dispatch({
          type: "app/newInAppNotification",
          payload: {
            title: "Conversation Ended",
            message:
              "The last moderator has left the room 😪 or all the bandwidth is being used, thank you for your patience as we build together in beta.",
          },
        });
        // Alert.alert(
        //   "The creator has ended the room 😪 or all the bandwidth is being used, thank you for your patience as we build together in beta, please either close your app and re-open or wait 2 minutes or so for your connection to re-initialize"
        // );
      }
      if (response?.error) console.log(response.error);
    },
    *sendChatMessage(
      { payload }: { payload: OnChatData },
      { call, put, select }: any
    ): any {
      const socket: any = yield select((state: any) => state.audio.socket);
      const username: any = yield select((state: any) => state.user.username);
      const { currentRoom }: any = yield select((state: any) => state.audio);
      yield put({
        type: "sendChat",
        payload: { ...payload, username, createdAt: new Date().toISOString() },
      });
      if (socket) {
        yield socket.emit("chat", payload);
        // Analytics.record({
        //   name: "Chat Message",
        //   // Attribute values must be strings
        //   attributes: { username: username, roomName: currentRoom.roomName },
        // });
      }
    },
    *minimize({ payload }: any, { call, put, select }: any) {
      const currentState: boolean = yield select(
        (state: any) => state.audio.minimized
      );
      yield put({
        type: "setMinimized",
        payload: !currentState,
      });
    },
    *reInit({ payload }: any, { call, put, select }: any): any {
      console.log("-------------Reinitializing");
      const audioState: any = yield select((state: any) => {
        return { ...state.audio };
      });
      const user: any = yield select((state: any) => {
        return { ...state.user };
      });
      const {
        socket,
        audioBridge,
        currentRoom: cR,
        inRoom,
        dispatch: dp,
        reconnecting,
      } = audioState;
      if (reconnecting) return;
      const currentRoom = { ...cR };
      const muted =
        currentRoom.participants[user.username] &&
        currentRoom.participants[user.username].muted;
      let dispatch = dp;
      if (!dispatch && audioBridge) dispatch = audioBridge.dispatch;
      if (payload && payload.initAudioBridge) {
        if (audioBridge) {
          for (let s in audioBridge.janus.sessions) {
            if (
              audioBridge.janus.sessions[s] !== null &&
              audioBridge.janus.sessions[s] !== undefined &&
              audioBridge.janus.sessions[s].destroyOnUnload
            ) {
              audioBridge.janus.log("Destroying session " + s);
              audioBridge.janus.sessions[s].destroy();
            }
          }
          audioBridge.janus.destroy();
        }
        // InCallManager.stop();
        yield put({
          type: "reconnectingStatus",
          payload: { reconnecting: true },
        });
        if (inRoom) {
          const room = {
            display: user.username,
            room: currentRoom.roomID,
            muted,
            roomName: currentRoom.roomName,
          };
          // socket.emit("leave");
          yield AudioBridge.connect({
            socket,
            user,
            dispatch,
            currentRoom: room,
            InCallManager,
          });
        } else {
          console.warn("not in room but audioBridge reconnection");
          yield AudioBridge.connect({ socket, user, dispatch });
        }
      } else {
        reconnectSockets(0);
      }
      async function reconnectSockets(retries: number) {
        if (retries > 3) {
          console.log("MAX retries reached");
          return await dispatch({
            type: "leave",
            payload: { socketDisconnect: true, lostConnection: true },
          });
        }
        let connectionRetries = retries;
        // alert("reconnecting sockets ");
        console.log("reconnecting sockets ");
        let initPayload: any = {
          username: user.username,
          userImage: user.photo,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        if (inRoom) {
          initPayload.roomID = currentRoom.roomID;
          initPayload.roomName = currentRoom.roomName;
          initPayload.muted = muted;
        }
        if (audioBridge && audioBridge.handler) {
          initPayload.sessionID = audioBridge.handler.session.getSessionId();
          initPayload.pluginID = audioBridge.handler.getId();
        }
        socket.disconnect();
        socket.connect();
        socket.emit("init", initPayload);
        console.log(socket._callbacks);
        try {
          await socketResponse(socket, "init-successful");
          await dispatch({
            type: "audio/reconnectingStatus",
            payload: { reconnecting: false, previousRoomID: 0 },
          });
          console.warn("init-successful");
        } catch (e) {
          setTimeout(() => reconnectSockets(connectionRetries + 1), 1000);
        }
      }
    },

    *checkHanging({ payload }: any, { call, put, select }: any): any {
      const creator = yield select(
        (state: any) => state.audio.currentRoom.creator
      );
      const socket = yield select((state: any) => state.audio.socket);
      const roomID = yield select(
        (state: any) => state.audio.currentRoom.roomID
      );
      const username = yield select((state: any) => state.user.username);
      if (creator !== username) {
        socket.emit("destroy", roomID);
        yield put({
          type: "leave",
          payload: "destroyed",
        });
      }
    },
    *checkAvailable({ payload }: any, { call, put, select }: any): any {
      const username = yield select((state: any) => state.user.username);
      if (username !== payload.username) return;
      const { inRoom, socket } = yield select((state: any) => state.audio);
      if (!inRoom) socket.emit("available", false);
      socket.emit("available", true);
    },
    *roomDestroyed({ payload }: any, { call, put, select }: any): any {
      const roomList: any = yield select((state: any) => state.audio.roomList);
      const list = roomList.filter((room: any) => room.roomID !== payload);
      yield put({
        type: "changeRoomList",
        payload: list,
      });
    },
  },
};
