import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isNative = isIOS || isAndroid;
export const devicePlatform = isIOS ? "ios" : isAndroid ? "android" : "web";
export const isWeb = !isNative;
export const isMobileWebMediaQuery = "only screen and (max-width: 1300px)";

export const isMobileWeb =
  isWeb &&
  typeof window !== "undefined" &&
  window.matchMedia(isMobileWebMediaQuery)?.matches;

export const isIPhoneWeb = isWeb && /iPhone/.test(navigator.userAgent);
