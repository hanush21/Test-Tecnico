import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getClients, addClient } from "../services/clientService";
import useClientStore from "../store/clientStore";



const AddClientForm = ({ onClose }) => {
    const { clients, setClients } = useClientStore();
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [clientData, setClientData] = useState({
        givenName: "",
        familyName1: "",
        email: "",
        phone: "",
        docType: "nif",
        docNum: "",
        customerId: "",
    });

    const [productData, setProductData] = useState({
        productName: "",
        productTypeName: "",
        mbSpeed: "",
        gbData: "",
        numeracioTerminal: "",
        soldAt: "",
    });

    const [selectedClient, setSelectedClient] = useState("");
    const [searchClient, setSearchClient] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        fetchClients();
    }, [setClients]);

    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClientData({ ...clientData, [name]: value });
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmitClient = async (e) => {
        e.preventDefault();
        try {
            await addClient({ ...clientData, products: [] });
            const updatedClients = await getClients();
            setClients(updatedClients);
            setShowConfirmationPopup(true); // Mostrar el popup de confirmación
        } catch (error) {
            console.error("Error al agregar cliente:", error);
        }
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        try {
            const clientToUpdate = clients.find(
                (client) => client.customerId === selectedClient
            );

            if (!clientToUpdate) {
                alert("No se encontró el cliente seleccionado.");
                return;
            }

            const updatedClient = {
                ...clientToUpdate,
                products: [...(clientToUpdate.products || []), productData],
            };

            await addClient(updatedClient); // Simula la actualización del cliente con productos
            const updatedClients = await getClients();
            setClients(updatedClients);
            onClose();
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    const filteredClients = clients.filter((client) =>
        client.givenName.toLowerCase().includes(searchClient.toLowerCase())
    );

    return (
        <FormContainer>
            {!isAddingProduct ? (
                <>
                    <h2>Agregar Cliente</h2>
                    <FormField
                        type="text"
                        name="givenName"
                        placeholder="Nombre"
                        value={clientData.givenName}
                        onChange={handleClientChange}
                        required
                    />
                    <FormField
                        type="text"
                        name="familyName1"
                        placeholder="Apellido"
                        value={clientData.familyName1}
                        onChange={handleClientChange}
                        required
                    />
                    <FormField
                        type="email"
                        name="email"
                        placeholder="Correo"
                        value={clientData.email}
                        onChange={handleClientChange}
                        required
                    />
                    <FormField
                        type="text"
                        name="phone"
                        placeholder="Teléfono"
                        value={clientData.phone}
                        onChange={handleClientChange}
                        required
                    />
                    <FormField
                        type="text"
                        name="docNum"
                        placeholder="Número de Documento"
                        value={clientData.docNum}
                        onChange={handleClientChange}
                        required
                    />
                    <FormField
                        type="text"
                        name="customerId"
                        placeholder="ID del Cliente"
                        value={clientData.customerId}
                        onChange={handleClientChange}
                        required
                    />
                    <SubmitButton onClick={handleSubmitClient}>Agregar Cliente</SubmitButton> <br/>
                    <SubmitButton onClick={handleSubmitClient}>Agregar Producto a cliente</SubmitButton>
                </>
            ) : (
                <>
                    <h2>Agregar Producto</h2>
                    <FormField
                        type="text"
                        placeholder="Buscar cliente..."
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                    />
                    <SelectField
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                    >
                        <option value="">Selecciona un cliente</option>
                        {filteredClients.map((client) => (
                            <option key={client.customerId} value={client.customerId}>
                                {client.givenName} {client.familyName1}
                            </option>
                        ))}
                    </SelectField>
                    <FormField
                        type="text"
                        name="productName"
                        placeholder="Nombre del Producto"
                        value={productData.productName}
                        onChange={handleProductChange}
                        required
                    />
                    <SelectField
                        name="productTypeName"
                        value={productData.productTypeName}
                        onChange={handleProductChange}
                    >
                        <option value="">Seleccione tipo</option>
                        <option value="ftth">Fibra</option>
                        <option value="4G">Móvil</option>
                    </SelectField>
                    <FormField
                        type="number"
                        name="mbSpeed"
                        placeholder="Velocidad en MB"
                        value={productData.mbSpeed}
                        onChange={handleProductChange}
                    />
                    <FormField
                        type="number"
                        name="gbData"
                        placeholder="Datos en GB"
                        value={productData.gbData}
                        onChange={handleProductChange}
                    />
                    <FormField
                        type="text"
                        name="numeracioTerminal"
                        placeholder="Número de Terminal"
                        value={productData.numeracioTerminal}
                        onChange={handleProductChange}
                    />
                    <FormField
                        type="date"
                        name="soldAt"
                        placeholder="Fecha de Venta"
                        value={productData.soldAt}
                        onChange={handleProductChange}
                        required
                    />
                    <SubmitButton onClick={handleSubmitProduct}>
                        Agregar Producto
                    </SubmitButton>
                </>
            )}

            
            {showConfirmationPopup && (
                <PopupOverlay>
                    <PopupContent>
                        <h3>Cliente agregado correctamente</h3>
                        <p>¿Deseas agregar un producto para este cliente?</p>
                        <SubmitButton
                            onClick={() => {
                                setIsAddingProduct(true);
                                setShowConfirmationPopup(false);
                            }}
                        >
                            Sí, agregar producto
                        </SubmitButton>
                        <CloseButton onClick={() => onClose()}>No, finalizar</CloseButton>
                    </PopupContent>
                </PopupOverlay>
            )}
        </FormContainer>
    );
};

export default AddClientForm;


// Estilizado
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #242424;
  width: 85%;
`;

const FormField = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SelectField = styled.select`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: #242424;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;