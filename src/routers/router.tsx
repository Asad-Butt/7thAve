/**
 * 7th Ave - Router
 *
 * This is the main router for our application
 *
 * It is comprised of two essentail stacks, the onboarding/landing stack
 * & the main bottom tab navigator
 *
 * The landing stack is a simple stack navigator
 * While the main stack is comprised of a series of stacks for each tab & and a single floating chat component for
 * minimized conversations
 *
 * These two stacks are wrapped in the function AuthRouter at the bottom
 *  creating the authorization flow
 */
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { navigate, navigationRef } from "./RootNavigation";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import LinkingConfiguration from "./LinkingConfiguration";
// Stacks and Navigator Inits
const AuthWrapperStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
// All Stacks
import Stacks from "../views/screens/main/index";
import OnBoardingStack from "../views/screens/onboarding/index";

//Icons
import Icons from "../views/ui_library/components/icons/index";
import normalize from "../utils/normalize";

import ChatHover from "../views/ui_library/components/ChatMimized";

/**
 * Context Systems
 */
import { ProvideJanus } from "../../src/hooks/useAudioRooms";
// Modals
import WelcomeModal from "../views/ui_library/components/modals/WelcomeModal";
import InAppNotificationModal from "../views/ui_library/components/modals/InAppNotificationModal";

function BottomTabNavigator({ bottomsTabs, dispatch }: any) {
  const { minimized, inRoom } = useSelector((state: any) => state.audio);

  const _handleSchedulePressAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.pullupon7th.com/calendar"
    );
  };

  return (
    <ProvideJanus>
      <BottomTab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: { height: normalize(100) },
        }}
        initialRouteName="Home"
      >
        <BottomTab.Screen
          name="Home"
          component={Stacks.Home}
          options={{
            tabBarVisible: bottomsTabs,

            tabBarIcon: ({ focused }) => <Icons.HomeIcon selected={focused} />,
          }}
        />
        <BottomTab.Screen
          name="Chat"
          component={Stacks.Chat}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              if (minimized) {
                e.preventDefault();
                dispatch({
                  type: "audio/minimize",
                  payload: false,
                });
                navigate("Chat", { screen: "Room" });
              }
              if (!inRoom) {
                // Prevent default action
                e.preventDefault();
                navigate("Chat", { screen: "New-Room" });
              }
            },
          })}
          options={{
            tabBarVisible: false,

            tabBarIcon: () => <Icons.ChatIcon />,
          }}
        />
        <BottomTab.Screen
          name="Calendar"
          component={Stacks.Calendar}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              // Prevent default action
              _handleSchedulePressAsync();
            },
          })}
          options={{
            tabBarVisible: bottomsTabs,

            tabBarIcon: ({ focused }) => (
              <Icons.CalendarIcon selected={focused} />
            ),
          }}
        />
      </BottomTab.Navigator>
      {/* {minimized && <ChatHover />} */}
      <WelcomeModal />
      <InAppNotificationModal />
    </ProvideJanus>
  );
}

function AuthRouter({ dispatch, cache }: any) {
  dispatch({
    type: "app/versionCache",
    payload: { ...cache },
  });
  dispatch({
    type: "user/autoLogin",
    payload: null,
  });
  return (
    <NavigationContainer linking={LinkingConfiguration} ref={navigationRef}>
      <>
        <InAppNotificationModal />
        <AuthWrapperStack.Navigator initialRouteName={"Landing"}>
          <AuthWrapperStack.Screen
            name={"Landing"}
            component={OnBoardingStack}
            options={{
              headerShown: false,
              gestureEnabled: false,
              detachPreviousScreen: true,
            }}
          />
          <AuthWrapperStack.Screen
            name={"Main"}
            component={MainApp}
            options={{
              headerShown: false,
              gestureEnabled: false,
              detachPreviousScreen: true,
            }}
          />
        </AuthWrapperStack.Navigator>
      </>
    </NavigationContainer>
  );
}

const mapStateToProps = ({ user: { userId }, app: { bottomsTabs } }: any) => ({
  userId,
  bottomsTabs,
});
const MainApp = connect(mapStateToProps)(BottomTabNavigator);

export default connect(mapStateToProps)(AuthRouter);
