/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../layouts";
import { Body, H1SubTitle, Heading } from "../typography";
import Svg, { Path, Circle } from "react-native-svg";

export default function SpeakerItem({ item }) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Redux State
  const { currentRoom } = useSelector((state: any) => state.audio);
  const { username } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const handleSpeakerPress = () => {
    if (currentRoom.participants[item]?.username !== username) {
      dispatch({
        type: "inbox/searchUser",
        payload: currentRoom.participants[item]?.username,
      });
    }
  };

  // LOCAL STATE

  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(item);
  }, [item]);

  if (!currentRoom.participants[user]) {
    return null;
  }

  return (
    <View>
      <TouchableOpacity
        onPress={handleSpeakerPress}
        activeOpacity={0.85}
        style={[
          styles.container,
          {
            backgroundColor: colors.formCardBG,
            borderWidth:
              currentRoom.participants[user]?.talking &&
              !currentRoom.participants[user].muted
                ? 2
                : 0,
            width:
              currentRoom.participants[user]?.talking &&
              !currentRoom.participants[user].muted
                ? SCREEN_WIDTH * 0.433 + 2
                : SCREEN_WIDTH * 0.433,
            borderColor: colors.primary,
          },
        ]}
      >
        <Image
          style={styles.image}
          source={{ uri: currentRoom.participants[user]?.userImage }}
        />
        <View style={styles.mic}>
          {currentRoom.participants[user].muted ? (
            <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
              <Circle
                cx={14}
                cy={14}
                r={13}
                fill="#fff"
                stroke="#F1F5F8"
                strokeWidth={1.5}
              />
              <Path
                d="M7.929 13.11a6.17 6.17 0 006.17 6.17 6.17 6.17 0 006.17-6.17M14.099 21.623v-2.342"
                stroke="#9CAAB4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                clipRule="evenodd"
                d="M14.204 16.154h-.21a3.05 3.05 0 01-3.05-3.05V9.312a3.05 3.05 0 013.05-3.05h.21a3.05 3.05 0 013.05 3.05v3.792a3.05 3.05 0 01-3.05 3.05z"
                stroke="#9CAAB4"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M21.071 6.93L6.93 21.072"
                stroke="#E74C3C"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M22.142 8L8 22.142"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
              <Circle
                cx={14}
                cy={14}
                r={13}
                fill="#fff"
                stroke="#F1F5F8"
                strokeWidth={1.5}
              />
              <Path
                d="M7.929 13.11a6.17 6.17 0 006.17 6.17 6.17 6.17 0 006.17-6.17M14.099 21.623v-2.342"
                stroke="#667682"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                clipRule="evenodd"
                d="M14.204 16.154h-.21a3.05 3.05 0 01-3.05-3.05V9.312a3.05 3.05 0 013.05-3.05h.21a3.05 3.05 0 013.05 3.05v3.792a3.05 3.05 0 01-3.05 3.05z"
                stroke="#667682"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </View>
        <H1SubTitle spaceX={7.5}>
          {user === username
            ? "You"
            : currentRoom.participants[user]?.firstName +
              " " +
              currentRoom.participants[user]?.lastName}
        </H1SubTitle>
        <View
          style={[
            styles.row,
            {
              width:
                currentRoom.participants[user]?.username === currentRoom.creator
                  ? normalize(60)
                  : normalize(85),
            },
          ]}
        >
          <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <Path
              d="M7.998 10.116c-2.876 0-5.332.454-5.332 2.267 0 1.814 2.441 2.283 5.332 2.283 2.875 0 5.331-.453 5.331-2.267 0-1.813-2.44-2.283-5.331-2.283"
              fill="#9CAAB4"
            />
            <Path
              opacity={0.4}
              d="M7.998 8.389a3.515 3.515 0 003.528-3.528 3.515 3.515 0 00-3.528-3.528A3.516 3.516 0 004.47 4.861a3.516 3.516 0 003.528 3.528"
              fill="#9CAAB4"
            />
          </Svg>
          <Body color={colors.typeface.element}>
            {currentRoom.participants[user]?.username === currentRoom.creator
              ? "Host"
              : "Speaker"}
          </Body>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH * 0.433,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(20),
    alignSelf: "center",
    marginBottom: normalize(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(40),
  },
  mic: {
    position: "absolute",
    right: normalize(45),
    top: normalize(67.5),
  },
});
