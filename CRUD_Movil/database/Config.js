import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUEiR6a1HasI2CvR1bqwC6yd_8gLFKAIA",
  authDomain: "crudmovil-642f4.firebaseapp.com",
  projectId: "crudmovil-642f4",
  storageBucket: "crudmovil-642f4.appspot.com",
  messagingSenderId: "509207054579",
  appId: "1:509207054579:web:132e2df6651ab6dda7cf86",
  measurementId: "G-5B8XRCVRCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db; 