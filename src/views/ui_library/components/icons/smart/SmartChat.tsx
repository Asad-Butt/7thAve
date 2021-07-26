/**
 *
 * 7th Ave - Interests Screen
 *
 */
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

import normalize from "../../../../../utils/normalize";

import Svg, { Path } from "react-native-svg";

function ChatIcon({ size, number, themes, darkModeEnabled }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;
  function styleSwitch(number: number) {
    if (number > 9 && number < 100) {
      return styles.bubbleMedium;
    } else if (number > 99) {
      return styles.bubbleBig;
    } else {
      return styles.bubble;
    }
  }

  return (
    <View>
      <View style={styleSwitch(number)}>
        <Text style={styles.bubbleCount}>{number < 100 ? number : "99+"}</Text>
      </View>
      <Svg width={30 * size} height={30 * size} viewBox="0 0 26 26" fill="none">
        <Path
          opacity={0.4}
          d="M13.022 2.167C6.727 2.167 2.167 7.302 2.167 13c0 1.82.53 3.695 1.462 5.406.173.282.195.64.076.975l-.726 2.427c-.162.585.336 1.018.888.845l2.189-.65c.596-.195 1.061.054 1.615.39C9.253 23.324 11.223 23.8 13 23.8c5.373 0 10.833-4.149 10.833-10.833 0-5.764-4.658-10.801-10.811-10.801z"
          fill="#667682"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.979 14.398A1.399 1.399 0 0111.592 13a1.38 1.38 0 011.387-1.376c.769 0 1.387.618 1.387 1.387a1.39 1.39 0 01-1.387 1.387zm-4.995 0a1.396 1.396 0 01-1.386-1.387c0-.77.617-1.387 1.386-1.387.77 0 1.387.618 1.387 1.387 0 .758-.618 1.376-1.387 1.387zm8.602-1.387a1.39 1.39 0 001.387 1.387 1.39 1.39 0 001.386-1.387c0-.77-.617-1.387-1.386-1.387-.77 0-1.387.618-1.387 1.387z"
          fill="#667682"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    zIndex: 1,
    position: "absolute",
    right: -5,
    top: -5,
    width: 20,
    height: 20,
    backgroundColor: "#F16060",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  bubbleBig: {
    zIndex: 1,
    position: "absolute",
    right: -15,
    top: -17.5,
    width: 35,
    height: 35,
    backgroundColor: "#F16060",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  bubbleMedium: {
    zIndex: 1,
    position: "absolute",
    right: -5,
    top: -8,
    width: 23,
    height: 23,
    backgroundColor: "#F16060",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  bubbleCount: {
    fontFamily: "Poppins-Bold",
    color: "#FFF",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(ChatIcon);
