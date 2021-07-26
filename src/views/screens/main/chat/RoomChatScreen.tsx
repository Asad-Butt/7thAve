/**
 *
 * 7th Ave - Room Chat Screen
 *
 */
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate, goBack } from "../../../../routers/RootNavigation";
import { AntDesign } from "@expo/vector-icons";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout, LayoutRow } from "../../../ui_library/layouts/";
import { Heading, SubHeading } from "../../../ui_library/components/typography";
import Message from "../../../ui_library/components/render_items/Message";
import UserMessage from "../../../ui_library/components/render_items/UserMessage";

import { useJanus } from "../../../../hooks/useAudioRooms";
import { ChatInput } from "../../../ui_library/components/inputs";
import Icons from "../../../ui_library/components/icons";

function RoomChatScreen({
  username,
  dispatch,
  themes,
  darkModeEnabled,
  route,
  chat,
}: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const [avoid, setAvoid] = useState(false);
  const { localMessage, setLocalMessage, chatSubmit }: any = useJanus();

  const chatState = useSelector((state) => state.audio.chat);

  const defaultChat = [
    {
      username: "beyonce",
      userImage:
        "https://api.time.com/wp-content/uploads/2014/04/beyonce-knowles-time-100-feat.jpg?quality=85&w=407",
      createdAt: new Date(),
      messageBody:
        "cupiditate nobis nesciunt quidem totam dignissimos libero obcaecati illum facilis? Sequi alias sint quam. ",
    },
    {
      username: "beyonce",
      userImage:
        "https://api.time.com/wp-content/uploads/2014/04/beyonce-knowles-time-100-feat.jpg?quality=85&w=407",
      createdAt: new Date(),
      messageBody: "cupiditate nobis ",
    },
    {
      username: "beyonce",
      userImage:
        "https://api.time.com/wp-content/uploads/2014/04/beyonce-knowles-time-100-feat.jpg?quality=85&w=407",
      createdAt: new Date(),
      messageBody: "cupiditate nobis daris",
    },
    {
      username: "beyonce",
      userImage:
        "https://api.time.com/wp-content/uploads/2014/04/beyonce-knowles-time-100-feat.jpg?quality=85&w=407",
      createdAt: new Date(),
      messageBody: "cupiditate nobis daris",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView />
      <LayoutRow>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            goBack();
          }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <SubHeading spaceX={10}>Discussion</SubHeading>
      </LayoutRow>
      <View
        style={{
          justifyContent: "flex-end",
          height: SCREEN_HEIGHT * 0.75,
        }}
      >
        <FlatList
          contentContainerStyle={{
            paddingBottom: avoid ? normalize(330) : 0,
          }}
          style={{
            maxHeight: SCREEN_HEIGHT * 0.75,
            width: SCREEN_WIDTH * 0.9,
          }}
          showsVerticalScrollIndicator={false}
          data={chat?.length === undefined ? defaultChat : chatState}
          key={"$"}
          keyExtractor={({ item }, index) => `list${index + Math.random()}`}
          renderItem={({ item }) =>
            item.username === username ? (
              <UserMessage item={item} />
            ) : (
              <Message item={item} />
            )
          }
        />
      </View>
      <KeyboardAvoidingView enabled={avoid} behavior={"position"}>
        <View
          style={[styles.inputCont, { backgroundColor: colors.background }]}
        >
          <ChatInput
            value={localMessage}
            onChangeText={setLocalMessage}
            onFocus={() => setAvoid(true)}
            onBlur={() => setAvoid(false)}
            submit={() => {
              if (localMessage.length > 0) chatSubmit();
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (localMessage.length > 0) {
                chatSubmit();
                setLocalMessage("");
                Keyboard.dismiss();
              }
            }}
          >
            <Icons.Send />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 0,
    alignItems: "center",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  inputCont: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: normalize(10),
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  user: { username },
  audio: { chat },
}: any) => ({
  themes,
  darkModeEnabled,
  username,
  chat,
});
export default connect(mapStateToProps)(RoomChatScreen);
