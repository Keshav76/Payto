import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdivAjAp4EGKpk2a34UF_Kw0-njdOpTpw",
  authDomain: "paytm-kb.firebaseapp.com",
  projectId: "paytm-kb",
  storageBucket: "paytm-kb.appspot.com",
  messagingSenderId: "1028650931996",
  appId: "1:1028650931996:web:07728a313d0c9c8f5b8cd9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
