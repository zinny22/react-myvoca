// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMw-FRRAIYsM0-f1yY3XmAjj7pb7qfvmc",
  authDomain: "hyejin-myvoca.firebaseapp.com",
  projectId: "hyejin-myvoca",
  storageBucket: "hyejin-myvoca.appspot.com",
  messagingSenderId: "630295458421",
  appId: "1:630295458421:web:fc83858a9fb45f9c58be3c",
  measurementId: "G-65DRY49LTZ"
};
initializeApp(firebaseConfig);

export const db = getFirestore();