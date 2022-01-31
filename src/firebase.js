// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwZloG1UmYHbVqsZ2Tmb9DQouxlYOgViA",
  authDomain: "hyejin-voca.firebaseapp.com",
  projectId: "hyejin-voca",
  storageBucket: "hyejin-voca.appspot.com",
  messagingSenderId: "804516039527",
  appId: "1:804516039527:web:ac54ad13844a5331323dc2",
  measurementId: "G-0R2TRS6J59"
};
initializeApp(firebaseConfig);

export const db = getFirestore();