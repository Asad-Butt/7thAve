/**
 *
 * 7th Ave - Category Item Component
 *
 */
import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import Typography, { H1SubTitle, H1Title } from "../typography";
import { Ok } from "../icons";

function CategoryItem({
  themes,
  darkModeEnabled,
  children,
  onPress,
  title,
  selected,
  item,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPress(item)}
        activeOpacity={0.75}
        style={[styles.categoryItem, { backgroundColor: colors.formCardBG }]}
      >
        {children}
        {selected && (
          <View style={styles.checked}>
            <Ok color={colors.red} />
          </View>
        )}
      </TouchableOpacity>
      <H1SubTitle>{title}</H1SubTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    width: SCREEN_WIDTH * 0.2,
    padding: normalize(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: normalize(10),
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(15),
  },
  checked: {
    zIndex: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(CategoryItem);
