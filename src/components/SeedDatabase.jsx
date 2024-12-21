import React from "react";
import { addClient } from "../services/clientService";

const SeedDatabase = () => {
    const seedData = async () => {
        const clients = [
            {
                _id: 555555,
                docType: "nif",
                docNum: "11223344E",
                email: "it@parlem.com",
                customerId: "11111",
                givenName: "Enriqueta",
                familyName1: "Parlem",
                phone: "668668668",
                products: [
                    {
                        _id: 1111111,
                        productName: "FIBRA 1000MB",
                        mbSpeed: 1000,
                        gbData: null,
                        productTypeName: "ftth",
                        numeracioTerminal: 933933933,
                        soldAt: "2019-01-09 14:26:17",
                    },
                    {
                        _id: 1111112,
                        productName: "MOBIL 500GB",
                        mbSpeed: null,
                        gbData: 500,
                        productTypeName: "4G",
                        numeracioTerminal: 696696969,
                        soldAt: "2020-08-01 18:30:27",
                    },
                ],
            },
            {
                _id: 555556,
                docType: "nif",
                docNum: "11223344F",
                email: "maria@test.com",
                customerId: "11112",
                givenName: "Maria",
                familyName1: "Lopez",
                phone: "669669669",
                products: [
                    {
                        _id: 1111113,
                        productName: "FIBRA 500MB",
                        mbSpeed: 500,
                        gbData: null,
                        productTypeName: "ftth",
                        numeracioTerminal: 944944944,
                        soldAt: "2019-02-09 10:20:17",
                    },
                ],
            },
            {
                _id: 555557,
                docType: "nie",
                docNum: "X1234567Z",
                email: "juan@example.com",
                customerId: "11113",
                givenName: "Juan",
                familyName1: "García",
                phone: "670670670",
                products: [
                    {
                        _id: 1111114,
                        productName: "FIBRA 300MB",
                        mbSpeed: 300,
                        gbData: null,
                        productTypeName: "ftth",
                        numeracioTerminal: 955955955,
                        soldAt: "2019-03-15 09:45:30",
                    },
                    {
                        _id: 1111115,
                        productName: "MOBIL 100GB",
                        mbSpeed: null,
                        gbData: 100,
                        productTypeName: "4G",
                        numeracioTerminal: 697697697,
                        soldAt: "2020-09-10 14:20:00",
                    },
                ],
            },
            {
                _id: 555558,
                docType: "nif",
                docNum: "22334455G",
                email: "ana@test.com",
                customerId: "11114",
                givenName: "Ana",
                familyName1: "Martínez",
                phone: "671671671",
                products: [
                    {
                        _id: 1111116,
                        productName: "FIBRA 600MB",
                        mbSpeed: 600,
                        gbData: null,
                        productTypeName: "ftth",
                        numeracioTerminal: 966966966,
                        soldAt: "2019-04-20 11:30:45",
                    },
                ],
            },
            {
                _id: 555559,
                docType: "nie",
                docNum: "Y2345678A",
                email: "pedro@example.com",
                customerId: "11115",
                givenName: "Pedro",
                familyName1: "Sánchez",
                phone: "672672672",
                products: [
                    {
                        _id: 1111117,
                        productName: "MOBIL 200GB",
                        mbSpeed: null,
                        gbData: 200,
                        productTypeName: "4G",
                        numeracioTerminal: 698698698,
                        soldAt: "2020-10-05 16:15:10",
                    },
                ],
            },
            {
                _id: 555560,
                docType: "nif",
                docNum: "33445566H",
                email: "laura@test.com",
                customerId: "11116",
                givenName: "Laura",
                familyName1: "Fernández",
                phone: "673673673",
                products: [
                    {
                        _id: 1111118,
                        productName: "FIBRA 1000MB",
                        mbSpeed: 1000,
                        gbData: null,
                        productTypeName: "ftth",
                        numeracioTerminal: 977977977,
                        soldAt: "2019-05-25 13:40:20",
                    },
                    {
                        _id: 1111119,
                        productName: "MOBIL 300GB",
                        mbSpeed: null,
                        gbData: 300,
                        productTypeName: "4G",
                        numeracioTerminal: 699699699,
                        soldAt: "2020-11-15 10:05:30",
                    },
                ],
            },
            {
                _id: 555561,
                docType: "nie",
                docNum: "Z3456789B",
                email: "carlos@example.com",
                customerId: "11117",
                givenName: "Carlos",
                familyName1: "Rodríguez",
                phone: "674674674",
                products: [
                    {
                        _id: 1111120,
                        productName: "FIBRA 500MB",
                        mbSpeed: 500,
                        gbData: null,
                        productTypeName: "ftth",
                        numeracioTerminal: 988988988,
                        soldAt: "2019-06-30 15:55:40",
                    },
                ],
            },
            {
                _id: 555562,
                docType: "nif",
                docNum: "44556677I",
                email: "sofia@test.com",
                customerId: "11118",
                givenName: "Sofía",
                familyName1: "Gómez",
                phone: "675675675",
                products: [
                    {
                        _id: 1111121,
                        productName: "MOBIL 400GB",
                        mbSpeed: null,
                        gbData: 400,
                        productTypeName: "4G",
                        numeracioTerminal: 690690690,
                        soldAt: "2020-12-20 09:25:15",
                    },
                ],
            },
        ];
        

        try {
            for (const client of clients) {
                await addClient(client);
            }
            console.log("Clientes cargados exitosamente.");
        } catch (error) {
            console.error("Error al cargar datos iniciales:", error);
        }
    };

    return (
        <div>
            <button onClick={seedData}>Cargar datos iniciales</button>
        </div>
    );
};

export default SeedDatabase;
