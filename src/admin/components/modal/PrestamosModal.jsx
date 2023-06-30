import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { onCloseModalPrestamos } from '../../../store/ui/uiSlice'

export const PrestamosModal = () => {

    const { modalOpenPrestamos } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseModalPrestamos())

    }

    return (
        <Modal size="xs" show={modalOpenPrestamos} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Ejemplares</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
