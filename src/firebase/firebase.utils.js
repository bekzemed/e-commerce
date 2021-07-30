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

// used to add document
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if there is no user logged in return from the function
  if (!userAuth) return;
  // check firestore database if user exists
  // we can perform CRUD on document reference(firestore.doc()) like .set() .get() .update() .delete()
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('collections')

  // get users document from database
  const snapshot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get()

  // console.log({collection: collectionSnapshot.docs.map(doc => doc.data())});

  // if user signed in using google oAuth and it is not in the database set that user and save it into users collection in the databse
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

// uses to add collection and coorosponding documents
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  // collection reference
  const collectionRef = firestore.collection(collectionKey);

  // batch helps batch the request as a big chunk at once
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    // it helps to create new document with unique id
    const newDocRef = collectionRef.doc();

    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transformedCollection = collectionsSnapshot.docs.map(document => {
    const { title, items } = document.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: document.id,
      title,
      items,
    };
  });
  // console.log(transformedCollection, 'here');
  return transformedCollection.reduce((accumulator, collections) => {
    accumulator[collections.title.toLowerCase()] = collections;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// check whether firebase is initialized or not
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
