import * as React from "react";
import { Text, View, SafeAreaView, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// Tabs
import TwitterTab from "../views/ui_library/components/tabs/TwitterTab";
import Icons from "../views/ui_library/components/icons";
import normalize from "../utils/normalize";
import TakeawayTab from "../views/ui_library/components/tabs/TakeawayTab";
import OtherUserTab from "../views/ui_library/components/tabs/OtherUserTab";

const Tab = createMaterialTopTabNavigator();

function MyTabs({}) {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      initialRouteName="User"
      tabBarOptions={{
        activeTintColor: "#000",
        showIcon: true,
        showLabel: false,
        indicatorStyle: {
          backgroundColor: "#057176",
          paddingHorizontal: normalize(-10),
          borderRadius: 5,
        },
        indicatorContainerStyle: {
          width: normalize(100),
          marginHorizontal: normalize(50),
        },
      }}
    >
      <Tab.Screen
        name="User"
        component={OtherUserTab}
        options={{
          tabBarIcon: ({ focused }) => <Icons.TabUser focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Instagram"
        component={TakeawayTab}
        options={{
          tabBarIcon: ({ focused }) => <Icons.TabInstagram focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Twitter"
        component={TwitterTab}
        options={{
          tabBarIcon: ({ focused }) => <Icons.TabTwitter focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}

// function UserTabs({ themes, darkModeEnabled, route }: any) {
//   // Theme & Color Pallets
//   const colors = darkModeEnabled ? themes.dark : themes.light;

//   return <MyTabs />;
// }

// const mapStateToProps = ({ app: { themes, darkModeEnabled } }: any) => ({
//   themes,
//   darkModeEnabled,
// });
// export default connect(mapStateToProps)(UserTabs);
