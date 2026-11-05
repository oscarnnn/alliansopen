import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Webb-konfig för Firebase är inte hemlig – åtkomst styrs av firestore.rules.
const firebaseConfig = {
  apiKey: "AIzaSyBu50DAgF3nD7ISWbWk-5spDKgRLv7GEAY",
  authDomain: "shaftshankredemption.firebaseapp.com",
  projectId: "shaftshankredemption",
  storageBucket: "shaftshankredemption.appspot.com",
  messagingSenderId: "967999160114",
  appId: "1:967999160114:web:86a7090423094ba1b9e12b",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const SEASON_ID = "2026";

export const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS ?? "")
  .split(",")
  .map((s: string) => s.trim().toLowerCase())
  .filter(Boolean);

export const DEMO_FORCED = import.meta.env.VITE_DEMO === "true";
