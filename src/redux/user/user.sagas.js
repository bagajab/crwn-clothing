import { takeLatest, all, call, put } from "@redux-saga/core/effects";
import { signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import createUser from "../../firebase/create-user";
import { auth, googleProvider } from "../../firebase/firebase.utils";
import { googleSignInFailure, googleSignInSuccess } from "./user.action";
import { GOOGLE_SIGN_IN_REQUEST } from "./user.types";

export function* onGoogleSignInRequest() {
  yield takeLatest(GOOGLE_SIGN_IN_REQUEST, signInWithRequest);
}

export function* signInWithRequest() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    const userRef = yield call(createUser, user);
    const userSnapShot = yield getDoc(userRef);
    yield put(
      googleSignInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
}

export function* userSagas() {
  yield all([call(onGoogleSignInRequest)]);
}
