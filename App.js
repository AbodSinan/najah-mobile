import React, { useState, useEffect } from "react";
import { Linking, Platform } from "react-native";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./src/store";
import { theme } from "./src/styles/theme";
import MainScreen from "./src/components/MainScreen";
import Chat from "./src/components/Chat";

const { store, persistor } = configureStore();

const PERSISTENCE_KEY = "NAVIGATION_STATE";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== "web" && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <Chat />
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer
            theme={theme}
            initialState={initialState}
            onStateChange={(state) =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
          >
            <MainScreen />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
