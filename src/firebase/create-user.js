import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase.utils";

const createUser = async (userAuth, additionalInfo = {}) => {
  const { uid } = userAuth;

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  // // TEST HERE
  // const usersRef = collection(db, "users");
  // const usersSnap = await getDocs(usersRef);
  // console.log({ usersSnap });
  // usersSnap.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });

  if (userSnap.exists()) return userRef;

  try {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    const newUserData = { displayName, email, createdAt, ...additionalInfo };

    await setDoc(userRef, newUserData);
  } catch (error) {
    console.log("Error while creating user: ", error);
  }

  return userRef;
};

export default createUser;
