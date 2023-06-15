import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CContainer, CHeader, CDropdownDivider ,CHeaderDivider, CHeaderNav, CHeaderToggler, CNavLink, CNavItem, CBreadcrumb, CBreadcrumbItem, CDropdown, CDropdownToggle, CAvatar, CDropdownMenu, CDropdownHeader, CDropdownItem, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilMenu, cilShare, cilCommentSquare, cilEnvelopeOpen, cilLockLocked, cilTask} from '@coreui/icons'
import { onCloseSidebar, onOpenCarritoAdmin } from '../../../store/ui/uiSlice'
import { startLogout } from '../../../store/auth/thunk'
import usuario from './../../../assets/img/2.jpg'

export const HeaderAdmin = () => {
    
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const location = useLocation()

    const rutaActual = location.pathname.split('/')

    // const ruta = rutaActual[2].charAt(0).toUpperCase() + rutaActual[2].slice(1);

    const handleSidebar = () => {

        dispatch(onCloseSidebar())

    }

    const handleOpenCarrito = () => {

        dispatch(onOpenCarritoAdmin())

    }

    const handleLogout = () => {

        dispatch(startLogout())

        setTimeout(() => {
            
            navigate('/')

        }, 1500);

    }

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="-ps1"
                    onClick={() => handleSidebar()}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderNav className="d-none d-md-flex me-auto">
                    <CNavItem>
                        <CNavLink to="home" component={NavLink}>Inicio</CNavLink>
                    </CNavItem>
                    {
                        ((user.tipo_rol == 'Bibliotecario') || (user.tipo_rol == 'SuperAdmin')) && (
                            <>
                                <CNavItem>
                                    <CNavLink to="usuarios" component={NavLink}>Usuarios</CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink to="reservas" component={NavLink}>Reservas</CNavLink>
                                </CNavItem>
                            </>
                        )
                    }
                </CHeaderNav>
                <CHeaderNav>
                    <CNavItem>
                        <CNavLink href="#"  onClick={() => handleOpenCarrito()}><CIcon icon={cilCart} size="lg" /></CNavLink>
                    </CNavItem>
                    {/* <CNavItem>
                        <CNavLink href="#"><CIcon icon={cilList} size="lg" /></CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#"><CIcon icon={cilEnvelopeOpen} size="lg" /></CNavLink>
                    </CNavItem> */}
                </CHeaderNav>
                <CHeaderNav className="ms-3">
                    <CDropdown variant="nav-item">
                        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                            <CAvatar src={usuario} size="md"/> {user.nombre_usuario} {user.apellido_pate_usuario}
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                            <NavLink className="dropdown-item" to="/"><CIcon customClassName="icon me-2" icon={cilShare} className="me-2" />
                                Ir a menú
                            </NavLink>
                            <NavLink className="dropdown-item" to="/"><CIcon customClassName="icon me-2" icon={cilEnvelopeOpen} className="me-2" />
                                Messages
                            </NavLink>
                            <NavLink className="dropdown-item" to="/"><CIcon customClassName="icon me-2" icon={cilTask} className="me-2" />
                                Tasks
                            </NavLink>
                            <NavLink className="dropdown-item" to="/"><CIcon customClassName="icon me-2" icon={cilCommentSquare} className="me-2" />
                                Comments
                            </NavLink>
                            <CDropdownDivider />
                            <CDropdownItem href="#" onClick={() => handleLogout()}>
                                <CIcon icon={cilLockLocked} className="me-2" />
                                Cerrar Sesión
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
            <CContainer fluid>
                <CBreadcrumb className='"m-0 ms-2 mt-3'>
                    <CBreadcrumbItem to='home' component={Link}>Home</CBreadcrumbItem>
                    {/* {
                        (ruta != 'Home')&&
                        (
                            <CBreadcrumbItem active>{ruta}</CBreadcrumbItem>
                        )
                    } */}
                </CBreadcrumb>
            </CContainer>
        </CHeader>
    )
}
