import {
  EMAIL_SIGN_IN_FAILURE,
  EMAIL_SIGN_IN_REQUEST,
  EMAIL_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILURE,
  GOOGLE_SIGN_IN_REQUEST,
  GOOGLE_SIGN_IN_SUCCESS,
  SET_CURRENT_USER,
} from "./user.types";

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const googleSignInRequest = () => ({
  type: GOOGLE_SIGN_IN_REQUEST,
});

export const googleSignInSuccess = (user) => ({
  type: GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInFailure = (error) => ({
  type: GOOGLE_SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInRequest = () => ({
  type: EMAIL_SIGN_IN_REQUEST,
});

export const emailSignInSuccess = (user) => ({
  type: EMAIL_SIGN_IN_SUCCESS,
  payload: user,
});

export const emailSignInFailure = (error) => ({
  type: EMAIL_SIGN_IN_FAILURE,
  payload: error,
});

export default setCurrentUser;
