"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL  }
 from "firebase/storage";
//  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmGTBipAOPJbBhfvDjUU52SlWNGrGKPOk",
  authDomain: "service-for-sell.firebaseapp.com",
  projectId: "service-for-sell",
  storageBucket: "service-for-sell.appspot.com",
  messagingSenderId: "394236930876",
  appId: "1:394236930876:web:f9ad00d25de6da4dea0c39",
  measurementId: "G-T0DGWD5EDT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// Initialize analytics only if in the browser
let analytics;
if (typeof window !== "undefined") {
  const { getAnalytics } = require("firebase/analytics");
  analytics = getAnalytics(app);
}

// Export the auth methods and auth instance
export {
  auth,
  db,
  storage,

  // import from firbase/auth
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,

  // import from firestore
  collection,
  addDoc,
  query,
  where,
  getDocs,

  // import from firestorage/ cloud storage
  ref,
  uploadBytes,
  getDownloadURL,
};
