const socketResponse = async (socket, eventName) => {
  const result = await new Promise((res, rej) => {
    if (socket._callbacks["$" + eventName]) socket.removeAllListeners(eventName);
    socket.once(eventName, (data) => {
      console.log("------------socketResponse resolved.");
      data ? res(data) : res(true);
    });
    if (socket._callbacks["$error"]) socket.removeAllListeners("error");
    socket.once("error", (error) => {
      console.log("------------socketResponse rejected.");
      rej({ error });
    });
    setTimeout(() => {
      rej({ error: "No socket response in 5 seconds so timeout." });
    }, 5000);
  });
  if (result.error) {
    console.log("-------------Is this socket connected?", socket.connected);
    if (!socket.connected) {
      socket.disconnect();
      socket.connect();
    }
  }
  return result;
};

export default socketResponse;
