import React, { useState, useEffect, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AudioViewModel,
  Participant,
  participants,
  Socket,
} from "../@types/global";
import AudioBridge from "../store/janus/AudioBridge";
import socketResponse from "../store/janus/AudioBridge/socket/socketResponse";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
const AudioContext = createContext(null);

export function ProvideJanus({ children }: any) {
  const provider = useAudioRooms();
  return (
    <AudioContext.Provider value={provider}>{children}</AudioContext.Provider>
  );
}

export const useJanus = () => {
  return useContext(AudioContext);
};

export default function useAudioRooms() {
  const user = useSelector((state: any) => state.user);
  const {
    socket,
    audioBridge,
    dispatch: stateDispatch,
    chat,
    previousRoomID,
  } = useSelector((state: any) => {
    return { ...state.audio };
  });
  // const roomList = useSelector((state: any) => state.audio.roomList);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [enbled, setEnbled] = useState(false);

  // Network Listeners
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    // Unsubscribe
    return () => removeNetInfoSubscription();
  }, []);

  /**
   * CHAT
   *
   */

  const [localMessage, setLocalMessage] = useState("");

  const chatSubmit = () => {
    dispatch({
      type: "audio/sendChatMessage",
      payload: { messageBody: localMessage },
    });
    setLocalMessage("");
  };

  /**
   * This use effect will refresh on flat
   * List Pulldown
   *
   * toggleRefresh function will fire the use effect
   */
  const toggleRefresh = () => {
    setRefresh(false);
    setRefresh(true);
  };

  useEffect(() => {
    if (!stateDispatch)
      AudioBridge.connect({ socket, dispatch, user, setListeners: true });
    else if (!audioBridge || !audioBridge.janus.isConnected())
      AudioBridge.connect({
        socket,
        dispatch,
        user,
        refresh: previousRoomID
          ? { username: user.username, roomID: previousRoomID }
          : false,
      });
    else !socket.connected && socket.connect();

    if (refresh) {
      socket.emit("list-server");
      socket.once("list-server-successful", (data: any) => {
        // console.log(data);
        const entries = Object.entries(data).map((item) => item[1]);
        dispatch({ type: "audio/changeRoomList", payload: entries });
      });
      (async () => {
        try {
          await socketResponse(socket, "list-server-successful");
        } catch (error) {
          console.log("~+~+~+~+~+~+~+~+~+~+~+~~+", error);
        }
      })();
      socket.once("error", (data: any) => {
        console.log("~+~+~+~+~+~+~+~+~+~+~+~~+", data);
      });
    }

    // if (roomList) {
    setTimeout(() => {
      setRefresh(false);
    }, 3000);
    // }
  }, [refresh]);

  /**
   * END
   */

  return {
    chat,
    toggleRefresh,
    enbled,
    refresh,
    localMessage,
    setLocalMessage,
    chatSubmit,
  };
}
