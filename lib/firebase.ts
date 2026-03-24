'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import firebaseConfig from '../firebase-applet-config.json';

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
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const storage = getStorage(app);

// Initialize Authentication Providers for SSO
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const twitterProvider = new TwitterAuthProvider();

export { app, auth, db, storage, googleProvider, microsoftProvider, twitterProvider };
