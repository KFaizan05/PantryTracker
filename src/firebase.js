import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDZa0phBc7Zyoe1PR-Oh_OuVKgxzAgfeQo",
  authDomain: "pantry-tracker-7b6aa.firebaseapp.com",
  projectId: "pantry-tracker-7b6aa",
  storageBucket: "pantry-tracker-7b6aa.appspot.com",
  messagingSenderId: "326734947407",
  appId: "1:326734947407:web:62b5ce698d434c9f91363a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };