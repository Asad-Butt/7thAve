/**
 *
 * 7th Ave - Interests Screen
 *
 */
import React from "react";
import { connect, useSelector } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

import normalize from "../../../../../utils/normalize";

import Svg, { Path } from "react-native-svg";

export default function SmartHandIcon({ size, number }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
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
          d="M7.904 25h6.34c1.77 0 3.406-.801 4.272-2.098L24 14.688l-.31-.197-.017-.012c-.476-.35-1.117-.529-1.77-.495-.667.04-1.282.293-1.7.7l-1.581 1.503a.538.538 0 01-.503.108c-.18-.05-.3-.183-.3-.332L17.81 5.63c0-.704-.673-1.277-1.5-1.277-.807 0-1.468.546-1.498 1.228l-.001 3.26v2.76a.316.316 0 01-.132.25.523.523 0 01-.32.102h-.001a.523.523 0 01-.32-.101.318.318 0 01-.133-.248V8.844 5.657a1.477 1.477 0 010-.084v-2.3C13.907 2.567 13.235 2 12.408 2h-.046c-.827 0-1.513.564-1.513 1.268v8.67c0 .195-.203.353-.453.353s-.452-.158-.452-.353V4.605c0-.705-.66-1.278-1.486-1.278-.831 0-1.49.573-1.49 1.278v8.002c0 .195-.203.353-.452.353-.25 0-.453-.158-.453-.353V8.3c0-.704-.688-1.256-1.515-1.256h-.043c-.825 0-1.497.558-1.5 1.26-.008 2.9-.003 5.336.003 9.912C3.007 21.797 4.908 25 7.904 25z"
          fill="#C2C8CD"
        />
        <Path
          d="M10.704 21.613H6.806a.806.806 0 110-1.613h3.898a.808.808 0 010 1.613z"
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
