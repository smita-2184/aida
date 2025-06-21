import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXbWf9878ll6_xBYcondGOfp4vaAlXFLU",
  authDomain: "aida-project-2c518.firebaseapp.com",
  projectId: "aida-project-2c518",
  storageBucket: "aida-project-2c518.firebasestorage.app",
  messagingSenderId: "598379639421",
  appId: "1:598379639421:web:83430abcf48d102c8db714",
  measurementId: "G-4Q1ZC4D8FS"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 