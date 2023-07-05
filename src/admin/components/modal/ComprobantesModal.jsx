import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { onCloseModal } from '../../../store/ui/uiSlice'
import { startDescargarComprobante } from '../../../store/auth/thunk'
import { onClearIdUserComprobante } from '../../../store/auth/userSlice'

export const ComprobantesModal = () => {

    const { modalOpen } = useSelector(state => state.ui)

    const { idsComprobantes } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseModal())
        dispatch(onClearIdUserComprobante())
    
    }

    const handleComproTransferencia = ({id}) => {

        dispatch(startDescargarComprobante(id))

    }

    const handleComproDomicilio = ({id}) => {

        dispatch(startDescargarComprobante(id))

    }


    return (
        <Modal size="xs" show={modalOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Comprobantes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-grid">
                    <Button variant="primary" className="btn-block" onClick={() => handleComproTransferencia(idsComprobantes[0])}>
                        Comprobante de pago
                    </Button>
                </div>
                <div className="d-grid mt-2">
                    <Button variant="primary" className="btn-block" onClick={() => handleComproDomicilio(idsComprobantes[1])}>
                        Comprobante de domicilio
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
