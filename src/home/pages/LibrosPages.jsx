
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container, Card, Col, Row, Button, ListGroup, Breadcrumb, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faFilter} from '@fortawesome/free-solid-svg-icons'
import bibliotecaApi from "../../api/bibliotecaApi"
import { onOpenCarrito, onOpenFiltros } from "../../store/ui/uiSlice"
import { FiltrosComponent } from "../components/FiltrosComponent"
import { onAgregarLibroCarrito } from "../../store/prestamos/carritoSlice"
import '../../assets/css/navbar.css'
import { PaginadorComponent } from "../components/PaginadorComponent"

export const LibrosPages = () => {

    const [ libros, setLibros ] = useState([])

    const [cantPaginas, setCantPaginas] = useState(0)

    const [numPagina, setNumPagina] = useState(0)

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    useEffect(() => {
        listarLibros()
    }, [numPagina])

    const listarLibros = async() => {
        try {

            const {data} = await bibliotecaApi.get(`libros/listar?page=${numPagina}`)

            setLibros(data.data)
        
            setCantPaginas(data.data2.last_page)
        
        } catch (error) {
        
            console.error(error)
            
        }
    }

    const openCarrito = (libro) => {

        if(carrito.length < 2){
            
            dispatch(onAgregarLibroCarrito(libro))

        }

        // localStorage.setItem('carrito', JSON.stringify(libro)), 

        dispatch(onOpenCarrito())
    }

    const openFiltros = () => {
        
        dispatch(onOpenFiltros())
        
    }

    return (
        <>
            <Container className="site-layout-content" fluid="lg">
                <Row >
                    <div className="d-flex justify-content-center">
                        <Breadcrumb>
                            <Breadcrumb.Item linkAs={Link} linkProps={{to:'/home'}} >Home</Breadcrumb.Item>
                            <Breadcrumb.Item linkAs={Link} linkProps={{to:'/libros'}}>Libros</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </Row>
                <Row>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3>Libros</h3>
                        </div>
                        <div>
                            <Button variant="warning" onClick={() => openFiltros()}><FontAwesomeIcon icon={faFilter}/> Filtros</Button>
                        </div>
                    </div>
                </Row>
                <Row xs={2} sm={3} md={4} lg={4} xl={5} className="mt-1 g-4">
                    {libros.map((libro) => (
                        <Col key={libro.id}>
                            <Card border="light" className="shadow">
                                <Card.Img style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} />
                                <Card.Body>
                                    <Card.Title className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></Card.Title>
                                    <Card.Subtitle className="text-muted text-center">{libro.autor.label[0]}</Card.Subtitle>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item className="text-center"><Button variant="dark" className="text-center" onClick={() => openCarrito(libro)}><FontAwesomeIcon icon={faCartShopping}/> Agregar</Button></ListGroup.Item>
                                </ListGroup>     
                                <Card.Footer className="text-center">
                                    {
                                        (libro.cantidad_ejemplares != 0) ? 
                                        (
                                            <small className="text-muted">
                                                Disponibles: {libro.cantidad_ejemplares}
                                            </small>
                                        ):
                                        (
                                            <small>
                                                <Badge bg="danger">Agotado</Badge>
                                            </small>
                                        )
                                    }
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <PaginadorComponent cantPaginas={cantPaginas} setNumPagina={setNumPagina}/>
                </Row>
                <FiltrosComponent/>
            </Container>
        </>
    )
}
