/**
 * 7th Ave - Explore Screen
 */
import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
import Typography from "../../../ui_library/components/typography";

function ExploreScreen({ dispatch, themes, darkModeEnabled }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.formCardBG }]}>
      <Typography.Heading>Explore Screens</Typography.Heading>
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

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(ExploreScreen);
