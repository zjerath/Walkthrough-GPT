// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkkTK1Xz5l_z3sjqZMY-eFx_Ao98-Eg2I",
  authDomain: "walkthroughgpt.firebaseapp.com",
  projectId: "walkthroughgpt",
  storageBucket: "walkthroughgpt.firebasestorage.app",
  messagingSenderId: "347588345488",
  appId: "1:347588345488:web:5fb0786db273027174e215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };