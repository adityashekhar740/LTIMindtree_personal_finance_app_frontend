// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSmymvnkfHUkgOAoSsAiED-kifGebd020",
  authDomain: "ltifinanceapp.firebaseapp.com",
  projectId: "ltifinanceapp",
  storageBucket: "ltifinanceapp.firebasestorage.app",
  messagingSenderId: "159511609352",
  appId: "1:159511609352:web:046b8fb4909cbd671e91bd",
  measurementId: "G-K43NT0L01W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();