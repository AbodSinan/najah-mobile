import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./src/store";
import MainScreen from "./src/components/MainScreen";

const { store, persistor } = configureStore();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <MainScreen />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
