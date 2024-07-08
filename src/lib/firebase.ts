'use client';

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGYRT5XFt3i2ZMhusQlv76d72BJ7NVnKc",
  authDomain: "thedigitalninja.firebaseapp.com",
  projectId: "thedigitalninja",
  storageBucket: "thedigitalninja.appspot.com",
  messagingSenderId: "371309316618",
  appId: "1:371309316618:web:22a124fb83ab4d504c6df3",
  measurementId: "G-TL5HD5WS6R"
};

// Initialize Firebase only on the client side
let app: FirebaseApp;
let auth: Auth;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth };