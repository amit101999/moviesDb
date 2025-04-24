// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDImFT8lm1ZmdF-zDoUvbLtpQ2HC2lDtPY",
    authDomain: "moviedb-f8912.firebaseapp.com",
    projectId: "moviedb-f8912",
    storageBucket: "moviedb-f8912.firebasestorage.app",
    messagingSenderId: "830922644829",
    appId: "1:830922644829:web:d208319584d102fe63dcb4",
    measurementId: "G-L292NF5JEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();