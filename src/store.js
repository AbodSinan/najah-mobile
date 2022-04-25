import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
} from "redux-persist";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootsaga";
import { apiMiddleware } from "./middleware/api";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
import { wrapReducer } from "./middleware/wrapReducer";

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["api", "user"],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const apiReducer = wrapReducer(persistedReducer);

  const store = configureStore({
    reducer: apiReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { ignoreActions: [PERSIST, REHYDRATE] },
      }).concat([sagaMiddleware, apiMiddleware]),
  });

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
