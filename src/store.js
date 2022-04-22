import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/rootsaga";
import { apiMiddleware } from './middleware/api';
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/index";
import { wrapReducer } from "./middleware/wrapReducer";


export default function store () {
    const sagaMiddleware = createSagaMiddleware();

    const persistConfig = {
        key: "root",
        storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducer);
    const apiReducer = wrapReducer(persistedReducer)

    const store = configureStore({
        reducer: apiReducer,
        middleware: (getDefaultMiddleware) => [
            ...getDefaultMiddleware(),
            sagaMiddleware,
            apiMiddleware,
        ]
    })

    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);

    return {store, persistor}
}