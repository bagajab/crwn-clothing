import { takeLatest, call, put } from "@redux-saga/core/effects";
import { collection, getDocs } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../../firebase/add-collection-and-document";
import { db } from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";
import { FETCH_COLLECTIONS_REQUEST } from "./shop.types";

export function* fetchCollectionsRequestAsync() {
  try {
    const collectionsRef = collection(db, "collections");
    const snapshot = yield getDocs(collectionsRef);
    const collectionMaped = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionMaped));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsRequest() {
  yield takeLatest(FETCH_COLLECTIONS_REQUEST, fetchCollectionsRequestAsync);
}
