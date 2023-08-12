// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp9LvPMZ1rr88cZ4KdH5TrBVlWmpDJD88",
  authDomain: "flipkartfashionai.firebaseapp.com",
  projectId: "flipkartfashionai",
  storageBucket: "flipkartfashionai.appspot.com",
  messagingSenderId: "15653471175",
  appId: "1:15653471175:web:7c1724212f69af68258fe2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { getAuth } from "firebase/auth";


const auth = getAuth();
const user = auth.currentUser;
export  {auth ,app ,db };

