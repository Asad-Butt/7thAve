/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, View, Image } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import {
  Heading,
  H1SubTitle,
  H1Title,
  Body,
} from "../../../ui_library/components/typography";
import Button from "../../../ui_library/components/buttons/index";

export default function ActivityComponent({ item }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();

  const actionSwitch = (action: string, item: any) => {
    switch (action) {
      case "connect":
        return (
          <Button.Small
            onPress={() => {
              dispatch({
                type: "inbox/acceptConnection",
                payload: item.username,
              });
              setTimeout(() => {
                dispatch({ type: "inbox/getConnectionRequests" });
              }, 3500);
            }}
            spaceY={7}
            width={0.3}
          >
            Accept
          </Button.Small>
        );
      case "invite":
        return (
          <Button.Small
            onPress={() => console.warn(item)}
            spaceY={7}
            width={0.3}
          >
            Join
          </Button.Small>
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.formCardBG,
          paddingBottom: item.action !== "none" ? undefined : normalize(15),
        },
      ]}
    >
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.row}>
          <H1Title>{item.username}</H1Title>
          {/* <Body spaceX={10} color={colors.typeface.secondary}>
            {formatDistance(new Date(item.timestamp), new Date(), {
              addSuffix: true,
            }) === "Less than a minute ago"
              ? formatDistance(new Date(item.timestamp), new Date(), {
                  addSuffix: true,
                })
              : "now"}
          </Body> */}
        </View>
        <Body
          spaceX={10}
          color={colors.typeface.secondary}
          width={SCREEN_WIDTH * 0.65}
        >
          Requested to connect
        </Body>
        {actionSwitch("connect", item)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.9,
    borderRadius: normalize(15),
    marginVertical: normalize(5),
  },
  row: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.65,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: normalize(55),
    height: normalize(55),
    borderRadius: normalize(30),
    margin: normalize(10),
  },
  info: {
    margin: normalize(10),
  },
});
