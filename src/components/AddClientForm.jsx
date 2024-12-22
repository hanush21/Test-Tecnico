import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getClients, addClient } from "../services/clientService";
import useClientStore from "../store/clientStore";
import AddProduct from "./AddProduct";



const AddClientForm = ({ onClose }) => {
    const { clients, setClients } = useClientStore();
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [error, setError] = useState("");
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

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isValidPhone = (phone) => {
        const phoneRegex = /^\d{9}$/; 
        return phoneRegex.test(phone);
    };
    

    const handleSubmitClient = async (e) => {
        e.preventDefault();
    
        const validations = {
            docType: !clientData.docType && "Por favor, seleccione un tipo de documento.",
            docNum: !clientData.docNum.trim() && "Por favor, ingrese el número de documento.",
            email: (!clientData.email.trim() || !isValidEmail(clientData.email)) && "Por favor, ingrese un email válido.",
            givenName: !clientData.givenName.trim() && "Por favor, ingrese el nombre del cliente.",
            familyName1: !clientData.familyName1.trim() && "Por favor, ingrese el apellido del cliente.",
            phone: (!clientData.phone.trim() || !isValidPhone(clientData.phone)) && "Por favor, ingrese un número de teléfono válido."
        };
    
        const error = Object.values(validations).find(val => val);
        if (error) {
            setError(error);
            return;
        }
    
        try {
            await addClient({ ...clientData, products: [] });
            const updatedClients = await getClients();
            setClients(updatedClients);
            setShowConfirmationPopup(true);
            resetForm();
        } catch (error) {
            console.error("Error al agregar cliente:", error);
            setError("Hubo un error al agregar el cliente. Por favor, inténtelo de nuevo.");
        }
    };

    const resetForm = () => {
        setClientData({
            givenName: "",
            familyName1: "",
            email: "",
            phone: "",
            docType: "nif",
            docNum: "",
            customerId: "",
        });
    };
    

    const handleAddProduct = () => {
        setIsAddingProduct(true);
        setShowAddProduct(true);
    };


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
                    <SubmitButton onClick={handleAddProduct}>Agregar Producto a cliente</SubmitButton>
                    {showAddProduct && <AddProduct onClose={() => setShowAddProduct(false)} />}
                </>
            ) : (
                <AddProduct 
                onClose={()=> onClose() }
                />
            )}
            {error && <div style={{color: 'red'}}>{error}</div>}


            
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
  width: 96%;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0455ac;
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