'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Firebase Configuration
 * 
 * This object contains the necessary keys and identifiers to connect
 * the application to the Firebase backend.
 */
const firebaseConfig = {
  apiKey: "AIzaSyCAEDgLTcoWTAmGkQA_PknV0bIdLiJjGuU",
  authDomain: "supptrackr1989.firebaseapp.com",
  projectId: "supptrackr1989",
  storageBucket: "supptrackr1989.firebasestorage.app",
  messagingSenderId: "705811869407",
  appId: "1:705811869407:web:2e65d1ea48424d6194836a"
};

/**
 * Initialize Firebase
 * 
 * We check if an app instance already exists to prevent re-initializing
 * Firebase multiple times, which can cause errors in Next.js during
 * hot-reloading or server-side rendering.
 */
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Authentication Providers for SSO
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const twitterProvider = new TwitterAuthProvider();

export { app, auth, db, storage, googleProvider, microsoftProvider, twitterProvider };
