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
import Svg, { Path, Ellipse, Circle, Rect } from "react-native-svg";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import { Body, Section } from "../../../ui_library/components/typography";
import Button from "../../../ui_library/components/buttons";

export default function SpeakerInvititationModal() {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  // Redux State
  const { currentRoom, leaveModal, speakerInvitation } = useSelector((state: any) => state.audio);
  const { username } = useSelector((state: any) => state.user);

  function handleAccept() {
    dispatch({ type: "audio/speakerInvitation", payload: "accept" });
  }

  return (
    <Modal
      style={{
        margin: 0,
      }}
      backdropOpacity={0.25}
      isVisible={speakerInvitation.invitation}
      swipeDirection={"down"}
      onSwipeComplete={() => dispatch({ type: "audio/speakerInvitation", payload: "decline" })}
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
          {`${speakerInvitation.sender.firstName} ${speakerInvitation.sender.lastName} has invited you to speak`}
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
            <Svg width={90} height={90} viewBox="0 0 54 54" fill="none">
              <Circle cx={27} cy={27} r={27} fill="#057176" fillOpacity={0.1} />
              <Path
                d="M26.737 32.826h.525c2.886 0 5.334-1.849 6.196-4.411a.58.58 0 00-.558-.758h-1.616a.923.923 0 01-.93-.917c0-.508.416-.92.93-.92h1.566a.932.932 0 00.939-.927.932.932 0 00-.939-.927h-1.566a.924.924 0 01-.93-.918c0-.508.416-.92.93-.92h1.566a.932.932 0 00.939-.927.932.932 0 00-.939-.927h-1.566a.924.924 0 01-.93-.92c0-.506.416-.918.93-.918h1.699c.389 0 .668-.368.563-.74-.771-2.71-3.292-4.696-6.284-4.696h-.525c-3.605 0-6.527 2.884-6.527 6.446v6.934c0 3.56 2.922 6.446 6.527 6.446z"
                fill="#057176"
              />
              <Path
                opacity={0.4}
                d="M38.297 24.738c-.802 0-1.453.642-1.453 1.435 0 5.36-4.416 9.72-9.843 9.72-5.429 0-9.845-4.36-9.845-9.72 0-.793-.65-1.435-1.453-1.435-.802 0-1.453.642-1.453 1.435 0 6.458 4.95 11.789 11.298 12.505v2.887c0 .792.65 1.435 1.453 1.435.802 0 1.453-.643 1.453-1.435v-2.887C34.8 37.962 39.75 32.63 39.75 26.173c0-.793-.651-1.435-1.453-1.435z"
                fill="#057176"
              />
            </Svg>
          </View>

          <Body style={{ textAlign: "center" }} spaceX={25}>
            {`Press accept to join the stage or swipe down this modal to decline.`}
          </Body>
          <Button.Secondary spaceY={5} onPress={handleAccept}>
            {"Accept"}
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
  container: {
    padding: normalize(12.5),
    borderRadius: normalize(15),
  },
  bumper: {
    backgroundColor: "rgba(156,170,180,0.3)",
    width: normalize(50),
    borderRadius: 5,
    height: normalize(8),
    alignSelf: "center",
  },
});
