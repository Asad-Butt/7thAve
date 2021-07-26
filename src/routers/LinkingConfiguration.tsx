import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Landing: {
        screens: {
          Login: "login",
          Register: "register",
        },
      },
      Main: {
        screens: {},
      },
      NotFound: "*",
    },
  },
};
