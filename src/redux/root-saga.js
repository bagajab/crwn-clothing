import { all, call } from "redux-saga/effects";
import { fetchCollectionsRequest } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";

export function* rootSaga() {
  yield all([call(fetchCollectionsRequest), call(userSagas)]);
}
