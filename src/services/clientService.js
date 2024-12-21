import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../services/firebaseConfig.js";

// Referencia a la colección "clients" en Firestore
const clientsCollection = collection(db, "clients");

// Función para guardar un cliente
export const addClient = async (client) => {
    try {
        const docRef = await addDoc(clientsCollection, client);
        console.log("Cliente agregado con ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar cliente: ", error);
        throw error;
    }
};

// Función para obtener todos los clientes
export const getClients = async () => {
    try {
        const querySnapshot = await getDocs(clientsCollection);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error al obtener clientes: ", error);
        throw error;
    }
};
