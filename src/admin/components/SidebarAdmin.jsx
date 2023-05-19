import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { onCloseSidebar } from '../../store/ui/uiSlice'

export const SidebarAdmin = () => {

    const { sidebarAdmin } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleSidebar = () => {

        dispatch(onCloseSidebar())

    }

    return (

        <CSidebar
            position="fixed"
            visible={sidebarAdmin}
        >
            <CSidebarBrand>Biblioteca VN</CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>Panel de control</CNavTitle>
                <CNavItem to='home' component={NavLink}>
                    <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                    Inicio
                </CNavItem>
                            
                {/* <NavLink className="nav-item" to="inicio"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Inicio</NavLink> */}
                <CNavGroup toggler="Usuarios">
                    <NavLink className="nav-link" to="usuarios"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Usuarios Habilitados </NavLink>
                </CNavGroup>
                <CNavGroup toggler="Libros">
                    <NavLink className="nav-link" to="libros"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Libros</NavLink>
                    <NavLink className="nav-link" to="editoriales"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Editoriales</NavLink>
                    <NavLink className="nav-link" to="autores"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Autores</NavLink>
                </CNavGroup>
                <CNavGroup toggler="Eventos">
                    <NavLink className="nav-link" to="eventos"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Eventos</NavLink>
                </CNavGroup>
                <CNavGroup toggler="Reservas">
                    <NavLink className="nav-link" to="reservas"><CIcon customClassName="nav-icon" icon={cilPuzzle} />Reservas</NavLink>
                </CNavGroup>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex" 
                onClick={() => handleSidebar()}
            />
        </CSidebar>
    )
}
