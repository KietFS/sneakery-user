// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArP8AuN2D1EXAgtYTdqe2oTs14SWYYGzg",
  authDomain: "sneakery-aution.firebaseapp.com",
  projectId: "sneakery-aution",
  storageBucket: "sneakery-aution.appspot.com",
  messagingSenderId: "491202718617",
  appId: "1:491202718617:web:ac1407d565daca48144108",
};

// Initialize Firebase
const app = getApps()?.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
