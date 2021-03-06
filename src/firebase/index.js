import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/firastore";
// import "firebase/functions";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();
// export const db = firebase.firestore();
// export const storage = firebase.storage();
// export const functions = firebase.functions();
// export const FirebaseTimestamp = firebase.firestore.Timestamp;
