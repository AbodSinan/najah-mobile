import React, { useState, useEffect } from "react";
import { registerRootComponent } from "expo";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-gesture-handler";

import configureStore from "./src/store";
import { theme } from "./src/styles/theme";
import MainScreen from "./src/components/MainScreen";

const { store, persistor } = configureStore();

const PERSISTENCE_KEY = "NAVIGATION_STATE";

export function App() {
  const [initialState, setInitialState] = useState();

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

registerRootComponent(App);
