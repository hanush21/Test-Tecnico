import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCi2OcSF6WKz40I3ShLMLifph84jQQiX_c",
    authDomain: "festes-catalanes.firebaseapp.com",
    projectId: "festes-catalanes",
    storageBucket: "festes-catalanes.firebasestorage.app",
    messagingSenderId: "895995371650",
    appId: "1:895995371650:web:49ed788debc2d0ce6e549b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
