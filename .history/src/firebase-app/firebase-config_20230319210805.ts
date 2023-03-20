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

firebase.auth().settings.appVerificationDisabledForTesting = true;

// This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
// This will resolve after rendering without app verification.
// var appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
// // signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
// // reCAPTCHA response.
// firebase
//   .auth()
//   .signInWithPhoneNumber(phoneNumber, appVerifier)
//   .then(function (confirmationResult) {
//     // confirmationResult can resolve with the fictional testVerificationCode above.
//     return confirmationResult.confirm(testVerificationCode);
//   })
//   .catch(function (error) {
//     // Error; SMS not sent
//     // ...
//   });

export { auth };
