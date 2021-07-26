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
import { Body, Caption, Subtitle } from "../typography";

function ExperienceTypeItemSmall({
  item,
  onPress,
  themes,
  darkModeEnabled,
  key,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;

  const emojiSelector = (category: string) => {
    switch (category) {
      case "Conversation":
        return "💬";
      case "Kickback":
        return "💆🏾‍♀️";
      case "Panel":
        return "🙌🏾";
      case "Show":
        return "📺";
      case "Meditation":
        return "🧘🏾‍♀️";
      case "Networking":
        return "📡";
      default:
        break;
    }
  };

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          // width: SCREEN_WIDTH * 0.35,
          // height: SCREEN_WIDTH * 0.075,
          paddingHorizontal: 12.5,
          paddingVertical: 5,
          borderRadius: 15,
          backgroundColor: colors.formCardBG,
          //    borderColor: item.selected ? colors.secondary : colors.formCardBG,
          //    borderWidth: 1,
          // borderRadius: normalize(20),
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          // marginVertical: normalize(5),
        }}
        key={key}
      >
        {/* <Caption spaceY={5}>{emojiSelector(item)}</Caption> */}
        <Subtitle>{item.text}</Subtitle>
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
export default connect(mapStateToProps)(ExperienceTypeItemSmall);
