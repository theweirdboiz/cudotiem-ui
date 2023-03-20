import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  signInWithCredential,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZboRqGqSb1KSuVY-Amg3aYG3YjRNEWb4",
  authDomain: "cudotiem.firebaseapp.com",
  projectId: "cudotiem",
  storageBucket: "cudotiem.appspot.com",
  messagingSenderId: "551083749258",
  appId: "1:551083749258:web:2ac269b66282164bd2e273",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

const sendOTP = async (phoneNumber) => {
  const appVerifier = new RecaptchaVerifier("recaptcha-container");
  const confirmationResult = await signInWithPhoneNumber(
    phoneNumber,
    appVerifier
  );
  const verificationCode = prompt("Enter the OTP sent to your phone:");
  const credential = firebase.auth.PhoneAuthProvider.credential(
    confirmationResult.verificationId,
    verificationCode
  );
  await signInWithCredential(credential);
};
// const signInWithEmailAndPassword = async (email, password) => {
//   await signInWithEmailAndPassword(email, password);
// };

export { sendOTP };
