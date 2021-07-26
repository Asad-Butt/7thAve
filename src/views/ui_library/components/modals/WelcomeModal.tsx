/**
 *
 * 7th Ave - Welcome/Patch Modal
 *
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  ImageBackground,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// 3rd Party
import Modal from "react-native-modal";
// Utilities
import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout } from "../../../ui_library/layouts/";
import {
  Body,
  Heading,
  SubHeading,
} from "../../../ui_library/components/typography";
import Button from "../../../ui_library/components/buttons";

const patchPhoto = require("../../../../../assets/stock/photo-1543689604-6fe8dbcd1f59.jpeg");
const welcomePhoto = require("../../../../../assets/stock/photo-1529739121416-921f4dae728e.jpeg");

export default function WelcomeModal() {
  // Theme & Color Pallets
  const {
    themes,
    darkModeEnabled,
    firstDownload,
    showPatchNotes,
    patchNotesViewed,
  } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  // Local State

  const [backgroundImage, setBackgroundImage] = useState(welcomePhoto);

  useEffect(() => {
    setBackgroundImage(showPatchNotes ? patchPhoto : welcomePhoto);
  }, []);
  // Helper Functions
  function handleAccept() {
    dispatch({
      type: "app/welcomeViewed",
    });
  }

  return (
    <Modal
      isVisible={(firstDownload || showPatchNotes) && !patchNotesViewed}
      backdropOpacity={0.75}
      animationIn={"fadeIn"}
      animationOut={"fadeOutDown"}
      animationInTiming={2500}
      animationOutTiming={1000}
      style={{
        margin: 0,
        alignSelf: "center",
      }}
    >
      <ImageBackground
        source={backgroundImage}
        style={styles.background}
        imageStyle={styles.background}
      >
        <Layout
          centeredX={true}
          height={0.85}
          width={0.85}
          style={styles.container}
        >
          <View style={styles.subContainer}>
            <Heading
              color={
                showPatchNotes
                  ? colors.typeface.warning
                  : colors.typeface.primary
              }
              style={[
                styles.centerText,
                showPatchNotes ? styles.bigTitle : styles.biggerTitle,
              ]}
            >
              {showPatchNotes ? "Updates" : "Welcome"}
            </Heading>
            {showPatchNotes && (
              <View
                style={[
                  {
                    backgroundColor: colors.formCardBG,
                  },
                  styles.infoCont,
                ]}
              >
                <SubHeading spaceX={30} spaceY={8}>
                  🎙{"     "}Improved audio
                </SubHeading>
                <SubHeading spaceX={30} spaceY={8}>
                  ☄️{"     "}Increased stability
                </SubHeading>
                <SubHeading spaceX={30} spaceY={8}>
                  🐛{"     "}Minor bug fixes
                </SubHeading>
              </View>
            )}
          </View>
          <Button.Primary
            width={0.75}
            style={styles.alignEnd}
            onPress={handleAccept}
          >
            Pull up
          </Button.Primary>
        </Layout>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    height: SCREEN_HEIGHT * 0.85,
    width: SCREEN_WIDTH * 0.85,
    borderRadius: normalize(20),
  },
  container: {
    borderRadius: normalize(20),
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  subContainer: {
    height: SCREEN_HEIGHT * 0.75,
    width: SCREEN_WIDTH * 0.75,
  },
  centerText: {
    textAlign: "center",
  },
  alignEnd: {
    alignSelf: "flex-end"
  },
  image: {
    height: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.7,
    borderRadius: normalize(20),
  },
  bigTitle: {
    fontSize: normalize(38),
    marginBottom: normalize(20),
  },
  biggerTitle: {
    fontSize: normalize(50),
    marginBottom: normalize(20),
    marginTop: normalize(20),
  },
  infoCont: {
    borderRadius: normalize(20),
    paddingVertical: normalize(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
