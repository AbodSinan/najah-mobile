import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  configureFonts,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const combinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const fontConfig = {
  fontFamily: "Amiri, Amiri-Bold",
  textAlign: "right",
  writingDirection: "rtl",
};

export const theme = {
  ...combinedDefaultTheme,
  colors: {
    ...combinedDefaultTheme.colors,
    contrast: "#ffffff",
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 5,
};
