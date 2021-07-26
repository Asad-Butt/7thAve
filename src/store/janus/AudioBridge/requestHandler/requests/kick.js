export const kick = (state, data) => {
  const { moderators, roomID, participants } = state.audio.currentRoom;
  const { username } = state.user;
  if (!moderators[username]) return { error: "You're not a moderator." };
  if (moderators[data.username]) {
    if (moderators[username].level <= moderators[data.username].level)
      return { error: "You're trying to kick a moderator with a higher level or same level." };
  }
  const body = { id: participants[data.username].roomUserID, room: roomID };
  return { body, extra: { socketID: participants[data.username].socketID, username: data.username } };
};
