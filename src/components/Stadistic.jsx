import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { collection, getDocs } from "firebase/firestore";
import db from ".././services/firebaseConfig";



const Stadistic = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchClientsFromFirebase = async () => {
            try {
                const clientsCollection = collection(db, "clients");
                const clientSnapshot = await getDocs(clientsCollection);
                const clients = clientSnapshot.docs.map((doc) => doc.data());

                const productCounts = {};

                clients.forEach((client) => {
                    if (client.products) {
                        client.products.forEach((product) => {
                            if (!productCounts[product.productName]) {
                                productCounts[product.productName] = {
                                    name: product.productName,
                                    ventas: 0,
                                };
                            }
                            productCounts[product.productName].ventas += 1;
                        });
                    }
                });

                const formattedData = Object.values(productCounts);
                setProductData(formattedData);
            } catch (error) {
                console.error("Error al obtener datos de Firebase:", error);
            }
        };

        fetchClientsFromFirebase();
    }, []);

    return (
        <Container>
            <h2>Productos Más Vendidos</h2>
            {productData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={productData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>No hay datos disponibles para mostrar.</p>
            )}
        </Container>
    );
};

export default Stadistic;


const Container = styled.div`
    width: 100%;
    height: 400px;
    margin-top: 20px;
`;