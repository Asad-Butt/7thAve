import * as requests from "./requests";
import successHandler from "./successHandler";

const requestHandler = (name, receivedState, data) =>
  new Promise(async (res, rej) => {
    const state = { ...receivedState };
    let { audioBridge, currentRoom } = { ...state.audio };
    currentRoom = JSON.parse(JSON.stringify(currentRoom));
    let reqData = null;
    let request = name;
    switch (name) {
      case "create":
        reqData = requests.create(state, data);
        break;
      case "join":
        reqData = await requests.join(state, data);
        break;
      case "changeRoom":
        reqData = { ...data };
        request = "changeroom";
        break;
      case "newModerator":
        reqData = await requests.newModerator(state, data, currentRoom);
        break;
      case "silenceUser":
        reqData = await requests.silenceUser(state, data, currentRoom);
        if (reqData.error) return rej(reqData);
        if (reqData.extra) reqData.extra.muted ? (request = "mute") : (request = "unmute");
        break;
      case "muteUser":
        reqData = await requests.muteUser(state, data, currentRoom);
        if (reqData.error) return rej(reqData);
        reqData.extra.muted ? (request = "mute") : (request = "unmute");
        break;
      case "leave":
        reqData = { body: {}, extra: {} };
        break;
      case "muteSelf":
        reqData = requests.muteSelf(state, currentRoom, data);
        request = "configure";
        break;
      case "kick":
        reqData = requests.kick(state, data);
        break;
      case "list":
        reqData = {
          body: {},
          extra: {},
        };
        break;
      default:
        null;
    }
    if (!reqData) return res(true);
    if (reqData.complete) {
      delete reqData.complete;
      return res(reqData);
    }
    if (reqData.error) return rej(reqData);
    let { body, extra } = reqData;
    if (audioBridge.handler) {
      audioBridge.handler.send({
        message: { request, ...body },
        error: (error) => {
          return rej(error);
        },
        success: async (s) => {
          const response = await successHandler({ state, audioBridge, currentRoom, name, request, data, reqData, body, extra });
          if (response.error) rej(response);
          else res(response);
        },
      });
    } else {
      rej({ error: "Plugin not attached." });
    }
  });

export default requestHandler;
