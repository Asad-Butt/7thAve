export const join = async (state, data) => {
  const { currentRoom, inRoom, audioBridge } = state.audio;
  const { username: display } = state.user;
  if (data.banned.includes(display)) {
    state.audio.dispatch({
      type: "app/newInAppNotification",
      payload: {
        title: "Denied",
        message: "You're not allowed in this room.",
      },
    });
    return { error: "You're not allowed in this room." };
  }
  if (currentRoom.roomID === data.roomID) {
    state.audio.dispatch({
      type: "app/newInAppNotification",
      payload: {
        title: "Error",
        message: "You're already in this room, if you can't get in try entering another room.",
      },
    });
    return { error: "You're already in this room." };
  }
  let muted = false;
  data.silence && (muted = true);
  const id = audioBridge.stringToNumberID(display);
  const joinExtra = { muted, room: data.roomID, roomName: data.roomName, id };
  const body = { muted, room: data.roomID, display, id };

  if (inRoom) {
    console.log("changing room");
    const response = await audioBridge.request("changeRoom", state, {
      body,
      extra: joinExtra,
      data,
    });
    if (response.error) return response;
    else return { ...response, complete: true };
  }
  console.log(data);
  return { body, extra: joinExtra };
};
