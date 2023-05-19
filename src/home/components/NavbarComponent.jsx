import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { startLogout } from '../../store/auth/thunk'
import { onOpenCarrito } from '../../store/ui/uiSlice'
import logo from '../../assets/img/bcnv.jpg'
import { CContainer, CCollapse, CNavbar, CNavbarToggler, CNavbarNav, CImage, CButton } from '@coreui/react'

export const NavbarComponent = () => {

    const [visible, setVisible] = useState(false)

    const { status, user } = useSelector(state => state.auth)

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const onClickLogout = () => {

        dispatch(startLogout())
        
    }

    const openCarrito = () => {

        dispatch(onOpenCarrito())

    }

    return (

        <>
            <CNavbar expand="lg" colorScheme="dark" className="bg-dark">
                <CContainer fluid>
                    <NavLink  className={ ({isActive}) => {
                        return `nav-link ${isActive ? 'active': ''}`
                    }} 
                        to="/home"
                    >
                        <CImage style={{ width: 50, height: 50}} src={logo}/>
                    </NavLink>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse justify-content-between" visible={visible}>
                        <CNavbarNav className="me-auto mb-2 mb-lg-0">
                            <NavLink  className={ ({isActive}) => {
                                return `nav-link ${isActive ? 'active': ''}`
                            }} 
                                to="/home"
                            >
                                Home
                            </NavLink>
                            <NavLink  className={ ({isActive}) => {
                                return `nav-link ${isActive ? 'active': ''}`
                            }} 
                                to="/libros"
                            >
                                Libros
                            </NavLink>
                            <NavLink  className={ ({isActive}) => {
                                return `nav-link ${isActive ? 'active': ''}`
                            }} 
                                to="/eventos"
                            >
                                Eventos y noticias
                            </NavLink>
                        </CNavbarNav>
                        {
                            ( status == 'not-authenticated' ) ? 
                            ( 
                                <>
                                    <NavLink className={ ({isActive}) => {
                                        return `nav-link text-light ${isActive ? 'active': ''}`
                                    }}
                                        to="/auth/registro"
                                    >
                                        Registrate
                                    </NavLink>
                                    <NavLink className={ ({isActive}) => {
                                        return `nav-link mx-2 text-light ${isActive ? 'active': ''}`
                                    }}
                                        to="/auth/login"
                                    >
                                        Iniciar Sesión
                                    </NavLink>
                                </>
                            ) : 
                            (
                                <CButton onClick={onClickLogout} color="danger">Cerrar Sesión</CButton>
                            )
                        }
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    
    )
}
