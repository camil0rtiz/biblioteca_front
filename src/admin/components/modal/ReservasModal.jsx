import { useEffect } from 'react'
import { CButton } from '@coreui/react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startListarEjemplares } from '../../../store/biblioteca/thunk'
import { onClearLibroReserva } from '../../../store/prestamos/reservaSlice'
import { onCloseModal, onOpenCarritoAdmin } from '../../../store/ui/uiSlice'
import DataTable from 'react-data-table-component'
import { onAgregarEjemplarCarrito } from '../../../store/prestamos/carritoSlice'

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const ReservasModal = () => {

    const { modalOpen } = useSelector(state => state.ui)

    const { libroId } = useSelector(state => state.reserva)

    const { ejemplares } = useSelector(state => state.ejemplar)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarEjemplares(libroId))
        
    }, [libroId])

    const handleClose = () => {

        dispatch(onCloseModal())
        dispatch(onClearLibroReserva())

    }

    const handleCarritoReserva = (data) => {

        dispatch(onOpenCarritoAdmin())
        dispatch(onAgregarEjemplarCarrito(data))
        
    }

    const columns = [
        
        {
            name: 'N° Registro',
            selector: row => row.numero_regis_ejemplar,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_unic_ejemplar,
            sortable: true,
        },
        {
            name: 'Nombre libro',
            selector: row => row.titulo_libro,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div>
                                    <CButton color="primary" onClick={() => handleCarritoReserva(data)}>
                                        Agregar
                                    </CButton>
                                </div>
                            </div>,
            width: "250px" 
        }, 
    ];

    return (
        <Modal size="xl" show={modalOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Ejemplares</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataTable
                    responsive
                    pagination
                    columns={columns}
                    data={ejemplares}
                    highlightOnHover={true}
                    paginationComponentOptions={paginacionOpciones}
                    noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    persistTableHead
                    striped
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
