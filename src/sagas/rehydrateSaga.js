import { REHYDRATE } from "redux-persist/lib/constants";
import { takeEvery, put, all, select } from "redux-saga/effects";

import { getUserToken } from "./selectors";
import api from "../services/api/Api";

function* handleRehydrate() {
  const token = yield select(getUserToken);
  api.setToken(token);

  yield put(api.getSubjects.createAction());
  yield put(api.getClasses.createAction());
  yield put(api.getUserClasses.createAction());
  yield put(api.getUserPrivateClasses.createAction());
  yield put(api.getEducationLevels.createAction());
  yield put(api.getSubjectCategories.createAction());
  yield put(api.getPrivateClasses.createAction());
  yield put(api.getUserTutorOffers.createAction());
}

function* watchRehydrate() {
  yield takeEvery(REHYDRATE, handleRehydrate);
}

export default function* rehydrateSaga() {
  yield all([watchRehydrate()]);
}
