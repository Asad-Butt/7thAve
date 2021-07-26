/**
 * All Stacks
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * Stack and Screens
 */

// Home
import HomeScreen from "./home/index";
import UserScreen from "./home/UserScreen";
const HomeStackNavigator = createStackNavigator();
// Explore
import ExploreScreen from "./explore/index";
const ExploreStackNavigator = createStackNavigator();
// Chat
import ChatScreen from "./chat/index";
import NewRoomScreen from "./chat/NewRoomScreen";
import RoomChatScreen from "./chat/RoomChatScreen";
const ChatStackNavigator = createStackNavigator();
// Inbox
import InboxScreen from "./inbox/index";
// Google place
import GooglePlace from "../common_google_place";
const InboxStackNavigator = createStackNavigator();
// Calendar
import CalendarScreen from "./calendar/index";
import UserEditScreen from "./home/UserEditScreen";
import SettingsScreen from "./home/SettingsScreen";
import RoomScreen from "./chat/RoomScreen";
import OtherUserScreen from "./home/OtherUserScreen";

const CalendarStackNavigator = createStackNavigator();

function Home() {
  return (
    <HomeStackNavigator.Navigator initialRouteName={"LandingScreen"}>
      <HomeStackNavigator.Screen
        name={"Home"}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name={"User-Profile"}
        component={UserScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStackNavigator.Screen
        name={"Other-User-Profile"}
        component={OtherUserScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStackNavigator.Screen
        name={"User-Edit"}
        component={UserEditScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStackNavigator.Screen
        name={"Settings"}
        component={SettingsScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <HomeStackNavigator.Screen
        name={"Inbox"}
        component={InboxScreen}
        options={{ headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name={"GooglePlace"}
        component={GooglePlace}
        options={{ headerShown: false }}
      />
    </HomeStackNavigator.Navigator>
  );
}
function Explore() {
  return (
    <ExploreStackNavigator.Navigator initialRouteName={"Explore"}>
      <ExploreStackNavigator.Screen
        name={"Explore"}
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
    </ExploreStackNavigator.Navigator>
  );
}
function Chat() {
  return (
    <ChatStackNavigator.Navigator initialRouteName={"New-Room"}>
      <ChatStackNavigator.Screen
        name={"New-Room"}
        component={NewRoomScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          detachPreviousScreen: true,
        }}
        initialParams={{ scheduled: false }}
      />
      <ChatStackNavigator.Screen
        name={"Room"}
        component={RoomScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          detachPreviousScreen: true,
        }}
      />
      <ChatStackNavigator.Screen
        name={"Room-Chat"}
        component={RoomChatScreen}
        options={{ headerShown: false }}
      />
    </ChatStackNavigator.Navigator>
  );
}
function Inbox() {
  return (
    <InboxStackNavigator.Navigator initialRouteName={"Inbox"}>
      <InboxStackNavigator.Screen
        name={"Inbox"}
        component={InboxScreen}
        options={{ headerShown: false }}
      />
    </InboxStackNavigator.Navigator>
  );
}
function Calendar() {
  return (
    <CalendarStackNavigator.Navigator initialRouteName={"Calendar"}>
      <CalendarStackNavigator.Screen
        name={"Calendar"}
        component={CalendarScreen}
        options={{ headerShown: false }}
      />
      <CalendarStackNavigator.Screen
        name={"New-Event"}
        component={NewRoomScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </CalendarStackNavigator.Navigator>
  );
}

export default {
  Home,
  Explore,
  Chat,
  Inbox,
  Calendar,
};
