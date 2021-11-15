import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "./firebase.utils";

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const batch = writeBatch(db);
  objectToAdd.forEach((obj) => {
    const newDocRef = doc(collection(db, collectionKey));
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collection) => {
  const transFormedCollections = collection.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transFormedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
