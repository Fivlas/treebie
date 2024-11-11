import { initializeApp } from "firebase/app";
//@ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { disableNetwork, getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "REMOVED_KEY",
    authDomain: "REMOVED_URL",
    projectId: "treebie-66127",
    storageBucket: "REMOVED_BUCKET",
    messagingSenderId: "REMOVED_ID",
    appId: "1:REMOVED_ID:android:926e964ee0f867c82590c5"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});