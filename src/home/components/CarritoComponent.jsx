import { useDispatch, useSelector } from 'react-redux'
import { Offcanvas, ListGroup, Button } from 'react-bootstrap'
import { onCloseCarrito } from '../../store/ui/uiSlice'
import { Image, Card, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBook, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { onEliminarLibroCarrito } from '../../store/prestamos/carritoSlice'
import { useNavigate } from 'react-router-dom'

export const CarritoComponent = () => {

    const [ show, setShow ] = useState(true);

    const { carritoOpen } = useSelector(state => state.ui)

    const { carrito } = useSelector(state => state.carrito)
    
    const dispatch = useDispatch()
    
    const navigate = useNavigate()   

    const handleClose = () => {

        dispatch(onCloseCarrito())

    }

    const handleEliminarLibro = (id) => {

        dispatch(onEliminarLibroCarrito(id))

    }

    const handleReserva = () => {

        dispatch(onCloseCarrito())

        navigate('/reservas')

    }

    return (
        <>
            <Offcanvas show={carritoOpen} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title><FontAwesomeIcon icon={faCartShopping}/> Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {carrito.map((cart) => (
                        <ListGroup key={cart.id} variant="flush">
                            <ListGroup.Item>
                                <div className="p-2 row shadow border-3">
                                    <div className="col-sm-4 col-md-4">
                                        <Image src={`http://134.122.124.97/storage/${cart.url}`} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-sm-8 col-md-8">
                                        <Card border="light"  className='h-100'>
                                            <Card.Header  className="text-center">{cart.titulo_libro}</Card.Header>
                                            <Card.Body className='d-flex justify-content-center align-items-center'>
                                                <Button onClick={() => handleEliminarLibro(cart.id)} variant="danger">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
        
                    {
                        (carrito.length > 0) ? (
                            <div className="d-grid mt-4">
                                <Button variant="dark" size="lg" onClick={() => handleReserva()}><FontAwesomeIcon icon={faBook}/> Reservar</Button>
                            </div>
                        ): (<p>El carrito está vacio</p>)
                    }
                    
                    {
                        (show) && (
                            <Alert className='mt-4' variant="info" onClose={() => setShow(false)} dismissible>
                                <p>
                                    <FontAwesomeIcon icon={faCircleInfo} />Estimado vecino, recuerde que puede reservar una cantidad máxima de 2 libros.
                                </p>
                            </Alert>
                        )
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
