/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import {
  Body,
  BodyBold,
  Heading,
} from "../../../ui_library/components/typography";
// 3rd Party
import Modal from "react-native-modal";
import { WarningCircleNotification } from "../icons";

export default function InAppNotificationModal() {
  // Theme & Color Pallets
  const { themes, darkModeEnabled, showInAppNotification, activeNotification } =
    useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();

  return (
    <Modal
      isVisible={showInAppNotification}
      onSwipeComplete={() =>
        dispatch({
          type: "app/hideNotification",
        })
      }
      backdropOpacity={0.75}
      hasBackdrop={false}
      swipeDirection={"up"}
      animationIn={"slideInDown"}
      animationOut={"slideOutUp"}
      animationInTiming={500}
      animationOutTiming={500}
      swipeThreshold={60}
      useNativeDriver={true}
      style={{
        margin: 0,
        top: normalize(45),
        left: 0,
        right: 0,
        alignSelf: "center",
        position: "absolute",
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              activeNotification.type === "action" ? "#079ea6" : "#f8c9c4",
          },
        ]}
      >
        {activeNotification.type !== "action" && <WarningCircleNotification />}
        <View style={styles.subContainer}>
          <BodyBold>{activeNotification.title}</BodyBold>
          <Body spaceX={5} width={normalize(275)}>
            {activeNotification.message}
          </Body>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 0,
    height: normalize(100),
    alignSelf: "center",
    borderRadius: normalize(15),
    width: SCREEN_WIDTH * 0.9,
    opacity: 0.99,
    backgroundColor: "#f8c9c4",
    padding: normalize(15),
  },
  subContainer: {
    justifyContent: "space-between",
    height: normalize(50),
    marginLeft: normalize(10),
    marginTop: normalize(5),
  },
});
