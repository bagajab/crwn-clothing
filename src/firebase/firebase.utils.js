// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7SdqHkvCQHW9IiP-zdNioZspwIX-JukQ",
  authDomain: "crwn-db-83284.firebaseapp.com",
  projectId: "crwn-db-83284",
  storageBucket: "crwn-db-83284.appspot.com",
  messagingSenderId: "756063192788",
  appId: "1:756063192788:web:c9b1e8bf3df42911bc9d41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase DB
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth();

export const googleProvider = new GoogleAuthProvider();

