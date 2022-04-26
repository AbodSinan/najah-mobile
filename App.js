import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import merge from "deepmerge";

import configureStore from "./src/store";
import MainScreen from "./src/components/MainScreen";

const { store, persistor } = configureStore();
const combinedDefaultTheme = merge(NavigationDefaultTheme, PaperDefaultTheme);
const theme = {
  ...combinedDefaultTheme,
  roundness: 5,
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <MainScreen />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
