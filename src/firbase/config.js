// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF4rfQ5gOhwqwhx-vgkWkcpHeypworFvE",
  authDomain: "olx-clone-256d7.firebaseapp.com",
  projectId: "olx-clone-256d7",
  storageBucket: "olx-clone-256d7.appspot.com",
  messagingSenderId: "898114789715",
  appId: "1:898114789715:web:6158cb3cb817086ea801a6"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const firestore=getFirestore(app)
const storage=getStorage(app)
export {app as Firebase,auth,firestore,storage}


