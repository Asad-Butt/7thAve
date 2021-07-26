/**
 *
 * 7th Ave - Button sets
 *
 */
import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
import Typography from "../typography";

export function BigButtonComponent({
  themes,
  darkModeEnabled,
  children,
  onPress,
  width,
  small,
  spaceY,
  spaceX,
  backgroundColor,
  color,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const setWidth = width ? SCREEN_WIDTH * width : SCREEN_WIDTH * 0.9;
  const isSmallHeight = small ? normalize(42.5) : normalize(50);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.bigBtn,
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.secondary,
          width: setWidth,
          height: isSmallHeight,
          marginVertical: spaceY ? normalize(spaceY) : 0,
          marginHorizontal: spaceX ? normalize(spaceX) : 0,
        },
      ]}
    >
      <Typography.SubHeading color={color ? color : colors.background}>
        {children}
      </Typography.SubHeading>
    </TouchableOpacity>
  );
}
export function SmallButtonComponent({
  themes,
  darkModeEnabled,
  children,
  onPress,
  width,
  small,
  spaceY,
  spaceX,
  space,
  backgroundColor,
  color,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const setWidth = width ? SCREEN_WIDTH * width : SCREEN_WIDTH * 0.9;
  const isSmallHeight = small ? normalize(42.5) : normalize(40);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.smallBtn,
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.secondary,
          margin: space ? normalize(space) : undefined,
          width: setWidth,
          height: isSmallHeight,
          marginVertical: spaceY ? normalize(spaceY) : undefined,
          marginHorizontal: spaceX ? normalize(spaceX) : undefined,
        },
      ]}
    >
      <Typography.BodyBold color={color ? color : colors.background}>
        {children}
      </Typography.BodyBold>
    </TouchableOpacity>
  );
}

export function BigButtonSecondaryComponent({
  themes,
  darkModeEnabled,
  children,
  onPress,
  width,
  small,
  spaceY,
  spaceX,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const setWidth = width ? SCREEN_WIDTH * width : SCREEN_WIDTH * 0.9;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.bigBtnSecondary,
        {
          backgroundColor: colors.background,
          borderColor: colors.secondary,
          width: setWidth,
          marginVertical: spaceY ? normalize(spaceY) : 0,
          marginHorizontal: spaceX ? normalize(spaceX) : 0,
        },
      ]}
    >
      <Typography.SubHeading color={colors.secondary}>
        {children}
      </Typography.SubHeading>
    </TouchableOpacity>
  );
}

/**
 *
 * @param isLoading boolean
 * @param onPress function
 */

export function LoadingButtonComponent({
  themes,
  darkModeEnabled,
  children,
  onPress,
  width,
  small,
  spaceY,
  spaceX,
  backgroundColor,
  color,
  loading,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const setWidth = width ? SCREEN_WIDTH * width : SCREEN_WIDTH * 0.9;
  const isSmallHeight = small ? normalize(42.5) : normalize(50);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.bigBtn,
        {
          backgroundColor: backgroundColor ? backgroundColor : colors.secondary,
          width: setWidth,
          height: isSmallHeight,
          marginVertical: spaceY ? normalize(spaceY) : 0,
          marginHorizontal: spaceX ? normalize(spaceX) : 0,
        },
      ]}
    >
      {loading ? (
        <LottieView
          style={{ width: normalize(300) }}
          source={require("../../../../../assets/lottie/lf30_editor_gxepuk0u.json")}
          autoPlay
          loop
        />
      ) : (
        <Typography.SubHeading color={color ? color : colors.background}>
          {children}
        </Typography.SubHeading>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(15),
    height: normalize(50),
  },
  bigBtnSecondary: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(15),
    borderWidth: 1.5,
    height: normalize(50),
  },
  smallBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10),
    height: normalize(50),
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
const Primary = connect(mapStateToProps)(BigButtonComponent);
const Secondary = connect(mapStateToProps)(BigButtonSecondaryComponent);
const LoadingButton = connect(mapStateToProps)(LoadingButtonComponent);
const Small = connect(mapStateToProps)(SmallButtonComponent);

export default {
  Primary,
  Secondary,
  LoadingButton,
  Small,
};
