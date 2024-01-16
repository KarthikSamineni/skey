// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAac4rBYjKVkrZak1ZW_FXeQNRtGb1_-bg",
  authDomain: "skey-d7be9.firebaseapp.com",
  databaseURL:
    "https://skey-d7be9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "skey-d7be9",
  storageBucket: "skey-d7be9.appspot.com",
  messagingSenderId: "803876456572",
  appId: "1:803876456572:web:6618d0db460b06d7cae1f9",
  measurementId: "G-8LFH628494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
