import { Navigate } from "react-router-dom"

export const PrivateRouter = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    return ( user?.tipo_rol ) ? children : <Navigate to='/'/>
    
}
