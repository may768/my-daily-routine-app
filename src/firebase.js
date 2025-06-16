// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBak48CwKIa858gADdEPR4upEMVtmxfoo0",
  authDomain: "my-budget-app-17182.firebaseapp.com",
  projectId: "my-budget-app-17182",
  storageBucket: "my-budget-app-17182.appspot.com",
  messagingSenderId: "1093182257343",
  appId: "1:1093182257343:web:64dd2ec5e04363c987ae0a",
  measurementId: "G-97795F0LZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth and Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
