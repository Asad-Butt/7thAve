/**
 * 7th Ave - Home Screen
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../../../../utils/normalize";
// Utilities
import moment from "moment";
import { navigate } from "../../../../routers/RootNavigation";
// 7th UI Library
import { Layout } from "../../../ui_library/layouts";
import Typography from "../../../ui_library/components/typography";
import ExperienceItem from "../../../ui_library/components/render_items/ExperienceItem";
import EmptyConvo from "../../../ui_library/components/render_items/EmptyConvo";
import Icons from "../../../ui_library/components/icons";
import WelcomeModal from "../../../ui_library/components/modals/WelcomeModal";
// Hooks
import { useJanus } from "../../../../hooks/useAudioRooms";
// 3rd Party
import Modal from "react-native-modal";
import RulesModal from "../../../ui_library/components/modals/RulesModal";

export default function HomeScreen() {
  // App + Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  const dispatch = useDispatch();
  // Redux State
  const { roomList, minimized } = useSelector((state: any) => state.audio);
  const { photo, firstName, lastName, username } = useSelector(
    (state: any) => state.user
  );
  // Local State

  const [currentTime, setCurrentTime] = useState(new Date().getHours());
  const [greeting, setGreeting] = useState("Good ");
  // Date & Greeting
  useEffect(() => {
    let timer: any;
    if (currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime <= 17)
      setGreeting("Good afternoon");
    else if (currentTime >= 17 && currentTime <= 24)
      setGreeting("Good evening");
    timer = setTimeout(() => {
      setCurrentTime(new Date().getHours());
    }, 600000);
    return () => {
      clearTimeout(timer);
    };
  }, [currentTime]);
  const { toggleRefresh, refresh } = useJanus();

  const [enterRoomModal, setEnterRoomModal] = useState(false);

  return (
    <>
      <Layout>
        <View style={styles.rowBetween}>
          <View>
            <Typography.Heading>{greeting}</Typography.Heading>
            <Typography.Subtitle color={colors.typeface.secondary}>
              {moment().format("dddd, MMMM Do")}
            </Typography.Subtitle>
          </View>
          <View style={{ width: normalize(0) }}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => navigate("Inbox", {})}
            >
              <Icons.InboxIcon size={40} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigate("User-Profile", {})}
          >
            <Image
              style={styles.profileImg}
              source={{
                uri: photo
                  ? photo
                  : "https://are.uconn.edu/wp-content/uploads/sites/2327/2020/09/Empty-Image.png",
              }}
            />
          </TouchableOpacity>
        </View>

        {roomList.length === 0 ? (
          <Typography.Section></Typography.Section>
        ) : (
          <Typography.Section>Join an experience</Typography.Section>
        )}

        <FlatList
          ListEmptyComponent={EmptyConvo}
          onRefresh={() => toggleRefresh()}
          refreshing={refresh}
          renderItem={({ item }: any) => (
            <>
              <ExperienceItem
                currentTheme={colors}
                item={item}
                // onPress={() => setEnterRoomModal(true)}
                onPress={() => {
                  dispatch({
                    type: "audio/enter",
                    payload: {
                      ...item,
                    },
                  });
                }}
              />
              {/* <RulesModal
                showModal={enterRoomModal}
                endModalFunc={setEnterRoomModal}
                enterFunc={() => {
                  
                  setEnterRoomModal(false);
                }}
              /> */}
            </>
          )}
          data={roomList}
          keyExtractor={(item: any) => item.roomID}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={[
            {
              justifyContent: "space-evenly",
            },
          ]}
          style={
            minimized
              ? { marginBottom: SCREEN_HEIGHT * 0.2 }
              : { marginBottom: SCREEN_WIDTH * 0.21 }
          }
          horizontal={false}
        />
      </Layout>
      {/* <WelcomeModal /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: normalize(25),
    width: SCREEN_WIDTH * 0.9,
  },
  profileImg: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: 25,
  },
});
