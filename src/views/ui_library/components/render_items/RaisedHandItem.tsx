/**
 *
 * 7th Ave - Raised Hand Item
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, View, Image, TouchableOpacity } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import { Heading, H1SubTitle } from "../../../ui_library/components/typography";

export default function RaisedHandItem({ item, onPress, selectedHands }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const { currentRoom } = useSelector((state: any) => state.audio);

  if (item[0] === "previousTime" || !item[1]) {
    return null;
  } else {
    return (
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
            <Image source={{ uri: currentRoom.participants[item[0]]?.userImage }} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
            <H1SubTitle spaceY={25}>
              {currentRoom.participants[item[0]]?.firstName} {currentRoom.participants[item[0]]?.lastName}
            </H1SubTitle>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
          {selectedHands[item[0]] ? (
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Circle cx={10} cy={10} r={10} fill="#F2762F" />
              <Path
                d="M8.44 14.166c-.295 0-.59-.109-.815-.328l-3.12-3.044a1.102 1.102 0 010-1.587 1.17 1.17 0 011.626-.001l2.308 2.251 5.43-5.295a1.17 1.17 0 011.627 0c.45.439.45 1.15 0 1.588l-6.242 6.088c-.225.22-.52.328-.815.328z"
                fill="#fff"
              />
            </Svg>
          ) : (
            <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
              <Circle cx={10} cy={10} r={9.5} stroke="#9CAAB4" />
            </Svg>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.85,
    justifyContent: "space-between",
    marginVertical: normalize(10),
  },
  image: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(35),
  },
});
