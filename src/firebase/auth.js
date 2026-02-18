import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config";

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Register with Email & Password
export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login with Email & Password
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Login with Google
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Login with GitHub
export const loginWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};

// Logout
export const logout = () => {
  return signOut(auth);
};

// Auth State Listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
