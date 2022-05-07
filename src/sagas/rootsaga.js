import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import rehydrateSaga from "./rehydrateSaga";

export default function* rootSaga() {
  yield all([userSaga(), rehydrateSaga()]);
}
