import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBGiIY3RLQwoW54lyiwJwMKYVfMETEMco8",
  authDomain: "crwn-db-aeff9.firebaseapp.com",
  databaseURL: "https://crwn-db-aeff9.firebaseio.com",
  projectId: "crwn-db-aeff9",
  storageBucket: "crwn-db-aeff9.appspot.com",
  messagingSenderId: "387981978466",
  appId: "1:387981978466:web:81812a7b51045ffce9da3b"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // collectionRef is always returned, even if it doesn't exists
  // so we can use collectionRef to add items on the correct path already
  const collectionRef = firestore.collection(collectionKey);

  // because set is made one at a time, we have to batch all of them
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // give me a document reference and generate a random id fo me
    // we can set an id inside doc() call also
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // will fire batch commands
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()), // converts into a version that a browser can read
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator; // returns to every iteration
  }, {}); // -> initial object
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
