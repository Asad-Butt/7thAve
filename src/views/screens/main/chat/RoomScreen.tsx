/**
 *
 * 7th Ave - Room Screen
 *
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  FlatList,
  LogBox,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import * as WebBrowser from "expo-web-browser";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
import Modal from "react-native-modal";
/**
 * 7th Ave : UI Library
 */
import { Layout, LayoutRow, Scroll } from "../../../ui_library/layouts";
import {
  BodyBold,
  Heading,
  SubHeading,
  H1SubTitle,
  H1Title,
  Section,
  Body,
} from "../../../ui_library/components/typography";
import Icons, { OptionsVert } from "../../../ui_library/components/icons";
import ExperienceTypeItemSmall from "../../../ui_library/components/render_items/ExperienceTypeItemSmall";
import ParticipantMini from "../../../ui_library/components/render_items/participantMini";
import { Pill } from "../../../ui_library/components/icons/pills";
import UserImage from "../../../ui_library/components/images";
import Button from "../../../ui_library/components/buttons";
import SpeakerItem from "../../../ui_library/components/render_items/SpeakerItem";
import SmartHandIcon from "../../../ui_library/components/icons/smart/SmartHands";
import RaisedHandItem from "../../../ui_library/components/render_items/RaisedHandItem";
import EndConversationModal from "../../../ui_library/components/modals/EndConversationModal";
import SpeakerInvitationModal from "../../../ui_library/components/modals/SpeakerInvitationModal";

// IN CALL MANGER Debug
import InCallManager from "react-native-incall-manager";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RoomTimer from "../../../ui_library/components/misc/RoomTimer";

