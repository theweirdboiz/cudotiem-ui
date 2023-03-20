import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZboRqGqSb1KSuVY-Amg3aYG3YjRNEWb4",
  authDomain: "cudotiem.firebaseapp.com",
  projectId: "cudotiem",
  storageBucket: "cudotiem.appspot.com",
  messagingSenderId: "551083749258",
  appId: "1:551083749258:web:2ac269b66282164bd2e273",
};

const app = firebase.initializeApp(firebaseConfig);

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

export { sendOTP, signInWithEmailAndPassword };
