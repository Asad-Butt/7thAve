/**
 *
 * 7th Ave - Participant Mini Component
 *
 */
import React from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Body } from "../../../ui_library/components/typography";

function ParticipantMini({ themes, darkModeEnabled, item, dispatch }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  const { username } = useSelector((state: any) => state.user);
  const { currentRoom } = useSelector((state: any) => state.audio);

  const handleParticipantPress = () => {
    if (item[1].username !== username) {
      dispatch({ type: "inbox/searchUser", payload: item[1].username });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.75} onPress={handleParticipantPress}>
        <Image source={{ uri: item[1].userImage }} style={[styles.image]} />
      </TouchableOpacity>
      <Body spaceX={10}>
        {item[1].username !== username ? item[1].firstName : "You"}
      </Body>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: SCREEN_WIDTH * 0.07,
  },
  image: {
    width: normalize(60),
    height: normalize(60),
    borderRadius: 60,
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(ParticipantMini);
