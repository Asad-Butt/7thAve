/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import { Heading } from "../../../ui_library/components/typography";

function EmptyConvo({ themes, darkModeEnabled, route }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <Layout height={0.3} width={0.9} centeredX={true} centeredY={true}>
      <Heading>Start something!</Heading>
    </Layout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(EmptyConvo);
