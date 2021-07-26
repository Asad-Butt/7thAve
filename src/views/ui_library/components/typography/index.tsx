/**
 *
 * 7th Ave - Typography sets
 *
 */
import React from "react";
import { connect } from "react-redux";
import { Text, StyleSheet } from "react-native";
import normalize from "../../../../utils/normalize";

function HeadingTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.headingTxt,
        styles.boldFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function SubHeadingTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.subHeadingTxt,
        styles.boldFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceX ? normalize(spaceX) : 0,
          marginVertical: spaceY ? normalize(spaceY) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function SectionTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.sectionTxt,
        styles.boldFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function H1TitleTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.h1TitleTxt,
        styles.boldFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

function BodyTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.bodyTxt,
        styles.basicFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? normalize(spaceY) : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function BodyBoldTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.bodyTxt,
        styles.boldFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function SubtitleTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.subtitleOrCaptionText,
        styles.basicFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function CaptionTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.subtitleOrCaptionText,
        styles.basicFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function Caption2Typography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.subtitleOrCaptionText,
        styles.basicFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
function ButtonTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.buttonTxt,
        styles.basicFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

function H1SubtitleTypography({
  themes,
  darkModeEnabled,
  children,
  color,
  spaceX,
  spaceY,
  width,
  style,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  return (
    <Text
      style={[
        styles.h1TitleTxt,
        styles.basicFont,
        {
          color: color ? color : colors.typeface.primary,
          marginHorizontal: spaceY ? spaceY : 0,
          marginVertical: spaceX ? normalize(spaceX) : 0,
          width: width ? normalize(width) : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const percentage = 1;
const styles = StyleSheet.create({
  basicFont: {
    fontFamily: "Poppins",
  },
  boldFont: {
    fontFamily: "Poppins-Bold",
  },
  headingTxt: {
    fontSize: normalize(20 * percentage),
  },
  subHeadingTxt: {
    fontSize: normalize(18 * percentage),
  },
  sectionTxt: {
    fontSize: normalize(15 * percentage),
  },
  h1TitleTxt: {
    fontSize: normalize(16 * percentage),
  },
  bodyTxt: {
    fontSize: normalize(13 * percentage),
  },
  subtitleOrCaptionText: {
    fontSize: normalize(12 * percentage),
  },
  buttonTxt: {
    fontSize: normalize(14 * percentage),
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export const Heading = connect(mapStateToProps)(HeadingTypography);
export const SubHeading = connect(mapStateToProps)(SubHeadingTypography);
export const Section = connect(mapStateToProps)(SectionTypography);
export const H1Title = connect(mapStateToProps)(H1TitleTypography);
export const Body = connect(mapStateToProps)(BodyTypography);
export const BodyBold = connect(mapStateToProps)(BodyBoldTypography);
export const Subtitle = connect(mapStateToProps)(SubtitleTypography);
export const Caption = connect(mapStateToProps)(CaptionTypography);
export const Caption2 = connect(mapStateToProps)(Caption2Typography);
export const Button = connect(mapStateToProps)(ButtonTypography);
export const H1SubTitle = connect(mapStateToProps)(H1SubtitleTypography);

export default {
  Heading,
  SubHeading,
  Section,
  H1Title,
  Body,
  BodyBold,
  Subtitle,
  Caption,
  Caption2,
  Button,
  H1SubTitle,
};
