import { combineReducers } from "@reduxjs/toolkit";
import navigationReducer from "./navigation";
import apiReducer from "./api";
import userReducer from "./user";

const rootReducer = combineReducers({
  api: apiReducer,
  user: userReducer,
  navigation: navigationReducer,
});

export default rootReducer;
