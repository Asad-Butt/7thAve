/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

import normalize from "../../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import {
  Heading,
  Subtitle,
} from "../../../../ui_library/components/typography";

function PillComponent({
  themes,
  darkModeEnabled,
  route,
  text,
  spaceX,
  spaceY,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View
      style={{
        backgroundColor: "rgba(25, 132, 240, 0.1)",
        paddingHorizontal: 12.5,
        paddingVertical: normalize(6),
        borderRadius: 15,
        marginHorizontal: spaceX ? normalize(spaceX) : 0,
        marginVertical: spaceY ? normalize(spaceY) : 0,
        alignSelf: "flex-start",
      }}
    >
      <Subtitle color={colors.element}>{text.toUpperCase()}</Subtitle>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export const Pill = connect(mapStateToProps)(PillComponent);
export default Pill;
