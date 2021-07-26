export default (socket, dispatch) => {
  console.log("-------------------------------Listeners running");
  socket.on("newroom", (payload) =>
    dispatch({ type: "audio/newRoom", payload })
  );
  socket.on("new-moderator", (payload) =>
    dispatch({ type: "audio/newModerator", payload })
  );
  socket.on("silenced", (payload) =>
    dispatch({ type: "audio/userSilenced", payload })
  );
  socket.on("hand-raised", (payload) =>
    dispatch({ type: "audio/handRaised", payload })
  );
  socket.on("hand-resolved", (payload) =>
    dispatch({ type: "audio/handResolved", payload })
  );
  socket.on("talking", (payload) =>
    dispatch({ type: "audio/talking", payload })
  );
  socket.on("stopped-talking", (payload) =>
    dispatch({ type: "audio/stoppedTalking", payload })
  );
  socket.on("new-speaker", (payload) =>
    dispatch({ type: "audio/addSpeaker", payload })
  );
  socket.on("remove-speaker", (payload) =>
    dispatch({ type: "audio/removeSpeaker", payload })
  );
  socket.on("invite-speaker", (payload) =>
    dispatch({ type: "audio/speakerInvitation", payload })
  );
  socket.on("invite-response", (payload) =>
    dispatch({ type: "audio/inviteResponse", payload })
  );
  socket.on("list-server-successful", (data) => {
    // console.log(data);
    const entries = Object.entries(data).map((item) => item[1]);
    dispatch({ type: "audio/changeRoomList", payload: entries });
  });
  socket.on("all-rooms", (data) => {
    // console.log(data);
    const entries = Object.entries(data).map((item) => item[1]);
    dispatch({ type: "audio/changeRoomList", payload: entries });
  });
  socket.on("room-user-id", (payload) => {
    console.log("room-user-id called", payload);
    if (!payload.roomUserID || !payload.username)
      return console.log("no id or username");
    setTimeout(() => dispatch({ type: "audio/roomUserID", payload }), 1000);
  });
  socket.on("room-destroyed", (roomID) => {
    console.log("room " + roomID + " destroyed");
    dispatch({ type: "audio/roomDestroyed", payload: roomID });
  });
  socket.on("user-joined", (participant) => {
    dispatch({ type: "audio/participantJoined", payload: participant });
  });
  socket.on("user-left", (participant) => {
    dispatch({ type: "audio/participantLeft", payload: participant });
  });
  socket.on("current-destroyed", () => {
    dispatch({ type: "audio/leave", payload: "destroyed" });
  });
  socket.on("new-message", (data) => {
    console.log(data);
    dispatch({ type: "audio/chat", payload: data });
  });
  socket.on("kicked", (data) => {
    console.log("================= kicked", data);
    dispatch({ type: "audio/leave", payload: 'banned' });
  });
  socket.on("user-kicked", (participant) => {
    console.log("================= user-kicked", participant);
    dispatch({ type: "audio/participantLeft", payload: participant });
  });
  socket.on("mute", (participant) => {
    console.log("================= mute", participant);
    dispatch({ type: "audio/participantMute", payload: participant });
    participant.muted && dispatch({ type: "audio/stoppedTalking", payload: participant.username });
  });
  socket.on("check-hanging", ()=>{
    dispatch({type: "audio/checkHanging", payload: {}});
  })

  socket.on("available", (payload)=>{
    console.log("--------checking availability", payload);
    dispatch({type: "audio/checkAvailable", payload})
  })

  socket.on("disconnect", (reason) => {
    dispatch({ type: "audio/setSocketActive", payload: false });
    dispatch({ type: "audio/setError", payload: reason });

    console.log("on purpose? : ", reason);
    // alert(reason)
    if (
      reason !== "forced close" &&
      reason !== "io server disconnect" &&
      reason !== "io client disconnect"
    ) {
      setTimeout(()=>dispatch({ type: "audio/reInit", payload: {reason} }),1000)
    } else if (reason === "io server disconnect") dispatch({type: "audio/leave", payload: {}})
    else if(reason !== "io client disconnect") dispatch({type: "audio/leave", payload: {socketDisconnect: true , reason}})
  });
};
