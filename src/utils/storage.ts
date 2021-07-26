import AsyncStorage from "@react-native-async-storage/async-storage";

export const removeTokenCache = async () => {
  try {
    await AsyncStorage.removeItem("@Seventh-Cache");
  } catch (e) {
    console.error(e);
  }
};

export const storeTokenCache = async (username: string, token: string) => {
  try {
    const reformattedData = JSON.stringify({ username, token });
    await AsyncStorage.setItem("@Seventh-Cache", reformattedData);
  } catch (e) {
    console.error(e);
  }
};

export const retrieveTokenCache = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@Seventh-Cache");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error(e);
    return { error: e };
  }
};

export const removePatchCache = async () => {
  try {
    await AsyncStorage.removeItem("@Seventh-Patch-Cache");
  } catch (e) {
    console.error(e);
  }
};

export const storePatchCache = async (version: number) => {
  try {
    const reformattedData = JSON.stringify({ version });
    await AsyncStorage.setItem("@Seventh-Patch-Cache", reformattedData);
  } catch (e) {
    console.error(e);
  }
};

export const retrievePatchCache = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@Seventh-Patch-Cache");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.error(e);
    return { error: e };
  }
};
