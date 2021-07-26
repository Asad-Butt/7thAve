import * as React from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { retrieveCache } from "../utils/storage";
import { useDispatch, useSelector } from "react-redux";

export default function useFaceID() {
  const dispatch = useDispatch();

  const [canFaceId, setCanFaceId] = React.useState(false);
  //   const [accessGranted, setAccessGranted] = React.useState(false);
  const [hardwareError, setHardwareError] = React.useState("");

  const checkForHardwareAndKeys = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      console.log("has hardware", hasHardware);
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const checkCache = await retrieveCache();
      if (checkCache != null) {
        //   if (isEnrolled && checkCache != null) {
        setCanFaceId(true);
        // setCanFaceId(isEnrolled);
      }
    } catch (error) {
      setHardwareError(error);
    }
  };

  const useFaceIDLogin = async () => {
    // const auth = await LocalAuthentication.authenticateAsync({
    //   promptMessage: "Login with face ID",
    // });
    // console.log(auth);
    dispatch({
      type: "user/autoLogin",
      payload: null,
    });
  };

  /**
   * Load any resources or data that we need prior to rendering the app
   */
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await checkForHardwareAndKeys();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
      }
    }

    loadResourcesAndDataAsync();

    return function onDestroy() {
      console.log("Face ID Terminated");
    };
  }, []);

  return { canFaceId, hardwareError, useFaceIDLogin };
}
