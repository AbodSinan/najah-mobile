import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./api";
import userReducer from "./user";

const rootReducer = combineReducers({
  api: apiReducer,
  user: userReducer,
});

export default rootReducer;
