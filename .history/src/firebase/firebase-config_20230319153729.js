import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

const sendOTP = async (phoneNumber) => {
  const appVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  const confirmationResult = await firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier);
  const verificationCode = prompt("Enter the OTP sent to your phone:");
  const credential = firebase.auth.PhoneAuthProvider.credential(
    confirmationResult.verificationId,
    verificationCode
  );
  await firebase.auth().signInWithCredential(credential);
};
const signInWithEmailAndPassword = async (email, password) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const auth = getAuth();
export const db = getFirestore(app);

export { sendOTP, signInWithEmailAndPassword };
