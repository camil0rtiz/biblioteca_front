import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PublicRouter = ({ children }) => {
    
    const { status, user } = useSelector( state => state.auth )
    
    return ( status != 'authenticated') ? children: (user.tipo_rol) ? <Navigate to='/admin'/> : <Navigate to='/'/>
}
