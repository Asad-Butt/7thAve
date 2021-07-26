/**
 *
 * 7th Ave - Room Timer
 *
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";

/**
 * 7th Ave : UI Library
 */
import { Body, BodyBold } from "../../../ui_library/components/typography";
/**
 * 3rd Party
 */
import Moment from "moment";
import normalize from "../../../../utils/normalize";

export default function RoomTimer({ time }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Time Logic
  const now = Moment();
  const started = Moment(time);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(now.diff(started, "seconds"));
    }, 999);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  // Helps to start timer
  useEffect(() => setTimer(1), []);

  function hours(millaseconds: number) {
    return `0${Math.floor(millaseconds / 3600)}`;
  }
  function minutes(millaseconds: number) {
    const totalMinutes = Math.floor(millaseconds / 60);
    if (
      totalMinutes > 60 &&
      Math.floor(millaseconds / 60) - Math.floor(timer / 3600) * 60 < 10
    ) {
      return `0${
        Math.floor(millaseconds / 60) - Math.floor(timer / 3600) * 60
      }`;
    } else if (totalMinutes > 60) {
      return `${Math.floor(millaseconds / 60) - Math.floor(timer / 3600) * 60}`;
    } else if (totalMinutes < 10) {
      return `0${totalMinutes}`;
    } else {
      return totalMinutes;
    }
  }
  function seconds(millaseconds: number) {
    return Math.floor(millaseconds % 60) < 10
      ? `0${Math.floor(millaseconds % 60)}`
      : Math.floor(millaseconds % 60);
  }
  return (
    <View
      style={{
        backgroundColor: colors.formCardBG,
        padding: normalize(4),
        borderRadius: normalize(10),
        width: normalize(80),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: normalize(10),
      }}
    >
      <BodyBold color={colors.warning}>
        {hours(timer)}:{minutes(timer)}:{seconds(timer)}
      </BodyBold>
    </View>
  );
}
