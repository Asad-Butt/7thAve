/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../routers/RootNavigation";

import normalize from "../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout, LayoutRow } from "../layouts";
import { Heading, BodyBold, Body } from "./typography";
import { kFormatter } from "../../../utils/algorithms";

export default function UserMetrics({ connections, points, listens }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  return (
    <LayoutRow self={"flex-start"} width={0.8} justify={"space-between"}>
      <View style={styles.row}>
        <BodyBold spaceY={5}>
          {connections ? kFormatter(connections) : 0}
        </BodyBold>
        <Body color={colors.typeface.secondary}>Connections</Body>
      </View>
      {/* <View style={styles.row}>
        <BodyBold spaceY={5}>{points ? kFormatter(points) : 0}</BodyBold>
        <Body color={colors.typeface.secondary}>Points</Body>
      </View>
      <View style={styles.row}>
        <BodyBold spaceY={5}>{listens ? kFormatter(listens) : 0}</BodyBold>
        <Body color={colors.typeface.secondary}>Listens</Body>
      </View> */}
    </LayoutRow>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
