import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getClients, addClient } from "../services/clientService";
import useClientStore from "../store/clientStore";
import PropTypes from 'prop-types';

const AddProduct = ({ onClose }) => {
    const { clients, setClients } = useClientStore();
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
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                setError("Error al cargar los clientes");
            } finally {
                setIsLoading(false);
            }
        };
        fetchClients();
    }, [setClients]);

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const validations = {
                client: !selectedClient ? "Por favor, seleccione un cliente." : null,
                productName: !productData.productName.trim() ? "Por favor, ingrese el nombre del producto." : null,
                productType: !productData.productTypeName ? "Por favor, seleccione el tipo de producto." : null,
                soldAt: !productData.soldAt ? "Por favor, ingrese la fecha de venta." : null,
                ftth: productData.productTypeName === "ftth" && !productData.mbSpeed ? "Por favor, ingrese la velocidad en MB para productos de fibra." : null,
                "4G": productData.productTypeName === "4G" && !productData.gbData ? "Por favor, ingrese los datos en GB para productos móviles." : null,
                terminal: !productData.numeracioTerminal ? "Por favor, ingrese el número de terminal." : null
            };
    
            const error = Object.values(validations).find(val => val !== null);
            if (error) throw new Error(error);
    
            const clientToUpdate = clients.find(client => client.customerId === selectedClient);
            if (!clientToUpdate) throw new Error("No se encontró el cliente seleccionado.");
    
            const updatedClient = {
                ...clientToUpdate,
                products: [...(clientToUpdate.products || []), {
                    ...productData,
                    soldAt: new Date(productData.soldAt).toISOString(),
                    _id: Date.now()
                }],
            };
    
            await addClient(updatedClient);
            const updatedClients = await getClients();
            setClients(updatedClients);
            resetForm();
            onClose();
        } catch (error) {
            console.error("Error al agregar producto:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    

    const resetForm = () => {
        setProductData({
            productName: "",
            productTypeName: "",
            mbSpeed: "",
            gbData: "",
            numeracioTerminal: "",
            soldAt: "",
        });
        setSelectedClient("");
        setSearchClient("");
    };

    const filteredClients = clients.filter((client) =>
        client.givenName.toLowerCase().includes(searchClient.toLowerCase())
    );

    return (
        <FormContainer onSubmit={handleSubmitProduct}>
            <h2>Agregar Producto</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <FormField
                type="text"
                placeholder="Buscar cliente..."
                value={searchClient}
                onChange={(e) => setSearchClient(e.target.value)}
            />
            <SelectField
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                required
            >
                <option key="default" value="">Selecciona un cliente</option>
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
                required
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
            <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? "Agregando..." : "Agregar Producto"}
            </SubmitButton>
        </FormContainer>
    );
};


AddProduct.propTypes = {
    onClose: PropTypes.func
  };

export default AddProduct;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #242424;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const SelectField = styled.select`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #0254ad;
    }
    &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    font-size: 14px;
    margin-bottom: 10px;
`;
