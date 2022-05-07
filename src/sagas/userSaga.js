import { takeEvery, all, select, put } from "redux-saga/effects";
import api from "../services/api/Api";
import * as selectors from "./selectors";
import { apiCallSuccessChannel } from "../utils/apiUtils";

function* handleLogin() {
  const token = yield select(selectors.getUserToken);
  api.setToken(token);

  yield put(api.getSubjects.createAction());
  yield put(api.getClasses.createAction());
  yield put(api.getUserClasses.createAction());
  yield put(api.getEducationLevels.createAction());
  yield put(api.getSubjectCategories.createAction());
  yield put(api.getPrivateClasses.createAction());
}

function* watchLogin() {
  yield takeEvery(apiCallSuccessChannel(`login`), handleLogin);
}

export default function* userSaga() {
  yield all([watchLogin()]);
}
