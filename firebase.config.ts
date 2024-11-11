import { initializeApp } from "firebase/app";
//@ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { disableNetwork, getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTWTRxHJAWB0GHdjblLmxfSRj42RDe6Hk",
    authDomain: "treebie-66127.firebaseapp.com",
    projectId: "treebie-66127",
    storageBucket: "treebie-66127.appspot.com",
    messagingSenderId: "57758107040",
    appId: "1:57758107040:android:926e964ee0f867c82590c5"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});