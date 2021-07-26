export const create = (state, data) => {
  const { inRoom, socket, audioBridge } = state.audio;
  const { firstName, lastName, username, photo: userImage } = state.user;
  inRoom && socket?.emit("leave");
  if (!audioBridge) return { error: "audiobridge plugin not found in state." };
  const { secret, pin, allowed, permanent, roomID } = data;
  const newRoom = {
    room: roomID,
    description: data.description,
    muted: true,
  };
  newRoom.audiolevel_event = true;
  newRoom.audio_level_average = 47;
  newRoom.audio_active_packets = 50;
  secret && (newRoom.secret = secret);
  pin && (newRoom.pin = pin);
  allowed.length !== 0 && (newRoom.allowed = allowed);
  data.private && (newRoom.is_private = data.private);
  data.speakers = [username];
  data.muted = true;
  permanent && (newRoom.permanent = permanent);
  if (!data.moderators[data.creator])
    data.moderators[data.creator] = { level: 3 };
  if (!data.participants[data.creator])
    data.participants[data.creator] = {
      firstName,
      lastName,
      username,
      userImage,
      muted: true,
      sessionID: audioBridge.handler.session.getSessionId(),
      pluginID: audioBridge.handler.getId(),
      socketID: audioBridge.socket.id,
    };
  return { body: newRoom, extra: data };
};
