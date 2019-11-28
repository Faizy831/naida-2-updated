// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDX1vhV18Ya0Y6FpVLk2D-1hQF93s15kWw",
  authDomain: "nadia-panel.firebaseapp.com",
  databaseURL: "https://nadia-panel.firebaseio.com",
  projectId: "nadia-panel",
  storageBucket: "nadia-panel.appspot.com",
  messagingSenderId: "608802847218",
  appId: "1:608802847218:web:93d1285817d551c0"
};
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
