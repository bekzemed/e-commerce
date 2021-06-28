import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_kinUXbRo_ogRmbbvXHJa-9g5uTHqMPA',
  authDomain: 'e-commerce-clothing-8e003.firebaseapp.com',
  projectId: 'e-commerce-clothing-8e003',
  storageBucket: 'e-commerce-clothing-8e003.appspot.com',
  messagingSenderId: '56644392470',
  appId: '1:56644392470:web:8c34371b02ed930a764737',
  measurementId: 'G-HP6DQMN9MH',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if there is no user logged in return from the function
  if (!userAuth) return;
  // check firestore database if user exists
  // we can perform CRUD on document reference(firestore.doc()) like .set() .get() .update() .delete()
  const userRef = firestore.doc(`/users/${userAuth.uid}`);

  // get collection of users from database
  const snapshot = await userRef.get();

  // if user signed in using google oAuth is not in the database set that user and save it into users collection in the databse
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// check whether firebase is initialized or not
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
