// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChIz2L8dR8j85LjmpKt62adFscadTTilk",
  authDomain: "register-practice-4fb22.firebaseapp.com",
  projectId: "register-practice-4fb22",
  storageBucket: "register-practice-4fb22.firebasestorage.app",
  messagingSenderId: "578791034788",
  appId: "1:578791034788:web:4d1d0828a14e438225bb31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);