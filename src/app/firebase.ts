import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Optional if using Firestore
import { getStorage } from "firebase/storage";      // Optional if using Firebase Storage

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyD5cOegpEkBmPTwD8T86Qr6innsLJ_kTRw",
  authDomain: "sinkedin-80989.firebaseapp.com",
  projectId: "sinkedin-80989",
  storageBucket: "sinkedin-80989.firebasestorage.app",
  messagingSenderId: "687981019770",
  appId: "1:687981019770:web:b5238080ecadcb05aef1c3",
  measurementId: "G-XXXXXXX", // Optional, if using Google Analytics
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
const auth = getAuth(app);
const firestore = getFirestore(app);   
const storage = getStorage(app);      


export { auth, firestore, storage };

