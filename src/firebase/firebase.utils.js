import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_kinUXbRo_ogRmbbvXHJa-9g5uTHqMPA",
    authDomain: "e-commerce-clothing-8e003.firebaseapp.com",
    projectId: "e-commerce-clothing-8e003",
    storageBucket: "e-commerce-clothing-8e003.appspot.com",
    messagingSenderId: "56644392470",
    appId: "1:56644392470:web:8c34371b02ed930a764737",
    measurementId: "G-HP6DQMN9MH"
  };

  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;