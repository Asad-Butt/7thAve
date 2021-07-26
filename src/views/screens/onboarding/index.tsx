/**
 * Onboarding Stack
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * Stack and Screens
 */
// Home
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import TwoFASreen from "./TwoFASreen";
import ProfileSettings from "./ProfileSettings";
import InterestsScreen from "./InterestsScreen";
// Google place
import GooglePlace from "../common_google_place";
const OnBoardingStackNavigator = createStackNavigator();

export default function OnBoarding() {
  return (
    <OnBoardingStackNavigator.Navigator initialRouteName={"Login"}>
      <OnBoardingStackNavigator.Screen
        name={"Landing"}
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <OnBoardingStackNavigator.Screen
        name={"Login"}
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <OnBoardingStackNavigator.Screen
        name={"Register"}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <OnBoardingStackNavigator.Screen
        name={"TwoFA"}
        component={TwoFASreen}
        options={{ headerShown: false }}
      />
      <OnBoardingStackNavigator.Screen
        name={"Profile-Settings"}
        component={ProfileSettings}
        options={{ headerShown: false }}
      />
      <OnBoardingStackNavigator.Screen
        name={"Interests"}
        component={InterestsScreen}
        options={{ headerShown: false }}
      />
       <OnBoardingStackNavigator.Screen
        name={"GooglePlace"}
        component={GooglePlace}
        options={{ headerShown: false }}
      />
    </OnBoardingStackNavigator.Navigator>
  );
}
