import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Card, Col, Row, Button, ListGroup, Placeholder } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import bibliotecaApi from '../../api/bibliotecaApi'
import { onAgregarLibroCarrito } from '../../store/prestamos/carritoSlice'
import { onOpenCarrito } from '../../store/ui/uiSlice'
import '../../assets/css/navbar.css'

export const DetallesLibroPages = () => {
    
    const [ libro, setLibro ] = useState(null)

    const { id } = useParams()

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    useEffect(() => {
        buscarLibroPorId(id)
    }, [])

    const buscarLibroPorId = async(id) => {
        try {

            const {data} = await bibliotecaApi.get(`libros/buscarId?id_libro=${id}`)

            setLibro(data.data)
                    
        } catch (error) {
        
            console.error(error)
            
        }
    }

    const handleOpenCarrito = (libro) => {

        if(carrito.length < 2){
            
            dispatch(onAgregarLibroCarrito(libro))

        }

        dispatch(onOpenCarrito())
    }

    return (
        <Container className="site-layout-content">
            <Row>
                {
                    (libro) ? (
                        <>
                            <Col md={6} lg={3}>
                                <Card border="light" className='shadow'>
                                    <Card.Img variant="top" src={`http://134.122.124.97/storage/${libro.url}`} />
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Categoría: {libro.categoria_libro}</ListGroup.Item>
                                        <ListGroup.Item>Páginas:</ListGroup.Item>
                                        <ListGroup.Item>Año:</ListGroup.Item> 
                                    </ListGroup>
                                </Card>
                            </Col>
                            <Col md={6} lg={9}>
                                <Row>
                                    <h1>{libro.titulo_libro}- {libro.autor.label[0]}</h1>
                                </Row>
                                <Row>
                                    <Col className='border p-3 mt-3 text-center' lg={3}>
                                        <h6>Quedan 6 unidades</h6>
                                        <ListGroup.Item className="text-center">
                                            <div className="d-grid mt-3">
                                                <Button variant="dark" onClick={() => handleOpenCarrito(libro)}>Agregar <FontAwesomeIcon icon={faCartShopping}/></Button>
                                            </div>
                                        </ListGroup.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <h3 className='mt-3'>Reseña "{libro.titulo_libro}": </h3>
                                    <h5 className='mt-2 text-secondary'>{libro.resena_libro}: </h5>
                                </Row>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={6} lg={3}>
                                <Card border="light" className='shadow'>
                                    {/* <Card.Img variant="top" src={`http://localhost/biblioteca_vn_backend/storage/app/public/${libro.url}`} /> */}
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>
                                            <Placeholder animation="glow">
                                                <Placeholder xs={8} />
                                            </Placeholder>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Placeholder animation="glow">
                                                <Placeholder xs={8} />
                                            </Placeholder>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Placeholder animation="glow">
                                                <Placeholder xs={8} />
                                            </Placeholder>
                                        </ListGroup.Item> 
                                    </ListGroup>
                                </Card>
                            </Col>
                            <Col md={6} lg={9}>
                                <Row>
                                <Placeholder as="h1" animation="glow">
                                    <Placeholder xs={8} size='lg' />
                                </Placeholder>
                                </Row>
                                <Row>
                                    <Col className='border p-3 mt-3 text-center' lg={3}>
                                        <Placeholder as="h6" animation="glow">
                                            <Placeholder xs={8} />
                                        </Placeholder>
                                        <ListGroup.Item className="text-center">
                                            <div className="d-grid mt-3">
                                                <Placeholder animation="glow">
                                                    <Placeholder.Button xs={12} variant="dark"/>
                                                </Placeholder>
                                            </div>
                                        </ListGroup.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Placeholder className='mt-3' as="h3" animation="glow">
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder className='mt-2' as="h5" animation="glow">
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                        <Placeholder xs={4} /> <Placeholder xs={2} /> <Placeholder xs={4}/> 
                                        <Placeholder xs={12} />
                                        <Placeholder xs={6} /> <Placeholder xs={4}/> 
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={2} /> <Placeholder xs={1} />
                                        <Placeholder xs={8} /> <Placeholder xs={4} />
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                        <Placeholder xs={6} /> <Placeholder xs={2} /> <Placeholder xs={3} />
                                    </Placeholder>
                                </Row>
                            </Col>
                        </>
                    )
                }
            </Row>
        </Container>
    
    )
}
