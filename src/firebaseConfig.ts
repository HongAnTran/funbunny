// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore ,connectFirestoreEmulator} from "firebase/firestore";
import { getAuth , connectAuthEmulator } from "firebase/auth";

const firebaseConfig : FirebaseOptions = {
  apiKey: "AIzaSyA6VCKbXr_sBVwmQn0RrkqYtKIxjZ4dYI0",
  authDomain: "finace-and-tasks-411c4.firebaseapp.com",
  projectId: "finace-and-tasks-411c4",
  storageBucket: "finace-and-tasks-411c4.appspot.com",
  messagingSenderId: "723590011896",
  appId: "1:723590011896:web:243b81deeee3f1cc8cd40d",
  measurementId: "G-X15T1262HT"
};

// const PORT_URL = 8080
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestore
const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost',PORT_URL);
//firebase auth
const auth = getAuth(app);
// auth.languageCode = 'vi'
// connectAuthEmulator(auth, "http://localhost:9099");
export { auth , db };