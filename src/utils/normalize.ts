import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 400;

/**
 * Use on the majority of non-dimension based styling, this will normalize the styles accross platforms and screens styles
 * Such as fontSize, width, height, margin, padding
 *
 * Known unworking attributes
 * - borderWidth
 *
 *
 * @param size number
 * @returns number
 */
export default function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
