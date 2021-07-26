import socketResponse from "../../socket/socketResponse";
export const configure = async ({ state, currentRoom, name, audioBridge, extra }) => {
  const username = state.user.username;
  try {
    switch (name) {
      case "muteSelf":
        if (currentRoom.silenced.includes(username)) return { error: "A silenced user cannot unmute their microphone." };
        if (currentRoom.silence && !currentRoom.speakers.includes(username)) return { error: "You're not a speaker." };
        currentRoom.participants[username].muted = extra.muted;
        audioBridge.socket.emit("mute", extra);
        const response = await socketResponse(audioBridge.socket, "mute-successful");
        return currentRoom;
      default:
        return {};
    }
  } catch (error) {
    return { error };
  }
};
