import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrBqdN4vEr0rrBLZzFP5VuegTKB_iedGk",
  authDomain: "udemy-dicord-clone.firebaseapp.com",
  projectId: "udemy-dicord-clone",
  storageBucket: "udemy-dicord-clone.firebasestorage.app",
  messagingSenderId: "731842314676",
  appId: "1:731842314676:web:8602136c824bd4505e72e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, db };