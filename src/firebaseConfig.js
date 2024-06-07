// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAynQjB8zEfjdjzlWz-JrhksIIQzibfzvo",
  authDomain: "seiftabo.firebaseapp.com",
  projectId: "seiftabo",
  storageBucket: "seiftabo.appspot.com",
  messagingSenderId: "272895704727",
  appId: "1:272895704727:web:5723ba08c80e956479b3d2",
  measurementId: "G-BZFRE9LQFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and Firestore
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
