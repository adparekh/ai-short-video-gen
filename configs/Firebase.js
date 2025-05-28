// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "apps-e98f7.firebaseapp.com",
  projectId: "apps-e98f7",
  storageBucket: "apps-e98f7.firebasestorage.app",
  messagingSenderId: "78502817277",
  appId: "1:78502817277:web:bc24e61f06d2d1ca637d94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
