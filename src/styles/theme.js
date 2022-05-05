import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";

import merge from "deepmerge";

const combinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
export const theme = {
  ...combinedDefaultTheme,
  roundness: 5,
};
