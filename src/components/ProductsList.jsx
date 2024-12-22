import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getClients } from "../services/clientService";


const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const clients = await getClients();
            const allProducts = clients.flatMap((client) => client.products);

            // Agrupar productos por nombre y tipo
            const productCounts = allProducts.reduce((acc, product) => {
                const key = `${product.productName}-${product.productTypeName}`;
                if (!acc[key]) {
                    acc[key] = {
                        ...product,
                        count: 0,
                    };
                }
                acc[key].count += 1;
                return acc;
            }, {});

            const groupedProducts = Object.values(productCounts);
            setProducts(groupedProducts);
            setFilteredProducts(groupedProducts);
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        filterProducts(value, filterType);
    };

    const handleFilterType = (e) => {
        const value = e.target.value;
        setFilterType(value);
        filterProducts(search, value);
    };

    const filterProducts = (searchValue, typeValue) => {
        setFilteredProducts(
            products.filter(
                (product) =>
                    product.productName.toLowerCase().includes(searchValue) &&
                    (typeValue === "" || product.productTypeName === typeValue)
            )
        );
    };

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        setIsPopupOpen(true);
    };

    return (
        <Container>
            <Title>Productos Contratados</Title>
            <FilterContainer>
                <FilterInput
                    type="text"
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={handleSearch}
                />
                <FilterSelect value={filterType} onChange={handleFilterType}>
                    <option value="">Todos los tipos</option>
                    <option value="ftth">Fibra</option>
                    <option value="4G">Móvil</option>
                </FilterSelect>
            </FilterContainer>
            <Table>
                <thead>
                    <tr>
                        <TableHead>Producto</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Clientes Contratando</TableHead>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product) => (
                        <TableRow key={`${product.productName}-${product.productTypeName}`} onClick={() => handleRowClick(product)}>
                            <TableData>{product.productName}</TableData>
                            <TableData>{product.productTypeName}</TableData>
                            <TableData>{product.count}</TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            {isPopupOpen && selectedProduct && (
                <PopupOverlay onClick={() => setIsPopupOpen(false)}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <CloseButton onClick={() => setIsPopupOpen(false)}>✖</CloseButton>
                        <h2>Detalles del Producto</h2>
                        <p>
                            <strong>Producto:</strong> {selectedProduct.productName}
                        </p>
                        <p>
                            <strong>Tipo:</strong> {selectedProduct.productTypeName}
                        </p>
                        <p>
                            <strong>Velocidad:</strong> {selectedProduct.mbSpeed || "N/A"}
                        </p>
                        <p>
                            <strong>Datos:</strong> {selectedProduct.gbData || "N/A"}
                        </p>
                        <p>
                            <strong>Terminal:</strong> {selectedProduct.numeracioTerminal}
                        </p>
                        <p>
                            <strong>Clientes Contratando:</strong> {selectedProduct.count}
                        </p>
                    </PopupContent>
                </PopupOverlay>
            )}
        </Container>
    );
};

export default ProductsList;



const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  padding: 10px;
  font-size: 16px;
  flex: 1;
`;

const FilterSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 200px;
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
    background-color: #313131;
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

const PopupContent = styled.div`
  background: #242424;
  padding: 20px;
  border-radius: 15px;
  width: 600px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  color: white;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;