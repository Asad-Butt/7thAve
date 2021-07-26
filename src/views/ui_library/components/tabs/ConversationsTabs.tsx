/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../layouts";
import { Heading, Body } from "../typography";
import Button from "../buttons";

export default function ConversationTab() {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);

  const dispatch = useDispatch();
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return <Layout centeredX={true} centeredY={true}></Layout>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
