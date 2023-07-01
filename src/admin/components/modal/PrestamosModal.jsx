import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, ListGroup } from 'react-bootstrap'
import { onCloseModalPrestamos } from '../../../store/ui/uiSlice'

export const PrestamosModal = () => {

    const { modalPrestamos } = useSelector(state => state.carrito)

    console.log(modalPrestamos);

    const { modalOpenPrestamos } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseModalPrestamos())

    }

    return (
        <Modal size="xs" show={modalOpenPrestamos} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Prestar libros</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="light">
                    {modalPrestamos.map((cart) => (
                        <ListGroup.Item  key={cart.id} className='mb-2 d-flex justify-content-between align-items-center'>
                            <div>
                                <div>
                                    {cart.titulo_libro}
                                </div>
                                <div>
                                    {cart.dewey_unic_ejemplar}
                                </div>
                            </div>
                            <div>
                                <Button variant='danger' shape="rounded-pill">Eliminar</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    Prestar
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
