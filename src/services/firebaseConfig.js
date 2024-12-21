import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyARaf3UPiSmPHwHn0185RmilpixU6ObOBo",
    authDomain: "testsit-9c5f3.firebaseapp.com",
    projectId: "testsit-9c5f3",
    storageBucket: "testsit-9c5f3.firebasestorage.app",
    messagingSenderId: "895995371650",
    appId: "1:895995371650:web:49ed788debc2d0ce6e549b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
