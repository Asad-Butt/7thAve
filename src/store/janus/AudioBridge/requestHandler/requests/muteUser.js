export const muteUser = async (state, data, currentRoom) => {
  const { moderators, roomID, participants } = currentRoom;
  const { username } = state.user;
  if (!moderators[username]) return { error: "You're not a moderator." };
  if (moderators[data.username]) {
    if (moderators[username] < moderators[data.username]) return { error: "You're trying to mute a moderator with a higher level." };
  }
  const muted = true;
  const body = { id: participants[data.username].roomUserID, room: roomID };
  return { body, extra: { muted, username: data.username } };
};
