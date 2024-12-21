import React, { useEffect } from "react";
import { getClients } from "../services/clientService";
import useClientStore from "../store/clientStore";

const Clients = () => {
    const { clients, setClients } = useClientStore();

    useEffect(() => {
        // Función para obtener los clientes desde Firestore
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data); // Actualiza el estado global con los datos de Firestore
            } catch (error) {
                console.error("Error al obtener clientes:", error);
            }
        };

        fetchClients();
    }, [setClients]);

    return (
        <div>
            <h1>Listado de Clientes</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.givenName} {client.familyName1} - {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clients;
