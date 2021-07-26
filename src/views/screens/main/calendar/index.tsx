/**
 *
 * 7th Ave - Interests Screen
 *
 */
import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, FlatList, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../routers/RootNavigation";

import normalize from "../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import { Layout, LayoutRow } from "../../../ui_library/layouts/";
import {
  Body,
  Heading,
  Section,
  SubHeading,
} from "../../../ui_library/components/typography";
import Icon from "../../../ui_library/components/icons";
import CalendarItem from "../../../ui_library/components/render_items/CalendarItem";
// import { SCHEDULE_DATA } from "../../../../../assets/dummy/schedule";

function CalendarScreen({ themes, darkModeEnabled, route }: any) {
  // Theme & Color Pallets
  const colors = darkModeEnabled ? themes.dark : themes.light;

  return (
    <Layout centeredX={true}>
      <LayoutRow noPad={true} justify={"space-between"} width={0.9}>
        <SubHeading>Events (coming soon)</SubHeading>
        {/* <TouchableOpacity
        onPress={() => navigate("New-Event", { scheduled: true })}
        >
          <Icon.ScheduleAdd />
        </TouchableOpacity> */}
      </LayoutRow>
      <FlatList
        ListEmptyComponent={() => (
          <View
            style={{
              alignSelf: "center",
              width: SCREEN_WIDTH * 0.9,
            }}
          >
            <View
              style={{
                marginVertical: normalize(50),
                justifyContent: "space-between",
              }}
            >
              <View>
                {/* <Heading spaceX={10}>Scheduling</Heading> */}
                {/* <Section>coming soon</Section> */}
                <CalendarItem
                  item={{
                    title: "Neighborhood Rules",
                    image:
                      "https://bostonglobe-prod.cdn.arcpublishing.com/resizer/Q30cwN5ei6i5LxWmDVqP2EzSrjk=/1440x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/QQLOWIGXWUI6RAUW2ANP7733MM.jpg",
                    category: "Management",
                    description:
                      "7th ave team talks community, tech, and building a metaverse",
                  }}
                />
              </View>
            </View>
            <View
              style={[
                styles.comingsoon,
                { backgroundColor: colors.formCardBG },
              ]}
            >
              <Section>Scheduling on 7th Ave!</Section>
              <Body spaceX={15}>Set the tone with a description 🖋</Body>
              <Body spaceX={15}>Add amazing speakers 💁🏾‍♀️ 🙋🏾‍♂️ </Body>
              <Body spaceX={15}>Invite your followers 📨</Body>
              <Body spaceX={15}>Grow your audience 📈</Body>
              <Body spaceX={15}>Share 🗣</Body>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CalendarItem item={item} />}
        // data={SCHEDULE_DATA}
        data={[]}
        keyExtractor={(item: any) => item._id}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  comingsoon: {
    borderRadius: normalize(25),
    padding: normalize(25),
    // alignItems: "center",
  },
});

const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
  themes,
  darkModeEnabled,
});
export default connect(mapStateToProps)(CalendarScreen);
