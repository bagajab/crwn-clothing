import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase.utils";

export async function getData() {
  // 1. ADD THE DATA
  // try {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     first: "Alan",
  //     middle: "Mathison",
  //     last: "Turing",
  //     born: 1912
  //   });

  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }

  // // 2. Read data
  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });

  // 3. Find /Create the user and attach data
  // const firstUser = doc(db, "users/mctLSv9CcJg8xkFSwQ9m"); //Find or create user reference
  // const data = {
  //   name: "Bagaa",
  //   born: 1991,
  // };
  // // Delete the user
  // // deleteDoc(firstUser)

  // setDoc(firstUser, data);

  // 4. READ NESTED DOCUMENT
  const cartItem = doc(db, "users/mxFbLxExMp0G5kX5wmdH");

  const mySnapShot = await getDoc(cartItem);
  console.log(mySnapShot.data());
  
   const querySnapshot = await getDocs(collection(db, "users/mxFbLxExMp0G5kX5wmdH/carts"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}