/**
 *
 * 7th Ave - User Tab View
 *
 */
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, View, Text } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Scroll, LayoutRow, Layout } from "../../../ui_library/layouts/";
import { Body, BodyBold, Caption, Heading, Section } from "../typography";
import { UserCircle, OtherCircle } from "../icons";
import { firstLetterCap } from "../../../../utils/algorithms";

function UserTab({
  themes,
  darkModeEnabled,
  route,
  whatYouDo,
  location,
  school,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <Scroll
      height={0.5}
      backgroundColor={colors.background}
      centeredX={true}
      noPad={true}
      style={{ backgroundColor: colors.background }}
    >
      <LayoutRow style={{ marginBottom: normalize(-15) }}>
        <Section>Profile</Section>
      </LayoutRow>
      <View style={[styles.container, { backgroundColor: colors.formCardBG }]}>
        <View
          style={[styles.itemCont, { borderColor: colors.typeface.element }]}
        >
          <UserCircle />
          <View style={[styles.itemTxt]}>
            <BodyBold color={colors.typeface.secondary}>Work</BodyBold>
            <Body>{whatYouDo? firstLetterCap(whatYouDo) : ''}</Body>
          </View>
        </View>
        <View
          style={[styles.itemCont, { borderColor: colors.typeface.element }]}
        >
          <OtherCircle />
          <View style={[styles.itemTxt]}>
            <BodyBold color={colors.typeface.secondary}>Location</BodyBold>
            <Body>{location}</Body>
          </View>
        </View>
        <View style={[styles.itemCont, { borderBottomWidth: 0 }]}>
          <OtherCircle />
          <View style={[styles.itemTxt]}>
            <BodyBold color={colors.typeface.secondary}>School</BodyBold>
            <Body>{school}</Body>
          </View>
        </View>
      </View>
    </Scroll>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    height: normalize(300),
    width: SCREEN_WIDTH * 0.9,
    marginVertical: 15,
    borderRadius: normalize(20),
    alignItems: "center",
  },
  itemCont: {
    borderBottomWidth: 1,
    height: normalize(100),
    width: SCREEN_WIDTH * 0.85,
    flexDirection: "row",
    alignItems: "center",
  },
  itemTxt: {
    height: SCREEN_HEIGHT * 0.055,
    justifyContent: "space-between",
    marginLeft: normalize(25),
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  user: { whatYouDo, location, school },
}: any) => ({
  themes,
  darkModeEnabled,
  whatYouDo,
  location,
  school,
});
export default connect(mapStateToProps)(UserTab);
