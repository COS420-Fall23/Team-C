// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKpuL6t9ihiA-6gsLwCZAN-TvChkJSAfo",
  authDomain: "mentormark-ace5a.firebaseapp.com",
  projectId: "mentormark-ace5a",
  storageBucket: "mentormark-ace5a.appspot.com",
  messagingSenderId: "791836430319",
  appId: "1:791836430319:web:fe5c9b8f57a79a4968f01a",
  measurementId: "G-1KFNCC5NBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
export { storage };