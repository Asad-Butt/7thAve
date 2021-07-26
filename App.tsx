/**
 * Property of Seventh Ave
 * AUTHORIZED USE ONLY
 *
 * REPRODUCTION OR DISTRIBUTION OF THIS SOFTWARE IS PUNUSHABLE BY LAW
 */
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import Router from "./src/routers/router";
import * as Linking from "expo-linking";
// Hooks
import useCachedResources from "./src/hooks/useCachedResources";
// Expo
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
// import * as Permissions from "expo-permissions";
// DVA-Redux
import { create } from "dva-core";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
// Models
import AppModel from "./src/store/index";
import UserModel from "./src/store/models/user";
import AudioModel from "./src/store/models/audio";
import InboxModel from "./src/store/models/inbox";
// Alternative ave modes
import Maintenance from "./src/views/screens/Maintenance";
import Update from "./src/views/screens/Update";
/**
 * AWS AMPLIFY CONFIG
 *
 * DO NOT MODIFY OR REMOVE UNDER ANY CIRCUMSTANCES
 */
// import Amplify from "aws-amplify";
// import awsconfig from "./src/aws-exports";
// import PushNotification from "@aws-amplify/pushnotification";
// import { PushNotificationIOS } from "@react-native-community/push-notification-ios";

// Amplify.configure({
//   ...awsconfig,
//   PushNotification: {
//     requestIOSPermissions: true,
//   },
// });

/**
 * Redux Models
 */
const options = {
  initialState: {},
  // All of our models go in the array below
  models: [AppModel, UserModel, AudioModel, InboxModel],
  // onAction: [createLogger()],
  onError(e: any) {
    console.log("====================================16");
    console.error(e);
    console.log("====================================18");
  },
};

/**
 * DVA (ie REDUX) setup below
 */
const app = create(options);
// register models
options.models.forEach((model) => app.model(model));

app.start();
const store: any = app._store;
app.getStore = () => store;
// The components passed in from the outside are put as parameters inside the component Provider

export default function App() {
  // Stops the screen from sleeping inside the application
  useKeepAwake();
  // Stops the depreciated warning in react native on android
  LogBox.ignoreLogs(["Setting a timer"]);
  // Loads resources needed before rendering any view, such as fonts, images
  const { isLoadingComplete, firstDownload, showPatchNotes } =
    useCachedResources();

  function handleDeepLink(event: any) {
    let data = Linking.parse(event.url);
    console.warn(data);
  }

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);

    return () => Linking.removeEventListener("url", () => null);
  }, []);

  let maintenance = false;
  let update = false;

  if (isLoadingComplete && maintenance) {
    return (
      <Provider store={store}>
        <Maintenance />
      </Provider>
    );
  } else if (isLoadingComplete && update) {
    return (
      <Provider store={store}>
        <Update />
      </Provider>
    );
  } else if (isLoadingComplete) {
    return (
      <Provider store={store}>
        <StatusBar style="dark" />
        <Router cache={{ firstDownload, showPatchNotes }} />
      </Provider>
    );
  } else {
    return null;
  }
}

export { store };
