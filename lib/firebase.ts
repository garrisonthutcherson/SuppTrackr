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
 * 
 * NOTE: For security reasons, these values are now loaded from environment variables.
 * Make sure to copy .env.example to .env.local and fill in your actual Firebase project details
 * before running the app locally or deploying.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
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
