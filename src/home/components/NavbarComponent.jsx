import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { CContainer, CCollapse, CNavbar, CNavbarToggler, CNavbarNav, CImage, CDropdownDivider, CNavbarBrand, CNavItem, CNavLink, CDropdown, CDropdownToggle, CAvatar, CDropdownMenu, CDropdownHeader, CDropdownItem, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilLockLocked, cilShare } from '@coreui/icons'
import { startLogout } from '../../store/auth/thunk'
import { onOpenCarrito } from '../../store/ui/uiSlice'
import logo from '../../assets/img/bcnv.jpg'
import usuario from './../../assets/img/2.jpg'

export const NavbarComponent = () => {

    const [visible, setVisible] = useState(false)

    const { status, user } = useSelector(state => state.auth)

    // console.log(user);

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
            <CNavbar expand="lg" colorScheme="dark" className="bg-dark bg-black" placement="sticky-top">
                <CContainer fluid>
                    <CNavbarBrand to="/home" component={NavLink}><CImage style={{ width: 50, height: 50}} src={logo}/> Biblioteca VN</CNavbarBrand>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse justify-content-between" visible={visible}>
                        <CNavbarNav className="me-auto mb-2 mb-lg-0">
                            <CNavItem>
                                <CNavLink to="/libros" component={NavLink}>
                                    Libros
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink to="/eventos" component={NavLink}>
                                    Eventos
                                </CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink to="#" component={NavLink}>
                                    <CIcon onClick={() => openCarrito()} icon={cilCart} size="lg" />
                                    <CBadge color="danger" shape="rounded-pill">
                                        {carrito.length}
                                    </CBadge>
                                </CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                        {
                            ( status == 'not-authenticated' ) ? 
                            ( 
                                <div>
                                    <CNavbarNav className="me-auto mb-2 mb-lg-0">
                                        <CNavItem>
                                            <CNavLink to="/auth/registro" component={NavLink}>
                                                Registrate
                                            </CNavLink>
                                        </CNavItem>
                                        <CNavItem>
                                            <CNavLink to="/auth/login" component={NavLink}>
                                                Iniciar Sesión
                                            </CNavLink>
                                        </CNavItem>
                                    </CNavbarNav>
                                </div>
                            ) : 
                            (
                                <div>
                                    <CDropdown variant="btn-group" direction="dropstart">
                                    <CDropdownToggle color="black" placement="bottom-end" className="py-0" caret={false}>
                                        <div className="d-flex align-items-center">
                                            <CAvatar src={usuario} size="md" className="me-2" />
                                            <p className="text-white m-0">{user.nombre_usuario} {user.apellido_pate_usuario}</p>
                                        </div>
                                    </CDropdownToggle>
                                        <CDropdownMenu className="pt-0" placement="bottom-end">
                                            <CDropdownHeader className="bg-light fw-semibold py-2">Configuración</CDropdownHeader>
                                            {
                                                (user.tipo_rol) && (
                                                    <NavLink className="dropdown-item" to="/admin"><CIcon size='xl' customClassName="icon me-2" icon={cilShare} className="me-2" />
                                                        Ir a Admin
                                                    </NavLink>
                                                )
                                            }
                                            {/* <NavLink className="dropdown-item" to="#"><CIcon size='xl' customClassName="icon me-2" icon={cilShare} className="me-2" />
                                                Cambiar contraseña
                                            </NavLink> */}
                                            {
                                                (user.estado_usuario == 3) && (
                                                    <NavLink className="dropdown-item" to="#"><CIcon size='xl' customClassName="icon me-2" icon={cilShare} className="me-2" />
                                                        Renovar membresía
                                                    </NavLink>
                                                )
                                            }
                                            <CDropdownDivider />
                                            <CDropdownItem href="#" onClick={() => onClickLogout()}>
                                                <CIcon icon={cilLockLocked} className="me-2" />
                                                    Cerrar Sesión
                                            </CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </div>
                            )
                        }
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    
    )
}
