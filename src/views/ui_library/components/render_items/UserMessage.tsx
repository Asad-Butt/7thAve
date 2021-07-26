import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { Body } from "../typography";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function UserMessage({ darkModeEnabled, themes, item }: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View style={styles.messageItem}>
      <View
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 15,
          paddingVertical: 8,
          paddingHorizontal: 12.5,
          justifyContent: "center",
          maxWidth: SCREEN_WIDTH * 0.725,
          alignSelf: "flex-end",
        }}
      >
        <Body color={colors.background}>{item.messageBody}</Body>
      </View>
      <Text style={styles.messageItemTime}>
        {moment(item.timestamp).fromNow(false)}
      </Text>
    </View>
  );
}

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});

export default connect(mapStateToProps)(UserMessage);

const styles = StyleSheet.create({
  messageItem: {
    marginVertical: 7.5,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  messageItemTime: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "center",
    marginVertical: 5,
  },
});
