export const muteSelf = (state, currentRoom, data) => {
  const username = state.user.username;
  const user = currentRoom.participants[username];
  const muted = data.muted || !user.muted;
  if (currentRoom.silenced.includes(username)) {
    state.audio.dispatch({
      type: "app/newInAppNotification",
      payload: {
        title: "Denied",
        message: "A silenced user cannot unmute their microphone.",
      },
    });
    return { error: "A silenced user cannot unmute their microphone." };
  }
  if (currentRoom.silence && !currentRoom.speakers.includes(username)) return { error: "You're not a speaker." };
  return { body: { muted }, extra: { muted } };
};
