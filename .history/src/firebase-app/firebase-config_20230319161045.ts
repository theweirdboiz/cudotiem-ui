import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZboRqGqSb1KSuVY-Amg3aYG3YjRNEWb4",
  authDomain: "cudotiem.firebaseapp.com",
  projectId: "cudotiem",
  storageBucket: "cudotiem.appspot.com",
  messagingSenderId: "551083749258",
  appId: "1:551083749258:web:2ac269b66282164bd2e273",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const sendOTP = async (phoneNumber: string) => {
  const appVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  const confirmationResult = await firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, appVerifier);
  const verificationCode = prompt("Enter the OTP sent to your phone:");
  const credential = firebase.auth.PhoneAuthProvider.credential(
    confirmationResult.verificationId,
    verificationCode as string
  );
  await firebase.auth().signInWithCredential(credential);
};

const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
};

// const signInWithEmailAndPassword = async (email: string, password: string) => {
//   await firebase.auth().signInWithEmailAndPassword(email, password);
// };
export { auth, db, signInWithGoogle, sendOTP };
