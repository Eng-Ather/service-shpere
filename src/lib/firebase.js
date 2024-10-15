// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCmGTBipAOPJbBhfvDjUU52SlWNGrGKPOk",
  authDomain: "service-for-sell.firebaseapp.com",
  projectId: "service-for-sell",
  storageBucket: "service-for-sell.appspot.com",
  messagingSenderId: "394236930876",
  appId: "1:394236930876:web:f9ad00d25de6da4dea0c39",
  measurementId: "G-T0DGWD5EDT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export{
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword

}