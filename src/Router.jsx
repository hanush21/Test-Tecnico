import { Route, Routes } from "react-router-dom"
import Clients from "./pages/Clients"
import ProductsPage from "./pages/ProductsPage"
import Layout from "./navigation/Layout"
import StatsPage from "./pages/StatsPage"


const Router = () => {


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Clients />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="stats" element={<StatsPage/>} />
            </Routes>
        </Layout>
    )
}

export default Router
