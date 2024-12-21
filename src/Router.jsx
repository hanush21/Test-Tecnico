import { Route, Routes } from "react-router-dom"
import Clients from "./pages/Clients"
import ClientDetails from "./pages/ClientDetails"


const Router = () => {


    return (
        <Routes>
            <Route path="/" element={<Clients />} />
            <Route path="details" element={<ClientDetails />} />
        </Routes>
    )
}

export default Router
