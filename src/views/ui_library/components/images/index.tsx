/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";

export default function UserImage({
  uri,
  spaceX,
  spaceY,
  space,
  pressable,
  onPress,
  onLongPress,
}: any) {
  // Dispatch
  return (
    <TouchableOpacity
      activeOpacity={pressable ? 0.825 : 1}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Image
        source={{ uri: uri }}
        style={[
          styles.container,
          {
            margin: space ? normalize(space) : undefined,
            marginVertical: spaceY ? normalize(spaceY) : undefined,
            marginHorizontal: spaceX ? normalize(spaceX) : undefined,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(21),
  },
});
