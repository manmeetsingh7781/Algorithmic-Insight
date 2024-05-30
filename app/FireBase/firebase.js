// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  getStream,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { decode } from "base-64";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (typeof atob === "undefined") {
  global.atob = decode;
}

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
  measurementId: process.env.EXPO_PUBLIC_measurementId,
};

// Initialize Firebase
export const FIREBASE = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const DB = getFirestore(FIREBASE);
export const IMAGE_STORAGE = getStorage();

export async function uploadUserImage(user, imageData, imageName) {
  // Base64 formatted string
  // creates a folder of user id
  // console.log(imageData["uri"]);
  // console.log(imageData["memeType"]);

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", imageData["uri"], true);
    xhr.send(null);
  });

  const imgRef = ref(IMAGE_STORAGE, `${user._id}/${imageName}`);
  return uploadBytesResumable(imgRef, blob);
}

export function getUserImage(user, imageName) {
  return getDownloadURL(ref(IMAGE_STORAGE, `${user._id}/${imageName}`));
}
