import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, ListGroup, Figure, Button } from "react-bootstrap"
import '../../assets/css/navbar.css'
import { startReservarLibro } from "../../store/prestamos/thunk"

export const ReservaLibroPage = () => {

    const { user } = useSelector(state => state.auth)

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const handleReserva = () => {

        let librosReservados = []

        carrito.map((cart)=> {
            librosReservados.push(cart.id)
        })

        dispatch(startReservarLibro(librosReservados, user.id))

    }

    return (
        <>
            <Container className="site-layout-content">
                <Row>
                    <Col>
                        <ListGroup>
                            {carrito.map((cart) => (
                                <ListGroup.Item key={cart.id}>
                                    <Row>
                                        <Col>
                                            <Figure>
                                                <Figure.Image
                                                    width={171}
                                                    height={180}
                                                    alt="171x180"
                                                    src={`http://134.122.124.97/storage/${cart.url}`}
                                                />
                                            </Figure>
                                        </Col>
                                        <Col>
                                            <h1>{cart.titulo_libro}</h1>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col lg="3">
                        <div className="d-grid mt-4">
                            <Button onClick={() => handleReserva()} variant="dark" size="lg" >Reservar </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        
        </>
    )
}
