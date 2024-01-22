// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnzq4_ihw7DS-StSQxi2LD4iG9_i9ds6M",
  authDomain: "nex-drop.firebaseapp.com",
  projectId: "nex-drop",
  storageBucket: "nex-drop.appspot.com",
  messagingSenderId: "331305427890",
  appId: "1:331305427890:web:8eb871be711328c4a2baab",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
