/**
 *
 * 7th Ave - User Screen
 *
 */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// Utilities
import normalize from "../../../../utils/normalize";
import { navigate } from "../../../../routers/RootNavigation";
// Icons
import { AntDesign } from "@expo/vector-icons";
import { OptionsVert } from "../../../ui_library/components/icons/index";
// UI Library
import { Layout, LayoutRow } from "../../../ui_library/layouts";
import Typography from "../../../ui_library/components/typography/index";

import Button from "../../../ui_library/components/buttons/index";
import UserTabs from "../../../../routers/UserTabs";
import UserMetrics from "../../../ui_library/components/UserMetrics";

function UserScreen({
  dispatch,
  themes,
  darkModeEnabled,
  username,
  firstName,
  lastName,
  bio,
  photo,
  connectionCount,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  useEffect(() => {
    dispatch({
      type: "app/hideTabs",
      payload: null,
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <Layout height={0.5} centeredX={true}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                navigate("Home", {});
                dispatch({
                  type: "app/showTabs",
                  payload: null,
                });
              }}
            >
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Typography.SubHeading spaceX={10}>
              {username}
            </Typography.SubHeading>
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigate("Settings", {})}
          >
            <OptionsVert />
          </TouchableOpacity>
        </View>
        <LayoutRow width={0.9} align={"center"}>
          <Image style={styles.profileImage} source={{ uri: photo }} />
          <View>
            <Typography.H1Title spaceY={15}>
              {firstName + " " + lastName}
            </Typography.H1Title>
            <Typography.H1SubTitle
              spaceX={2.5}
              spaceY={15}
              color={colors.typeface.secondary}
            >
              @{username}
            </Typography.H1SubTitle>
          </View>
        </LayoutRow>
        <UserMetrics connections={connectionCount} />
        <View style={styles.bio}>
          <Typography.Body>{bio}</Typography.Body>
        </View>
        <Button.Secondary onPress={() => navigate("User-Edit", {})}>
          Edit Profile
        </Button.Secondary>
      </Layout>
      <UserTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: SCREEN_WIDTH * 0.4,
    width: SCREEN_WIDTH * 0.4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.85,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(21),
  },
  bio: {
    width: SCREEN_WIDTH - normalize(15),
    height: SCREEN_HEIGHT * 0.095,
    marginLeft: normalize(25),
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  user: { username, firstName, lastName, bio, photo, connectionCount },
}: any) => ({
  themes,
  darkModeEnabled,
  username,
  firstName,
  lastName,
  bio,
  photo,
  connectionCount,
});
export default connect(mapStateToProps)(UserScreen);
