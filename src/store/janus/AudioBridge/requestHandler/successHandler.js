import axios from "axios";
import socketResponse from "../socket/socketResponse";
import { audioBridgeCallbacks } from "../callbacks/pluginCallbacks";
import * as requests from "./requests";

export default async function successHandler({ state, audioBridge, currentRoom, name, request, data, reqData, body, extra }) {
  // console.log("SUCCESS!!!", successData);
  if (!audioBridge.socket.connected || !audioBridge.socketEvents.includes(name))
    return {
      socketConnection: audioBridge.socket.connected,
      error: `Either the socket is not connected or the event name you entered is not allowed. isConnected: ${audioBridge.socket.connected} eventName: ${name}`,
    };
  let response = false;
  try {
    switch (request) {
      case "create":
        audioBridge.socket.emit("create", extra);
        response = await socketResponse(audioBridge.socket, "create-successful");
        audioBridge.handler.send({
          message: {
            request: "join",
            room: extra.roomID,
            display: extra.creator,
            muted: extra.muted,
            id: audioBridge.stringToNumberID(extra.creator),
          },
          success: () => {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ join success");
            audioBridge.socket.emit("room-user-id", {
              id: extra.id,
              roomID: extra.roomID,
            });
          },
        });
        return await setCurrentRoom({ type: "create", data: extra });

      case "configure":
        return await requests.configure({
          state,
          currentRoom,
          name,
          audioBridge,
          extra,
        });

      case "join":
        audioBridge.socket.emit("join", extra);
        response = await socketResponse(audioBridge.socket, "join-successful");
        audioBridge.socket.emit("room-user-id", {
          id: extra.id,
          roomID: extra.roomID,
        });
        audioBridge.handler.send({ message: { request: "configure", muted: true } });
        return await setCurrentRoom({ state, data, extra, audioBridge });

      case "kick":
        audioBridge.socket.emit("ab_kick", extra);
        delete currentRoom.participants[data.username];
        return { currentRoom };

      case "leave":
        audioBridge.socket.emit("leave");
        const pluginID = audioBridge.handler.getId();
        audioBridge.janus.destroyHandler(pluginID, { success: () => console.warn("handle destroyed") });
        await new Promise((res, rej) => audioBridge.janus.attach(audioBridgeCallbacks(audioBridge, res, rej)));
        console.warn("attached");
        response = await socketResponse(audioBridge.socket, "leave-successful");
        audioBridge.socket.emit("list-server");
        return {
          inRoom: false,
          currentRoom: { ...state.audio.currentRoom, roomID: 1010 },
        };

      case "mute":
        audioBridge.socket.emit("ab_mute", extra);
        currentRoom.participants[extra.username].muted = extra.muted;
        extra.useSilence && currentRoom.silenced.push(extra.username);
        return { currentRoom };

      case "unmute":
        audioBridge.socket.emit("ab_mute", extra);
        currentRoom.participants[extra.username].muted = extra.muted;
        if (extra.useSilence) {
          let index = currentRoom.silenced.indexOf(extra.username);
          if (index !== -1) currentRoom.silenced.splice(index, 1);
        }
        if (data.handRaised) {
          audioBridge.socket.emit("hand-resolved", data.username);
          currentRoom.participants[data.username].handRaised = false;
        }
        return { currentRoom };

      case "changeroom":
        audioBridge.socket.emit("ab_changeroom", {
          req: body,
          res: null,
          extra,
        });
        audioBridge.handler.send({ message: { request: "configure", muted: true } });
        return await setCurrentRoom({
          state,
          data: reqData.data,
          extra,
          audioBridge,
        });

      case "list":
        console.log("list ::", list);

      default:
        audioBridge.socket.emit("ab_" + name, { req: body, res: null, extra });
        return extra || body;
    }
  } catch (error) {
    if (error.error) return error;
    return { error };
  }
}

async function getParticipants(audioBridge, extra) {
  const { hostname, port } = audioBridge.socket.io.engine;
  const url = "http://" + hostname + `:${port}` + "/participants";
  try {
    const resData = (
      await axios({
        method: "GET",
        url,
        params: { id: extra.room },
        headers: { "Content-Type": "application/json" },
      })
    ).data;
    return resData;
  } catch (error) {
    console.log(error);
    return { error };
  }
}
async function setCurrentRoom({ type, state, extra, data, audioBridge }) {
  if (type === "create")
    return {
      currentRoom: data,
      inRoom: true,
      chat: [],
    };
  const { participants, speakers } = await getParticipants(audioBridge, extra);
  participants && (data.participants = participants);
  const { username, photo: userImage, firstName, lastName } = state.user;
  data.participants[username] = {
    username,
    userImage,
    firstName,
    lastName,
    muted: extra.muted,
  };
  data.speakers = speakers;
  data.muted = extra.muted;
  return {
    currentRoom: data,
    inRoom: true,
    chat: [],
  };
}
