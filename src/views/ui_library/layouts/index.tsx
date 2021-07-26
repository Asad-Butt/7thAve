/**
 *
 * 7th Ave - Standard Layout
 *
 */
import React from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../utils/normalize";

function LayoutComponent({
  themes,
  darkModeEnabled,
  children,
  centeredY,
  centeredX,
  height,
  width,
  backgroundColor,
  noPad,
  spaceY,
  spaceX,
  notSafe,
  style,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
            justifyContent: centeredY ? "center" : "flex-start",
            alignItems: centeredX ? "center" : "flex-start",
            height: height ? SCREEN_HEIGHT * height : SCREEN_HEIGHT,
            width: width ? SCREEN_WIDTH * width : SCREEN_WIDTH,
            padding: noPad ? 0 : normalize(15),
            marginVertical: spaceY ? normalize(spaceY) : 0,
            marginHorizontal: spaceX ? normalize(spaceX) : 0,
          },
          style,
        ]}
      >
        {!notSafe && <SafeAreaView />}
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
function LayoutScrollComponent({
  themes,
  darkModeEnabled,
  children,
  centeredY,
  centeredX,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.background,
          justifyContent: centeredY ? "center" : "flex-start",
          alignItems: centeredX ? "center" : "flex-start",
        }}
      >
        {children}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
function ScrollComponent({
  themes,
  darkModeEnabled,
  children,
  centeredY,
  centeredX,
  height,
  width,
  backgroundColor,
  noPad,
  spaceY,
  spaceX,
  safe,
  style,
  bounces,
  contentStyle,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[style]}
      bounces={bounces}
      contentContainerStyle={[
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
          justifyContent: centeredY ? "center" : "flex-start",
          alignItems: centeredX ? "center" : "flex-start",
          height: height ? SCREEN_HEIGHT * height : SCREEN_HEIGHT,
          width: width ? SCREEN_WIDTH * width : SCREEN_WIDTH,
          padding: noPad ? 0 : normalize(15),
          marginVertical: spaceY ? normalize(spaceY) : 0,
          marginHorizontal: spaceX ? normalize(spaceX) : 0,
        },
        contentStyle,
      ]}
    >
      {safe && <SafeAreaView />}
      {children}
    </ScrollView>
  );
}

function RowLayoutComponent({
  themes,
  darkModeEnabled,
  children,
  align,
  justify,
  space,
  spaceY,
  spaceX,
  width,
  noPad,
  style,
  safe,
  backgroundColor,
  self,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        {safe && <SafeAreaView />}
        <View
          style={[
            styles.row,
            {
              backgroundColor: backgroundColor
                ? backgroundColor
                : colors.background,
              justifyContent: justify ? justify : "flex-start",
              alignItems: align ? align : "flex-start",
              alignSelf: self ? self : undefined,
              margin: space ? normalize(space) : 0,
              marginVertical: normalize(spaceY) ? normalize(spaceY) : 0,
              marginHorizontal: normalize(spaceX) ? normalize(spaceX) : 0,
              width: width
                ? width * SCREEN_WIDTH
                : SCREEN_WIDTH - normalize(15),
              padding: noPad ? 0 : normalize(15),
            },
            style,
          ]}
        >
          {children}
        </View>
      </>
    </TouchableWithoutFeedback>
  );
}

function FormLayoutComponent({
  themes,
  darkModeEnabled,
  children,
  centeredY,
  centeredX,
  enabled,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={"position"}
        enabled={enabled ? enabled : false}
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: centeredY ? "center" : "flex-start",
            alignItems: centeredX ? "center" : "flex-start",
          },
        ]}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: normalize(15),
  },
  row: {
    flexDirection: "row",
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  audio: { inRoom },
}: any) => ({
  themes,
  darkModeEnabled,
  inRoom,
});

export const Layout = connect(mapStateToProps)(LayoutComponent);
export const LayoutScroll = connect(mapStateToProps)(LayoutScrollComponent);
export const LayoutRow = connect(mapStateToProps)(RowLayoutComponent);
export const LayoutForm = connect(mapStateToProps)(FormLayoutComponent);
export const Scroll = connect(mapStateToProps)(ScrollComponent);

export default {
  Layout,
  LayoutScroll,
  LayoutRow,
  LayoutForm,
};
