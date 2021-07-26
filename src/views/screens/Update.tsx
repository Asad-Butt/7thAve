/**
 *
 * 7th Ave - Update Screen
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../routers/RootNavigation";

import normalize from "../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../ui_library/layouts/";
import { Heading } from "../ui_library/components/typography";

export default function UpdateScreen({ route }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  return (
    <Layout centeredX={true} centeredY={true}>
      <Heading>Update your app homie</Heading>
    </Layout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
