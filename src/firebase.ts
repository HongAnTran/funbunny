// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";

const firebaseConfig : FirebaseOptions = {
  apiKey: "AIzaSyA6VCKbXr_sBVwmQn0RrkqYtKIxjZ4dYI0",
  authDomain: "finace-and-tasks-411c4.firebaseapp.com",
  projectId: "finace-and-tasks-411c4",
  storageBucket: "finace-and-tasks-411c4.appspot.com",
  messagingSenderId: "723590011896",
  appId: "1:723590011896:web:243b81deeee3f1cc8cd40d",
  measurementId: "G-X15T1262HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestore
const db = getFirestore(app);
//firebase auth
const auth = getAuth(app);
export { auth , db };