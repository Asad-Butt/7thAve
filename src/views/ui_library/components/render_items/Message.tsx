import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { Body, Subtitle } from "../typography";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

function Message({ darkModeEnabled, themes, item }: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <View style={styles.messageItem}>
      <Image source={{ uri: item.userImage }} style={styles.messageItemImage} />
      <View>
        <View style={styles.row}>
          <Subtitle color={colors.typeface.secondary}>{item.username}</Subtitle>
          <Text style={styles.messageItemTime}>
            {moment(item.createdAt).fromNow(false)}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.formCardBG,
            borderRadius: 15,
            paddingVertical: 8,
            paddingHorizontal: 12.5,
            justifyContent: "center",
            maxWidth: SCREEN_WIDTH * 0.725,
            alignSelf: "flex-start",
          }}
        >
          <Body
            color={colors.typeface.primary}
            style={{
              maxWidth: SCREEN_WIDTH * 0.725,
            }}
          >
            {item.messageBody}
          </Body>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});

export default connect(mapStateToProps)(Message);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.6,
  },
  messageItem: {
    marginVertical: 7.5,
    flexDirection: "row",
    maxWidth: SCREEN_WIDTH * 0.9,
  },
  messageItemImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  messageItemUser: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginBottom: 5,
  },
  messageItemTime: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginBottom: 5,
    alignSelf: "center",
  },
});
