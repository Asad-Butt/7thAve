import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { kFormatter } from "../../../../utils/algorithms";
import ExperienceTypeItemSmall from "../../../ui_library/components/render_items/ExperienceTypeItemSmall";
import Pill from "../icons/pills";
// Icons
import Typography from "../typography";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export function ConversationItem({
  themes,
  darkModeEnabled,
  item,
  currentTheme,
  index,
  onPress,
  disabled,
  minimized,
}: any) {
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const { username } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  console.warn(item);

  return (
    <View style={styles.convoItemCont}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          if (item.banned.find((item: string) => item === username)) {
            dispatch({
              type: "app/newInAppNotification",
              payload: {
                title: "Unauthorized",
                message: "You've been banned from this room.",
              },
            });
          } else {
            if (!minimized) {
              onPress();
            } else {
              Alert.alert("You must leave your current conversation first");
            }
          }
        }}
      >
        <ImageBackground
          style={[styles.convoImage, { borderRadius: 10 }]}
          imageStyle={{ borderRadius: 10 }}
          source={{
            uri: item.roomImage
              ? item.roomImage
              : "https://are.uconn.edu/wp-content/uploads/sites/2327/2020/09/Empty-Image.png",
          }}
        >
          {/* <ExperienceTypeItemSmall
            item={{
              text: item[1].type,
            }}
          /> */}
        </ImageBackground>
      </TouchableOpacity>
      <Pill spaceY={7.5} text={item.category ? item.category : "Social"} />
      <Typography.Body width={SCREEN_WIDTH * 0.425}>
        {item.roomName}
      </Typography.Body>

      <Typography.Subtitle color={colors.typeface.secondary}>
        {`${kFormatter(Object.keys(item.participants).length)} Enjoying`}
      </Typography.Subtitle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  bar: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  barTxt: {
    marginLeft: 20,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  convoTxt: {
    marginLeft: 20,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  convoCont: {
    justifyContent: "center",
  },
  convoItemCont: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  convoImage: {
    height: SCREEN_HEIGHT * 0.25,
    width: SCREEN_WIDTH * 0.425,
    justifyContent: "flex-end",
    padding: 7.5,
  },
  listeners: {
    fontSize: 14,
    marginVertical: 2.5,
    maxWidth: SCREEN_WIDTH * 0.4,
    fontFamily: "Poppins",
  },
  hashtag: {
    fontFamily: "Poppins",
    backgroundColor: "#bdbdbd",
    width: 140,
    margin: 10,
    borderRadius: 7.5,
    height: 25,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});

const mapStateToProps = ({
  app: { themes, darkModeEnabled },
  audio: { minimized },
}: any) => ({
  themes,
  darkModeEnabled,
  minimized,
});
export default connect(mapStateToProps)(ConversationItem);
