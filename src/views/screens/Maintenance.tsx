/**
 *
 * 7th Ave - Maintenance Screen
 *
 */
import React, { useState } from "react";
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
import {
  BasicInput,
  BigInput,
  DropDownSelector,
} from "../ui_library/components/inputs";
import { OCCUPATIONS } from "../../utils/constants";

export default function MaintenanceScreen({ route }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  return (
    <Layout centeredX={true} centeredY={true}>
      <Heading>Maintenance Mode</Heading>
    </Layout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
