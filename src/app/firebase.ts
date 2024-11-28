import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5cOegpEkBmPTwD8T86Qr6innsLJ_kTRw",
  authDomain: "sinkedin-80989.firebaseapp.com",
  projectId: "sinkedin-80989",
  storageBucket: "sinkedin-80989.appspot.com",
  messagingSenderId: "687981019770",
  appId: "1:687981019770:web:b5238080ecadcb05aef1c3",
  measurementId: "G-XXXXXXX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
