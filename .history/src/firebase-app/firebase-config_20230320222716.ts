import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCZboRqGqSb1KSuVY-Amg3aYG3YjRNEWb4",
  authDomain: "cudotiem.firebaseapp.com",
  projectId: "cudotiem",
  storageBucket: "cudotiem.appspot.com",
  messagingSenderId: "551083749258",
  appId: "1:551083749258:web:2ac269b66282164bd2e273",
};

const initializeAppNecessary = () => {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
};

const app = initializeAppNecessary();

export default { app };
