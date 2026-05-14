// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgiHPa1NnnxBL_a48wSxUt3EHJL6zTep8",
  authDomain: "next-e-commerce-8ea10.firebaseapp.com",
  projectId: "next-e-commerce-8ea10",
  storageBucket: "next-e-commerce-8ea10.firebasestorage.app",
  messagingSenderId: "545510654955",
  appId: "1:545510654955:web:8a277275ec1bb5514e0fae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };