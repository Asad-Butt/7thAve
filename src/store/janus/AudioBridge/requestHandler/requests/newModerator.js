import socketResponse from "../../socket/socketResponse";
export const newModerator = async (state, data, currentRoom) => {
  const { moderators } = currentRoom;
  const { username } = state.user;
  if (!moderators[username]) return { error: "You're not a moderator." };
  let level = 0;
  //Fix being able to set the same moderator over and over again
  if (moderators[data.username]) {
    if (moderators[username].level <= moderators[data.username].level)
      return { error: "You can't promote a moderator that is above or equal to you in rank." };
    else if (moderators[data.username].level === 2)
      return { error: "You can't promote a moderator to level 3, level 3 is reserved for the room creator." };
    else level = moderators[data.username].level + 1;
  } else if (moderators[username].level === 3) level = 2;
  else level = 1;
  state.audio.socket.emit("new-moderator", { username: data.username, level });
  try {
    await socketResponse(state.audio.socket, "new-moderator-successful");
    moderators[data.username] = { level };
    currentRoom.moderators = moderators;
    return { complete: true, currentRoom };
  } catch (error) {
    return { error };
  }
};
