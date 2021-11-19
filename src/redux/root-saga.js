import { all, call } from "redux-saga/effects";
import { fetchCollectionsRequest } from "./shop/shop.sagas";

export function* rootSaga() {
  yield all([call(fetchCollectionsRequest)]);
}
