import React, { useState, useRef } from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import normalize from "../utils/normalize";

import { useSelector, useDispatch } from "react-redux";

// UI Library
import {
  ActivityIcon,
  ConversationIcon,
} from "../views/ui_library/components/icons/tabs";
// Tabs
import AcvtivityTab from "../views/ui_library/components/tabs/ActivityTab";
import ConversationsTab from "../views/ui_library/components/tabs/ConversationsTabs";

const Tab = createMaterialTopTabNavigator();

function InboxTabs() {
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const { tabBarFocus } = useSelector((state: any) => state.inbox);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  const dispatch = useDispatch();

  return (
    <Tab.Navigator
      initialRouteName="User"
      swipeEnabled={false}
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        style: { marginTop: normalize(10) },
        indicatorStyle: {
          backgroundColor: tabBarFocus ? colors.secondary : colors.primary,
        },
        tabStyle: {
          height: SCREEN_HEIGHT * 0.055,
          // backgroundColor: "blue",
          paddingTop: normalize(-10),
        },
      }}
    >
      <Tab.Screen
        name="Activity"
        component={AcvtivityTab}
        options={{
          tabBarIcon: ({ focused }) => <ActivityIcon focused={focused} />,
        }}
      />
      {/* <Tab.Screen
        name="Conversations"
        component={ConversationsTab}
        options={{
          tabBarIcon: ({ focused }) => {
            return <ConversationIcon focused={focused} />;
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <InboxTabs />
    </NavigationContainer>
  );
}

// dispatch({ type: "inbox/toggleTabFocus", payload: focused });
