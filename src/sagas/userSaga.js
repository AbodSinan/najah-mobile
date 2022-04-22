import { takeEvery, all, select, put } from "redux-saga/effects";
import api from "../services/api/Api";
import * as selectors from "./selectors";
import { apiCallSuccessChannel } from "../utils/commonUtils";

function* handleLogin() {
  const token = yield select(selectors.getUserToken);
  api.setToken(token);
  yield put(api.getSubjects.createAction());
}

function* watchLogin() {
  yield takeEvery(apiCallSuccessChannel(`login`), handleLogin);
}

export default function* userSaga() {
  yield all([watchLogin()]);
}
