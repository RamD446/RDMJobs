// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzXgI8kvqz9CEo9393W48yEZjUx6l_YNM",
  authDomain: "rdmjobs-78da3.firebaseapp.com",
  projectId: "rdmjobs-78da3",
  storageBucket: "rdmjobs-78da3.appspot.com",
  messagingSenderId: "850369074130",
  appId: "1:850369074130:web:c96133288fb6cabdd82e0b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, query, where, orderBy, getDocs };
