import { takeLatest, all, call, put } from "@redux-saga/core/effects";
import { SIGN_OUT_SUCCESS } from "../user/user.types";
import { clearCart } from "./cart.actions";

function* clearCartOnSignout() {
  yield put(clearCart());
}

function* onSignOutSuccess() {
  yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignout);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
