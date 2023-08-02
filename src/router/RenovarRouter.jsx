import { Navigate } from "react-router-dom"

export const RenovarRouter = ({ children }) => {
    
    const user = JSON.parse(localStorage.getItem('user'));

    return ( user?.estado_usuario == 3 ) ? children : <Navigate to='home'/>

}
