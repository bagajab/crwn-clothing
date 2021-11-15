import { collection, getDocs } from "firebase/firestore";
import { convertCollectionsSnapshotToMap } from "../../firebase/add-collection-and-document";
import { db } from "../../firebase/firebase.utils";
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

export const fetchCollectionsRequestAsync = () => {
  return (dispatch) => {
    const collectionsRef = collection(db, "collections");
    dispatch(fetchCollectionsRequest());
    getDocs(collectionsRef)
      .then((snapshot) => {
        const collectionMaped = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionMaped));
      })
      .catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
};
