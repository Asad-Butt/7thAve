/**
 *
 * 7th Ave - Blank Screen
 *
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Path, Ellipse, Circle, Rect } from "react-native-svg";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
import { navigate } from "../../../../../routers/RootNavigation";
import normalize from "../../../../../utils/normalize";
/**
 * 7th Ave : UI Library
 */
import {
  Heading,
  Body,
  BodyBold,
} from "../../../../ui_library/components/typography";

function ActivityTabIcon({ focused }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  return (
    <TouchableWithoutFeedback>
      <View style={styles.row}>
        {focused ? (
          <Svg width={30} height={30} viewBox="0 0 20 20" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.702 3.949a3.354 3.354 0 003.964 3.292v6.644c0 2.795-1.648 4.449-4.447 4.449H6.122c-2.807 0-4.455-1.654-4.455-4.449V7.797c0-2.795 1.648-4.463 4.455-4.463h6.639c-.04.202-.06.408-.059.615zm-1.744 8.466L13.34 9.34v-.014a.629.629 0 00-.118-.871.609.609 0 00-.864.124l-2.008 2.583-2.286-1.8a.616.616 0 00-.872.117l-2.463 3.176a.6.6 0 00-.131.38.615.615 0 001.135.359l2.06-2.663 2.286 1.792a.616.616 0 00.88-.11z"
              fill="#ECA413"
            />
            <Ellipse
              opacity={0.4}
              cx={16.2498}
              cy={3.75033}
              rx={2.08333}
              ry={2.08333}
              fill="#ECA413"
            />
          </Svg>
        ) : (
          <Svg width={30} height={30} viewBox="0 0 20 20" fill="none">
            <Path
              d="M6.037 12.318l2.495-3.242 2.845 2.235 2.44-3.15"
              stroke="#9CAAB4"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Ellipse
              cx={16.6629}
              cy={3.50027}
              rx={1.60183}
              ry={1.60183}
              stroke="#9CAAB4"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12.437 2.6H6.381c-2.51 0-4.066 1.778-4.066 4.287v6.736c0 2.51 1.525 4.279 4.066 4.279h7.17c2.51 0 4.065-1.77 4.065-4.28V7.758"
              stroke="#9CAAB4"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
        <BodyBold
          spaceY={15}
          color={focused ? colors.primary : colors.typeface.secondary}
        >
          Activity
        </BodyBold>
      </View>
    </TouchableWithoutFeedback>
  );
}
function ConversationTabIcon({ focused }: any) {
  // Theme & Color Pallets
  const { themes, darkModeEnabled } = useSelector((state: any) => state.app);
  const colors = darkModeEnabled ? themes.dark : themes.light;
  // Dispatch
  return (
    <TouchableWithoutFeedback>
      <View style={styles.row}>
        {focused ? (
          <Svg width={30} height={30} viewBox="0 0 20 20" fill="none">
            <Path
              opacity={0.4}
              d="M18.333 13.284a4.206 4.206 0 01-4.191 4.216H5.875a4.206 4.206 0 01-4.208-4.2v-.008s.004-3.688.011-5.543c.001-.349.401-.544.674-.327 1.98 1.57 5.52 4.435 5.564 4.473a3.39 3.39 0 002.109.741c.766 0 1.516-.267 2.108-.75.044-.03 3.506-2.808 5.516-4.405a.416.416 0 01.676.325c.008 1.841.008 5.478.008 5.478z"
              fill={colors.primary}
            />
            <Path
              d="M17.897 4.728A4.196 4.196 0 0014.192 2.5H5.875A4.196 4.196 0 002.17 4.728a.72.72 0 00.184.899l6.188 4.949c.433.35.958.524 1.483.524h.017c.525 0 1.05-.174 1.483-.524l6.188-4.95a.72.72 0 00.184-.898z"
              fill={colors.primary}
            />
          </Svg>
        ) : (
          <Svg width={30} height={30} viewBox="0 0 20 20" fill="none">
            <Path
              d="M14.39 7.552l-3.555 2.862a1.853 1.853 0 01-2.288 0L4.962 7.552"
              stroke="#9CAAB4"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              clipRule="evenodd"
              d="M5.74 2.917h7.856a4.13 4.13 0 012.984 1.325 4.18 4.18 0 011.105 3.087v5.44a4.181 4.181 0 01-1.105 3.086 4.13 4.13 0 01-2.984 1.325H5.74c-2.434 0-4.074-1.98-4.074-4.411v-5.44c0-2.432 1.64-4.412 4.074-4.412z"
              stroke="#9CAAB4"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
        <BodyBold
          spaceY={15}
          color={focused ? colors.primary : colors.typeface.secondary}
        >
          Messages
        </BodyBold>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.4,
    alignItems: "center",
    // marginLeft: SCREEN_WIDTH * -0.16,
    marginLeft: SCREEN_WIDTH * -0.1,
  },
});

export const ActivityIcon = ActivityTabIcon;
export const ConversationIcon = ConversationTabIcon;

export default { ActivityIcon };
