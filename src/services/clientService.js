import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../services/firebaseConfig";

const clientsCollection = collection(db, "clients");

export const addClient = async (client) => {
    try {
        const docRef = await addDoc(clientsCollection, client);
        console.log("Cliente agregado con ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar cliente:", error);
        throw error;
    }
};

export const getClients = async () => {
    try {
        const querySnapshot = await getDocs(clientsCollection);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
};
