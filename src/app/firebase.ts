import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables (secure keys in production)
const firebaseConfig = {
  apiKey: "AIzaSyD5cOegpEkBmPTwD8T86Qr6innsLJ_kTRw",
  authDomain: "sinkedin-80989.firebaseapp.com",
  projectId: "sinkedin-80989",
  storageBucket: "sinkedin-80989.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "687981019770",
  appId: "1:687981019770:web:b5238080ecadcb05aef1c3",
  measurementId: "G-XXXXXXX", // Optional, can be removed if not using Google Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);         // Authentication
const db = getFirestore(app);      // Firestore database
const storage = getStorage(app);   // Firebase Storage

// Export services for use in your app
export { app, auth, db, storage };
