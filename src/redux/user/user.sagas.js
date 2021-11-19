import { takeLatest, all, call, put } from "@redux-saga/core/effects";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";
import createUser from "../../firebase/create-user";
import {
  auth,
  getCurrentUser,
  googleProvider,
} from "../../firebase/firebase.utils";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
} from "./user.action";
import {
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN_REQUEST,
  GOOGLE_SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "./user.types";

export function* onGoogleSignInRequest() {
  yield takeLatest(GOOGLE_SIGN_IN_REQUEST, signInWithGoogle);
}

export function* onEmailSignInRequest() {
  yield takeLatest(EMAIL_SIGN_IN_REQUEST, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutRequest() {
  yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

export function* onSignUpRequest() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* getSnapshotFromUserAuth(user, additionalData) {
  try {
    const userRef = yield call(createUser, user, additionalData);
    const userSnapShot = yield getDoc(userRef);
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) return;
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    put(call(signInFailure(error.message)));
  }
}

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInRequest),
    call(onEmailSignInRequest),
    call(onCheckUserSession),
    call(onSignOutRequest),
    call(onSignUpRequest),
    call(onSignUpSuccess),
  ]);
}
