// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API,
  authDomain: "a-918b4.firebaseapp.com",
  projectId: "a-918b4",
  storageBucket: "a-918b4.appspot.com",
  messagingSenderId: "292674814699",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth();


