import { Navigate } from "react-router-dom";
import Admin from "../admin/Admin";

const Private = () => {
    const token = localStorage.getItem("token");

    if(token) {
        return <Admin/>
    }
    return <Navigate to="/"/>
}

export default Private