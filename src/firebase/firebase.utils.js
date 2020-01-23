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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef; // we might need userRef again so we return it
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); // always user google prompt select account
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
