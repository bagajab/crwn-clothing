import {
  FETCH_COLLECTIONS_FAILURE,
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
} from "./shop.types";

export const fetchCollectionsRequest = () => ({
  type: FETCH_COLLECTIONS_REQUEST,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});