/**
 *
 * 7th Ave - Blank Component
 *
 */
import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Body } from "../typography";

function ExperienceType({ item, onPress, themes, darkModeEnabled, key }: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: SCREEN_WIDTH * 0.425,
          height: SCREEN_WIDTH * 0.12,
          backgroundColor: colors.formCardBG,
          borderColor: item.selected ? colors.secondary : colors.formCardBG,
          borderWidth: 1,
          borderRadius: normalize(20),
          alignItems: "center",
          flexDirection: "row",
          padding: normalize(10),
          marginVertical: normalize(5),
        }}
        key={key}
      >
        {/* <Body spaceY={10}>{item.icon}</Body> */}
        <Body spaceY={15}>{item.text}</Body>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_WIDTH * 0.4,
    width: SCREEN_WIDTH * 0.4,
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
export default connect(mapStateToProps)(ExperienceType);
