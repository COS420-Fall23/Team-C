// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, updateProfile, updateEmail, updatePassword, deleteUser, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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

export async function getUserProfilePictureFromFirestore(userId) {
  try {
    const userDoc = doc(collection(db, 'users'), userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData.profilePicture; // Assuming profilePicture is a field in the user document
    } else {
      // Handle if user document doesn't exist
      console.log('User document does not exist');
      return ''; // Return an empty string or default URL if needed
    }
  } catch (error) {
    // Handle error if fetching profile picture fails
    console.error('Error fetching user profile picture:', error);
    return ''; // Return an empty string or default URL if needed
  }
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
setPersistence(auth, browserSessionPersistence);
export { updateProfile, updateEmail, updatePassword, deleteUser, doc, getDoc, updateDoc, deleteDoc, ref, uploadBytesResumable, getDownloadURL, collection};

