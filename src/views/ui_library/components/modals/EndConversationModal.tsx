/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Dimensions, View } from "react-native";
import { navigate } from "../../../../routers/RootNavigation";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import Modal from "react-native-modal";
import normalize from "../../../../utils/normalize";
import Svg, { Rect, Path } from "react-native-svg";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import { Body, Section } from "../../../ui_library/components/typography";
import Button from "../../../ui_library/components/buttons";

export default function EndConversationModal() {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  // Redux State
  const { currentRoom, leaveModal } = useSelector((state: any) => state.audio);
  const { username } = useSelector((state: any) => state.user);

  function handleLeave() {
    dispatch({ type: "audio/leave" });
    navigate("Home", { screen: "Home" });
    dispatch({
      type: "app/showTabs",
    });
    dispatch({ type: "audio/closeLeaveModal" });
  }

  return (
    <Modal
      style={{
        margin: 0,
      }}
      backdropOpacity={0.25}
      isVisible={leaveModal}
      swipeDirection={"down"}
      onSwipeComplete={() => dispatch({ type: "audio/closeLeaveModal" })}
    >
      <Layout
        style={{
          position: "absolute",
          bottom: 0,
          margin: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: "space-between",
          paddingBottom: normalize(25),
        }}
        // centeredY={true}
        height={0.475}
      >
        <View style={[styles.bumper]} />
        <Section spaceX={12.5} spaceY={10}>
          {currentRoom.creator === username
            ? "End experience"
            : `Leave ${
                currentRoom.participants[currentRoom.creator]?.firstName
              }\'s experience`}
        </Section>
        <Layout
          centeredY={true}
          height={0.335}
          width={1}
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            {currentRoom.creator === username ? (
              <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
                <Rect
                  width={96}
                  height={96}
                  rx={40}
                  fill="#E74C3C"
                  fillOpacity={0.07}
                />
                <Path
                  d="M43.111 45.303l-6.043 6.198c-3.925-4.46-7.16-9.08-8.698-12.944-1.606-3.613-1.628-6.61-.022-8.85.624-1.052 4.26-5.466 7.493-5.329.87.069 1.717.526 2.52 1.35 1.249 1.257 4.773 5.808 5.04 7.134.312 1.51-.357 2.676-.937 3.728-.602 1.052-2.207 3.087-1.784 4.277a23.259 23.259 0 002.431 4.436zM70.385 59.413c.112 3.407-4.393 7.272-5.218 7.752-1.093.8-2.364 1.212-3.791 1.212-1.45 0-3.078-.411-4.84-1.258-4.17-1.783-9.322-5.58-14.117-10.085l6-6.15c1.85 1.462 3.858 2.674 5.91 3.523 1.137.432 3.1-1.215 4.148-1.832 1.025-.595 2.163-1.28 3.612-.96 1.316.274 5.754 3.956 6.98 5.236.804.846 1.227 1.715 1.316 2.562z"
                  fill="#E74C3C"
                />
                <Path
                  opacity={0.4}
                  d="M69.093 29.683v.023L47.907 51.41 28.75 71.053c-.38.366-.848.572-1.338.572-.491 0-.96-.206-1.36-.572a2.02 2.02 0 01-.29-2.378l.066-.092c.045-.07.09-.137.156-.206l40.41-41.46a1.835 1.835 0 011.339-.598c.513 0 1.003.231 1.36.597a2.01 2.01 0 010 2.767z"
                  fill="#E74C3C"
                />
              </Svg>
            ) : (
              <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
                <Rect
                  width={96}
                  height={96}
                  rx={40}
                  fill="#E74C3C"
                  fillOpacity={0.07}
                />
                <Path
                  opacity={0.4}
                  d="M25.5 35.506c0-5.515 4.568-10.006 10.18-10.006h11.163c5.6 0 10.157 4.477 10.157 9.983v25.011C57 66.011 52.432 70.5 46.818 70.5H35.66c-5.603 0-10.16-4.478-10.16-9.983V35.506z"
                  fill="#E74C3C"
                />
                <Path
                  d="M70.003 46.774L63.6 40.228a1.655 1.655 0 00-2.386.005 1.767 1.767 0 00.004 2.45l3.508 3.584H42.484c-.93 0-1.687.777-1.687 1.733 0 .958.756 1.732 1.687 1.732h22.242l-3.508 3.585a1.766 1.766 0 00-.004 2.45c.33.34.762.51 1.196.51.43 0 .861-.17 1.19-.506l6.403-6.543a1.761 1.761 0 000-2.454z"
                  fill="#E74C3C"
                />
              </Svg>
            )}
          </View>

          <Body style={{ textAlign: "center" }} spaceX={25}>
            {currentRoom.moderators[username] && Object.keys(currentRoom.moderators).length === 1 
              ? "Everyone will be kicked out.\n Are you sure? "
              : "You are about to leave this experience. \n Are you sure?"}
          </Body>
          <Button.Secondary spaceY={5} onPress={handleLeave}>
            {currentRoom.creator === username ? "Peace out ✌🏾" : "Peace out ✌🏾"}
          </Button.Secondary>
        </Layout>
      </Layout>
    </Modal>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  bumper: {
    backgroundColor: "rgba(156,170,180,0.3)",
    width: normalize(50),
    borderRadius: 5,
    height: normalize(8),
    alignSelf: "center",
  },
});
