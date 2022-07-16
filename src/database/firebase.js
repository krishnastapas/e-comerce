import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDz6eu6iU_gdhp5BOYFdgxGSYFo1VS3ik",
  authDomain: "e-commerce-4ad94.firebaseapp.com",
  projectId: "e-commerce-4ad94",
  storageBucket: "e-commerce-4ad94.appspot.com",
  messagingSenderId: "367735157363",
  appId: "1:367735157363:web:5494ca092ca987c7e8b006",
  measurementId: "G-82TDE1W68B"
};
const firebaseApp = initializeApp(firebaseConfig);

const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const storage=getStorage(firebaseApp);

export { database, auth,storage };