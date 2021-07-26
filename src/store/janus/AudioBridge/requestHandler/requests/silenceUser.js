export const silenceUser = async (state, data, currentRoom) => {
  console.log("========================" + data.muted);
  const { moderators, roomID, participants } = currentRoom;
  const { username } = state.user;
  if (!moderators[username]) return { error: "You're not a moderator." };
  if (moderators[data.username]) {
    if (moderators[username].level <= moderators[data.username].level)
      return { error: "You're trying to silence a moderator with a higher or same level." };
  }
  const extra = { muted: true, username: data.username, useSilence: true };
  if (currentRoom.silenced.includes(data.username)) {
    extra.muted = false;
    let index = currentRoom.silenced.indexOf(extra.username);
    if (index !== -1) currentRoom.silenced.splice(index, 1);
    state.audio.socket.emit("ab_mute", extra);
    return { currentRoom, complete: true };
  }
  console.log("========================" + extra.muted);
  const body = { id: participants[data.username].roomUserID, room: roomID };
  return { body, extra };
};
