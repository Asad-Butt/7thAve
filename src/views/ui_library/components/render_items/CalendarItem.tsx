/**
 *
 * 7th Ave - Interests Screen
 *
 */
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, Image, Text, View, TouchableOpacity } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { LayoutRow } from "../../../ui_library/layouts/";
import Typography, { Heading } from "../typography";
import Pill from "../icons/pills";

function CalendarItem({
  themes,
  darkModeEnabled,
  route,
  item,
  featured,
  category,
  description,
  time,
  onPress,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <LayoutRow height={0.1} width={0.9} spaceY={15} noPad={true}>
      <TouchableOpacity onLongPress={onPress} activeOpacity={0.75}>
        {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
        <Image
          style={styles.image}
          source={require("../../../../../assets/icon.png")}
        />
      </TouchableOpacity>
      <View>
        <Pill spaceX={15} spaceY={7.5} text={item.category} />
        <TouchableOpacity onPress={onPress} activeOpacity={0.75}>
          <Typography.Section width={SCREEN_WIDTH * 0.6} spaceY={15}>
            {item.title}
          </Typography.Section>
        </TouchableOpacity>
        <Typography.Body
          spaceY={15}
          spaceX={5}
          width={SCREEN_WIDTH * 0.6}
          color={colors.typeface.secondary}
        >
          {item.description}
        </Typography.Body>
      </View>
    </LayoutRow>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  image: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(20),
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(CalendarItem);
