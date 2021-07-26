/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, FlatList, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout, Scroll } from "../../../ui_library/layouts/";
import { Section } from "../../../ui_library/components/typography";
import ActivityItem from "../render_items/ActivityItem";

export default function ActivityTab({ route }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  // State
  const { activity, loadingActivity } = useSelector(
    (state: any) => state.inbox
  );
  const { token } = useSelector((state: any) => state.user);
  const user = useSelector((state: any) => state.user);
  console.warn(token);

  function getConnections() {
    dispatch({ type: "inbox/getConnectionRequests" });
  }

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: normalize(15),
        }}
        scrollEnabled={true}
        keyExtractor={(item) => item._id}
        data={activity}
        renderItem={({ item }) => <ActivityItem item={item} />}
        showsVerticalScrollIndicator={false}
        refreshing={loadingActivity}
        onRefresh={getConnections}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
