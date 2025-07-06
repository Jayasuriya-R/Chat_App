// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1UPRbEbYTSREtWuPhwT0I3iq4Zo7GmQI",
  authDomain: "chat-app-b0961.firebaseapp.com",
  projectId: "chat-app-b0961",
  storageBucket: "chat-app-b0961.firebasestorage.app",
  messagingSenderId: "814661031413",
  appId: "1:814661031413:web:424f879e923d2d9574bcbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();