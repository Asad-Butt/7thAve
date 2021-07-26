/**
 * 7th Ave - Inbox Screen
 */
import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
import Typography from "../../../ui_library/components/typography";
import { Layout } from "../../../ui_library/layouts/index";
import InboxTabs from "../../../../routers/InboxTabs";

function InboxScreen({ dispatch, themes, darkModeEnabled }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Typography.SubHeading spaceX={20}>Inbox</Typography.SubHeading>
      <InboxTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  basicTxt: {
    fontFamily: "Poppins",
    fontSize: normalize(20),
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(InboxScreen);
