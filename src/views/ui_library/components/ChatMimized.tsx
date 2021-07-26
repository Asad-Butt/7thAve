/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { connect, useSelector } from "react-redux";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../routers/RootNavigation";
import { Entypo } from "@expo/vector-icons";

import normalize from "../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { LayoutRow } from "../../ui_library/layouts/";
import { H1Title, Heading } from "../../ui_library/components/typography";
import Icons from "./icons";

function ChatMinimized({
  dispatch,
  themes,
  darkModeEnabled,
  bottomsTabs,
  currentRoom,
  username,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View
      style={[
        bottomsTabs ? styles.container : styles.containerBottom,
        { backgroundColor: colors.background, borderColor: colors.formCardBG },
      ]}
    >
      <H1Title width={SCREEN_WIDTH * 0.59}>{currentRoom.roomName}</H1Title>
      <View
        style={[
          styles.innerRow,
          {
            justifyContent: currentRoom.speakers.includes(username)
              ? "space-between"
              : "flex-end",
          },
        ]}
      >
        {currentRoom.speakers.includes(username) ? (
          <>
            {currentRoom.participants.hasOwnProperty(username) &&
            currentRoom.participants[username].muted ? (
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() =>
                  dispatch({ type: "audio/muteSelf", payload: {} })
                }
              >
                <Icons.MicOffMini />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() =>
                  dispatch({ type: "audio/muteSelf", payload: {} })
                }
              >
                <Icons.MicOnMini />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <></>
        )}
        <TouchableOpacity
          onPress={() => {
            dispatch({
              type: "audio/minimize",
              payload: false,
            });
            navigate("Chat", { screen: "Room" });
          }}
        >
          <Entypo
            name="chevron-up"
            size={40}
            color={colors.typeface.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: normalize(100),
    right: 0,
    left: 0,
    zIndex: 1,
    justifyContent: "space-between",
    paddingHorizontal: normalize(25),
    alignItems: "center",
    height: normalize(75),
    borderTopRightRadius: normalize(25),
    borderTopLeftRadius: normalize(25),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.02,

    elevation: 3,
  },
  containerBottom: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: normalize(90),
    paddingHorizontal: normalize(25),
    borderTopRightRadius: normalize(25),
    borderTopLeftRadius: normalize(25),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.02,

    elevation: 3,
    paddingBottom: normalize(25),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.85,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.275,
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled, bottomsTabs },
  audio: { currentRoom },
  user: { username },
}: any) => ({
  themes,
  darkModeEnabled,
  bottomsTabs,
  currentRoom,
  username,
});
export default connect(mapStateToProps)(ChatMinimized);
