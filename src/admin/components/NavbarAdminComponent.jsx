import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap'
import { startLogout } from '../../store/auth/thunk'
import logo from '../../assets/img/bcnv.jpg'

export const NavbarAdminComponent = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch(startLogout())

        setTimeout(() => {
            
            navigate('/')

        }, 1500);

    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
            <Navbar.Brand as={Link} to='home'><Image style={{ width: 50, height: 50}} src={logo}/> BCNV </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Usuarios" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to='usuarios'>Usuarios</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Libros" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to='libros'>Libros</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='editoriales'>Editoriales</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to='autores'>Autores</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Eventos" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to='eventos'>Eventos</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Reservas" id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to='reservas'>Reservas</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Button onClick={handleLogout} variant="danger">Cerrar Sesión</Button>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
