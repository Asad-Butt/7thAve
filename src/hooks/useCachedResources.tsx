import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { LogBox } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { retrievePatchCache } from "../utils/storage";
import CONFIG from "../../configuration";

// Ignore log notification by message
LogBox.ignoreLogs(["Error: Native splash screen is already hidden"]);

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const [firstDownload, setFirstDownload] = React.useState(false);
  const [showPatchNotes, setShowPatchNotes] = React.useState(false);
  /**
   * Load any resources or data that we need prior to rendering the app
   */
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        /**
         * You can load any font you'd like from a .ttf file placed in assests/fonts/YoUrFoNtHeRe
         */
        await Font.loadAsync({
          ...Ionicons.font,
          Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-Bold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Italic": require("../../assets/fonts/Poppins-Italic.ttf"),
        });
        /**
         * Checks cache for versioning and first download check
         */
        const cache = await retrievePatchCache();
        if (!cache) {
          setFirstDownload(true);
        } else if (cache.version === "staging") {
          console.warn("Cache", cache);
          setShowPatchNotes(true);
        } else if (cache.version < parseFloat(CONFIG.version)) {
          console.warn("Cache", cache);
          setShowPatchNotes(true);
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();

    return function onDestroy() {
      console.log("App Terminated");
    };
  }, []);

  return { isLoadingComplete, showPatchNotes, firstDownload };
}
