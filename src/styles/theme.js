import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { configureFonts } from "react-native-paper";
import merge from "deepmerge";

const combinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);

const fontConfig = {
  fontFamily: "Amiri, sans-serif",
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
