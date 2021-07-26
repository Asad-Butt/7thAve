/**
 * 7th Ave - Chat Screen
 */
import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
import Typography from "../../../ui_library/components/typography";
import Buttons from "../../../ui_library/components/buttons";

function ChatScreen({
  dispatch,
  themes,
  darkModeEnabled,
  inRoom,
  bottomsTabs,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.formCardBG }]}>
      <Typography.Heading>Chat Screens</Typography.Heading>

      {bottomsTabs ? (
        <Buttons.Secondary
          onPress={() => {
            dispatch({
              type: "app/hideTabs",
              payload: null,
            });
          }}
        >
          Enter Chat
        </Buttons.Secondary>
      ) : (
        <Buttons.Primary
          onPress={() => {
            dispatch({
              type: "app/showTabs",
              payload: null,
            });
          }}
        >
          Leave Chat
        </Buttons.Primary>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  basicTxt: {
    fontFamily: "Poppins",
    fontSize: normalize(20),
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled, bottomsTabs },
  audio: { inRoom },
}: any) => ({
  themes,
  darkModeEnabled,
  bottomsTabs,
});
export default connect(mapStateToProps)(ChatScreen);
