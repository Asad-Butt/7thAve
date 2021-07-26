/**
 *
 * 7th Ave - Settings Screen
 *
 */
import React from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate, goBack } from "../../../../routers/RootNavigation";
import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import Typography, {
  SubHeading,
} from "../../../ui_library/components/typography";
import Icons from "../../../ui_library/components/icons";

function SettingsScreen({ themes, darkModeEnabled, dispatch }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  const { inRoom } = useSelector((state: any) => state.audio);
  const handleLogout = () => {
    if (inRoom) {
      Alert.alert("Cannot logout while still in a room!");
    } else {
      dispatch({
        type: "user/logout",
        payload: null,
      });
    }
  };

  return (
    <Layout>
      <View style={styles.banner}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            goBack();
          }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <SubHeading spaceX={10}>Settings</SubHeading>
      </View>
      <Pressable onPress={handleLogout}>
        <View style={styles.row}>
          <Icons.Logout />
          <Typography.H1Title spaceY={15} spaceX={50} color={colors.warning}>
            Logout
          </Typography.H1Title>
        </View>
      </Pressable>
    </Layout>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.85,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(SettingsScreen);
