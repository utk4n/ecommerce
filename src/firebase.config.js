import { initializeApp,getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAiMRazPoWNYtmjTGpQeUVDmwlFNpCExZA",
  authDomain: "reactecommerce-5d9fe.firebaseapp.com",
  projectId: "reactecommerce-5d9fe",
  storageBucket: "reactecommerce-5d9fe.appspot.com",
  messagingSenderId: "271409017896",
  appId: "1:271409017896:web:cb0943c5bad076a2b7311d"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)
export {app, firestore, storage}