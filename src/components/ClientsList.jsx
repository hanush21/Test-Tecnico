import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getClients } from "../services/clientService";
import useClientStore from "../store/clientStore";
import AddClientForm from "../components/AddClientForm";

const ClientsList = () => {
    const { clients, setClients } = useClientStore();
    const [search, setSearch] = useState("");
    const [filterProductType, setFilterProductType] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getClients();
            setClients(data);
        };
        fetchClients();
    }, [setClients]);

    const handleRowClick = (client) => {
        setSelectedClient(client); // Selecciona el cliente
        setIsPopupOpen(true); // Abre el popup
    };

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.givenName.toLowerCase().includes(search.toLowerCase()) ||
            client.familyName1.toLowerCase().includes(search.toLowerCase()) ||
            client.email.toLowerCase().includes(search.toLowerCase());

        const matchesProduct =
            filterProductType === "" ||
            client.products.some(
                (product) =>
                    product.productTypeName
                        .toLowerCase()
                        .includes(filterProductType.toLowerCase())
            );

        return matchesSearch && matchesProduct;
    });

    return (
        <Container>
            <Header>
                <Title>Clientes</Title>
                <AddButton onClick={() => setIsAddFormOpen(true)}>
                    Agregar Cliente o Producto
                </AddButton>
            </Header>
            <div>
                <FilterInput
                    type="text"
                    placeholder="Buscar cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FilterSelect
                    value={filterProductType}
                    onChange={(e) => setFilterProductType(e.target.value)}
                >
                    <option value="">Todos los productos</option>
                    <option value="ftth">Fibra</option>
                    <option value="4G">Móvil</option>
                </FilterSelect>
            </div>
            <Table>
                <thead>
                    <tr>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellido</TableHead>
                        <TableHead>Email</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map((client) => (
                        <TableRow key={client.id} onClick={() => handleRowClick(client)}>
                            <TableData>{client.givenName}</TableData>
                            <TableData>{client.familyName1}</TableData>
                            <TableData>{client.email}</TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            {isAddFormOpen && (
                <PopupOverlay onClick={() => setIsAddFormOpen(false)}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setIsAddFormOpen(false)}>✖</CloseButton>
                        <AddClientForm onClose={() => setIsAddFormOpen(false)} />
                    </PopupContent>
                </PopupOverlay>
            )}


            {isPopupOpen && selectedClient && (
                <PopupOverlay onClick={() => setIsPopupOpen(false)}>

                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setIsPopupOpen(false)}>✖</CloseButton>
                        <h2 style={{ color: "white" }}>Información del Cliente</h2>
                        <PopupScrollContainer>
                            <ClientInfo>
                                <p>
                                    <strong style={{ color: "white" }}>Nombre:</strong> {selectedClient.givenName}{" "}
                                    {selectedClient.familyName1}
                                </p>
                                <p>
                                    <strong style={{ color: "white" }}>Email:</strong> {selectedClient.email}
                                </p>
                                <p>
                                    <strong style={{ color: "white" }}>Teléfono:</strong> {selectedClient.phone}
                                </p>
                            </ClientInfo>
                            <ProductsSection>
                                <h3 style={{ color: "white" }}>Productos Contratados:</h3>
                                <ProductsList>
                                    {selectedClient.products.map((product) => (
                                        <ProductItem key={product._id}>
                                            <p><strong>{product.productName}</strong></p>
                                            <p>Tipo: {product.productTypeName}</p>
                                            <p>Velocidad: {product.mbSpeed || "N/A"}</p>
                                            <p>Datos: {product.gbData || "N/A"}</p>
                                            <p>Terminal: {product.numeracioTerminal}</p>
                                            <p>Fecha de venta: {product.soldAt}</p>
                                        </ProductItem>
                                    ))}
                                </ProductsList>
                            </ProductsSection>
                        </PopupScrollContainer>
                    </PopupContent>


                </PopupOverlay>
            )}
        </Container>
    );
};

export default ClientsList;

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const FilterInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  width: 96%;
  max-width: 400px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #242424;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #3a3a3a;
  }
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;



// nuevos productos items 

const PopupContent = styled.div`
  background: #242424;
  padding: 20px;
  border-radius: 15px;
  width: 600px;
  height: 80%; /* Limita la altura al 80% de la pantalla */
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Asegura que no se desborde */
  align-items: center;
`;

const PopupScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto; 
  margin-top: 10px;
  width: 100%;
`;

const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductsSection = styled.div`
  margin-top: 20px;
`;

const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #242424;
  color: white;
`;
