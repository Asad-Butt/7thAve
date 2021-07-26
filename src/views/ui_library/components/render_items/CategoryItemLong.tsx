/**
 *
 * 7th Ave - Category Item Long Version
 *
 */
import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";

/**
 * 7th Ave : UI Library
 */
import Typography from "../typography";
// Icons
import { Ok, iconSelector } from "../icons";

function CategoryItemLong({
  item,
  onPress,
  themes,
  darkModeEnabled,
  selected,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={{
        width: SCREEN_WIDTH * 0.9,
        backgroundColor: item.selected ? colors.formCardBG : colors.background,
        borderRadius: normalize(20),
        padding: normalize(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
      }}
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <Typography.H1SubTitle>
          {iconSelector(item.category)}
        </Typography.H1SubTitle>
        <Typography.H1SubTitle spaceY={20}>
          {item.category}
        </Typography.H1SubTitle>
      </View>
      {selected && <Ok />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.85,
    borderRadius: normalize(30),
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  catContainer: {
    justifyContent: "space-around",
    height: SCREEN_HEIGHT * 0.75,
  },
  modal: {
    margin: 0,
    flex: 1,
  },
  bumper: {
    backgroundColor: "rgba(156,170,180,0.3)",
    width: normalize(50),
    borderRadius: 5,
    height: normalize(8),
    alignSelf: "center",
    marginBottom: normalize(20),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(CategoryItemLong);