export default function RoomScreen() {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();

  const { chat, handsModal, currentRoom, handsRaised } = useSelector(
    (state: any) => state.audio
  );
  const { username, userId } = useSelector((state: any) => state.user);
  const {
    focusedUserModal,
    focusedUser,
    loadingUser,
    focusedUserIsConnection,
  } = useSelector((state: any) => state.inbox);

  // This is an unnecessary warning
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  function handleUserDeepFocus() {
    dispatch({ type: "inbox/closeFocusedUserModal" });
    dispatch({
      type: "audio/minimize",
      payload: true,
    });
    navigate("Other-User-Profile", {});
  }

  function handleKick(user: any) {
    dispatch({
      type: "audio/kick",
      payload: user,
    });
    dispatch({ type: "inbox/closeFocusedUserModal" });
  }

  function handleLetSpeak(user: any) {
    dispatch({
      type: "audio/speaker",
      payload: user,
    });
    dispatch({ type: "inbox/closeFocusedUserModal" });
  }

  function handleMakeModerator(user: any) {
    dispatch({
      type: "audio/newModerator",
      payload: user,
    });
    dispatch({ type: "inbox/closeFocusedUserModal" });
  }

  function handleMuteUser(user: any) {
    dispatch({
      type: "audio/silenceUser",
      payload: user,
    });
    dispatch({ type: "inbox/closeFocusedUserModal" });
  }

  const [handsRaisedSelected, setHandsRaisedSelected] = useState({
    ...handsRaised,
  });

  useEffect((): void => {
    setHandsRaisedSelected({ ...handsRaised });
  }, [handsRaised]);

  function handleNewSpeakers() {
    for (let username in selectedHands) {
      if (selectedHands[username]) {
        handleLetSpeak(currentRoom.participants[username]);
        let newState = selectedHands;
        newState[username] = false;
        setSelectedHands({ ...newState });
      }
    }
    dispatch({ type: "audio/closeHandsModal" });
  }

  const [selectedHands, setSelectedHands] = useState<any>({});

  function checkRank(currentRoom: any, checkSpeakers?: boolean) {
    let isHigherRank =
      !currentRoom.moderators[focusedUser.username] ||
      currentRoom.moderators[username].level >
        currentRoom.moderators[focusedUser.username]?.level;
    if (checkSpeakers)
      isHigherRank =
        currentRoom.speakers.includes(focusedUser.username) && isHigherRank;
    return isHigherRank;
  }

  const _handleReportPressAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://docs.google.com/forms/d/e/1FAIpQLSdPHsfowh5cx86Xu_ZRbthy5Yh9afWBE5JIADqeE5vdVhGT_Q/viewform?usp=sf_link"
    );
  };

  function minimizeRoom() {
    dispatch({
      type: "audio/minimize",
      payload: true,
    });
    dispatch({
      type: "app/showTabs",
    });
    navigate("Home", { screen: "Home" });
  }

  const [optionsModal, setOptionsModal] = useState(false);

  const [activeParticipants, setActiveParticipants] = useState([]);

  useEffect(() => {
    let newParticipantsState = { ...currentRoom.participants };
    let participantsToRender: any = [];
    let speakersToRemoveFromList: any = {};

    for (let speaker of currentRoom.speakers) {
      speakersToRemoveFromList[speaker] = true;
    }
    for (let participant in newParticipantsState) {
      if (participant in speakersToRemoveFromList) {
      } else {
        participantsToRender.push(currentRoom.participants[participant]);
      }
    }
    setActiveParticipants(participantsToRender);
  }, [currentRoom.participants, currentRoom.speakers.length]);

  const participantOnly = Object.entries(currentRoom.participants).filter(
    (e) =>
      currentRoom.speakers.findIndex((element) => element == e[1].username) ===
      -1
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {currentRoom &&
        currentRoom.participants &&
        Object.keys(currentRoom.participants).length > 0 && (
          <>
            <LayoutRow noPad={true} safe={true}>
              <View style={styles.row}>
                <SubHeading width={SCREEN_WIDTH * 0.65} spaceX={10}>
                  {currentRoom.participants[currentRoom.creator]?.firstName +
                    "'s experience  ✨"}
                </SubHeading>
              </View>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => setOptionsModal(true)}
              >
                <OptionsVert />
              </TouchableOpacity>
            </LayoutRow>
            <View style={styles.rowTwo}>
              <Pill spaceX={10} text={currentRoom.category} />
              <ExperienceTypeItemSmall
                item={{
                  text: currentRoom.conversationType,
                }}
              />
              <RoomTimer time={currentRoom.createdAt} />
            </View>
            <Heading style={{ alignSelf: "flex-start" }} spaceX={5} spaceY={15}>
              {currentRoom.roomName}
            </Heading>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {/** Speakers */}
              <FlatList
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  width: SCREEN_WIDTH * 0.925,
                  flex: 0,
                  padding: normalize(5),
                }}
                scrollEnabled={false}
                keyExtractor={({ item }: any, index) => item}
                data={currentRoom.speakers}
                renderItem={({ item }) => <SpeakerItem item={item} />}
                numColumns={2}
                horizontal={false}
                ListFooterComponent={() => (
                  <View>
                    {Object.entries(currentRoom.participants).length -
                      currentRoom.speakers.length >
                      0 && (
                      <>
                        <BodyBold
                          spaceX={10}
                          spaceY={10}
                          color={colors.typeface.secondary}
                        >
                          Listeners{" "}
                          {Object.entries(currentRoom.participants).length -
                            currentRoom.speakers.length}
                        </BodyBold>
                        <FlatList
                          columnWrapperStyle={{
                            justifyContent: "flex-start",
                            flex: 1,
                            width: SCREEN_WIDTH * 0.85,
                            alignSelf: "center",
                          }}
                          scrollEnabled={false}
                          keyExtractor={(item: any, index) => item[1].username}
                          data={participantOnly}
                          renderItem={({ item }) => {
                            return <ParticipantMini item={item} />;
                          }}
                          numColumns={4}
                          horizontal={false}
                        />
                      </>
                    )}
                  </View>
                )}
              />

              {/** End Speakers */}
            </ScrollView>
            <View
              style={[
                styles.bottomCont,
                { backgroundColor: colors.background },
              ]}
            >
              <LayoutRow
                height={0.15}
                spaceY={10}
                align={"center"}
                justify={"space-between"}
                style={styles.subCont}
              >
                {currentRoom.speakers.includes(username) ? (
                  <>
                    {currentRoom.participants.hasOwnProperty(username) &&
                    currentRoom.participants[username].muted ? (
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() =>
                          dispatch({ type: "audio/muteSelf", payload: {} })
                        }
                      >
                        <Icons.MicOff />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() =>
                          dispatch({ type: "audio/muteSelf", payload: {} })
                        }
                      >
                        <Icons.MicOn />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <Icons.HandRaised
                    onPress={() => {
                      dispatch({ type: "audio/raiseHand" });
                    }}
                  />
                )}
                <View style={styles.actionCont}>
                  <TouchableOpacity
                    onPress={() => dispatch({ type: "audio/openHandsModal" })}
                  >
                    <SmartHandIcon
                      number={Object.keys(handsRaised).length - 1}
                      size={1.4}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigate("Room-Chat", {});
                    }}
                  >
                    <Icons.SmartChat number={chat.length} size={1.4} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({ type: "audio/openLeaveModal" });
                    }}
                  >
                    <Icons.EndCall />
                  </TouchableOpacity>
                </View>
              </LayoutRow>
            </View>
          </>
        )}
      {/** Focused User Modal */}
      {/**TODO : Decouple and optimize */}
      <Modal
        style={{
          margin: 0,
        }}
        backdropOpacity={0.25}
        isVisible={focusedUserModal}
        swipeDirection={"down"}
        onSwipeComplete={() =>
          dispatch({ type: "inbox/closeFocusedUserModal" })
        }
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
            alignItems: "center",
          }}
          height={
            !currentRoom.moderators[username] || !checkRank(currentRoom)
              ? 0.35
              : checkRank(currentRoom, true)
              ? 0.575
              : 0.525
          }
        >
          <View style={[styles.bumper]} />
          {loadingUser ? (
            <LottieView
              style={{
                width: normalize(175),
                marginTop: currentRoom.moderators[username]
                  ? normalize(40)
                  : normalize(7.5),
                alignSelf: "center",
              }}
              source={require("../../../../../assets/lottie/7908-loading.json")}
              autoPlay
              loop
              speed={0.4}
            />
          ) : (
            <Layout centeredX={true} height={0.35}>
              <LayoutRow
                style={
                  currentRoom.moderators[focusedUser.username] && {
                    marginBottom: normalize(-25),
                  }
                }
                spaceY={-10}
              >
                <UserImage
                  pressable={true}
                  onLongPress={handleUserDeepFocus}
                  uri={focusedUser.photo}
                />
                <View>
                  <H1Title spaceY={25}>
                    {focusedUser.firstName + " " + focusedUser.lastName}
                  </H1Title>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onLongPress={handleUserDeepFocus}
                  >
                    <H1SubTitle
                      spaceX={2.5}
                      spaceY={25}
                      color={colors.typeface.secondary}
                    >
                      @{focusedUser.username}
                    </H1SubTitle>
                  </TouchableOpacity>
                  <Button.Small
                    onPress={() => {
                      dispatch({
                        type: "inbox/requestConnection",
                        payload: focusedUser.username,
                      });
                    }}
                    width={0.5}
                    spaceX={25}
                    spaceY={20}
                    color={
                      focusedUserIsConnection
                        ? colors.typeface.primary
                        : colors.typeface.warning
                    }
                    backgroundColor={
                      focusedUserIsConnection
                        ? colors.primary
                        : colors.secondary
                    }
                  >
                    {focusedUserIsConnection ? "Connected" : "Connect"}
                  </Button.Small>
                </View>
              </LayoutRow>

              {currentRoom.moderators[username] && (
                <>
                  {!currentRoom.moderators[focusedUser.username] && (
                    <LayoutRow
                      spaceY={5}
                      width={0.9}
                      style={[styles.bottomLine, styles.modTopOption]}
                    >
                      <Icons.ModUser />
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => handleMakeModerator(focusedUser)}
                      >
                        <H1SubTitle spaceY={25}>Make a moderator</H1SubTitle>
                      </TouchableOpacity>
                    </LayoutRow>
                  )}
                  {checkRank(currentRoom, true) && (
                    <LayoutRow spaceY={5} width={0.9} style={styles.bottomLine}>
                      {currentRoom.silenced.includes(focusedUser.username) ? (
                        <Icons.ModMicOn />
                      ) : (
                        <Icons.ModMicOff />
                      )}
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => handleMuteUser(focusedUser)}
                      >
                        <H1SubTitle spaceY={25}>
                          {currentRoom.silenced.includes(focusedUser.username)
                            ? "UnSilence Speaker"
                            : "Silence Speaker"}
                        </H1SubTitle>
                      </TouchableOpacity>
                    </LayoutRow>
                  )}
                  {checkRank(currentRoom) && (
                    <LayoutRow spaceY={5} width={0.9} style={styles.bottomLine}>
                      <Icons.ModSpeak />
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => handleLetSpeak(focusedUser)}
                      >
                        <H1SubTitle spaceY={25}>
                          {currentRoom.speakers.find(
                            (element: string) =>
                              focusedUser.username === element
                          )
                            ? "Remove speaker"
                            : "Invite to speak"}
                        </H1SubTitle>
                      </TouchableOpacity>
                    </LayoutRow>
                  )}
                  {checkRank(currentRoom) && (
                    <LayoutRow style={styles.bottomLine} spaceY={5} width={0.9}>
                      <Icons.ModKick />
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => handleKick(focusedUser)}
                      >
                        <H1SubTitle spaceY={25}>Ban from experience</H1SubTitle>
                      </TouchableOpacity>
                    </LayoutRow>
                  )}
                </>
              )}
              <LayoutRow spaceY={5} width={0.9} style={[]}>
                <Icons.ModUser />

                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={_handleReportPressAsync}
                >
                  <H1SubTitle spaceY={25}>Report user</H1SubTitle>
                </TouchableOpacity>
              </LayoutRow>
            </Layout>
          )}
        </Layout>
      </Modal>
      <Modal
        style={{
          margin: 0,
        }}
        backdropOpacity={0.25}
        isVisible={handsModal}
        swipeDirection={"down"}
        onSwipeComplete={() => dispatch({ type: "audio/closeHandsModal" })}
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
          }}
          height={0.515}
        >
          <View style={[styles.bumper]} />
          <Section spaceX={12.5}>Raised hands</Section>
          {/* <Section spaceX={12.5}>{JSON.stringify(handsRaised)}</Section> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ height: SCREEN_HEIGHT * 0.4 }}
            data={Object.entries(handsRaisedSelected)}
            key={"$"}
            keyExtractor={({ item }: any, index) =>
              `list${index + Math.random()}`
            }
            renderItem={({ item, index }) => (
              <RaisedHandItem
                item={item}
                selectedHands={selectedHands}
                onPress={() => {
                  let key = item[0];
                  if (selectedHands[key]) {
                    let newState = selectedHands;
                    newState[key] = false;
                    setSelectedHands({ ...newState });
                  } else {
                    // setSelectedHands({...selectedHands, selectedHands[key]: true })
                    let newState = selectedHands;
                    newState[key] = true;
                    setSelectedHands({ ...newState });
                  }
                }}
              />
            )}
            horizontal={false}
          />
          {currentRoom.moderators[username] &&
            Object.entries(selectedHands).length > 0 && (
              <Button.Secondary onPress={handleNewSpeakers} spaceY={15}>
                Allow to speak
              </Button.Secondary>
            )}
        </Layout>
      </Modal>
      <Modal
        style={{
          margin: 0,
        }}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={optionsModal}
        backdropOpacity={0.05}
        onBackdropPress={() => setOptionsModal(false)}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            justifyContent: "space-between",
            paddingHorizontal: normalize(25),
            alignItems: "center",
            flexDirection: "row",
            top: 80,
            right: 25,
            margin: 0,
            height: normalize(60),
            width: normalize(150),
            borderRadius: normalize(20),
            backgroundColor: colors.background,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
          activeOpacity={0.75}
          onPress={_handleReportPressAsync}
        >
          <H1Title>😥</H1Title>
          <H1Title>Report</H1Title>
        </TouchableOpacity>
      </Modal>
      <EndConversationModal />
      <SpeakerInvitationModal />
    </View>
  );
}

const styles = StyleSheet.create({
  basicRow: {
    flexDirection: "row",
  },
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomCont: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#9CAAB4",
  },
  actionCont: {
    marginRight: normalize(15),
    flexDirection: "row",
    justifyContent: "space-between",
    width: normalize(175),
  },
  subCont: {
    marginTop: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.85,
  },
  rowTwo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: normalize(7.5),
  },
  rowBasic: {
    flexDirection: "row",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatCont: {
    // flex: 1,
    width: SCREEN_WIDTH * 0.9,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    alignSelf: "center",
  },
  bumper: {
    backgroundColor: "rgba(156,170,180,0.3)",
    width: normalize(50),
    borderRadius: 5,
    height: normalize(8),
    alignSelf: "center",
  },
  bottomLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#9CAAB4",
  },
  modTopOption: {
    marginTop: normalize(-15),
  },
});
