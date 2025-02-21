// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDtA3RtM7NHNkgwH6m0QHIY9ov6E-bVOXw",
    authDomain: "fees-f6969.firebaseapp.com",
    projectId: "fees-f6969",
    storageBucket: "fees-f6969.firebasestorage.app",
    messagingSenderId: "843067570894",
    appId: "1:843067570894:web:dfbff7451735efa597ee9f",
    measurementId: "G-ZD17QY7F2K"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
