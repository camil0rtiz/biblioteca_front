import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody, CButton } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { startEliminarReserva, startListarReservas } from '../../store/prestamos/thunk'
import { FiltroComponent } from '../components/FiltroComponent'
import { ReservasModal } from '../components/modal/ReservasModal'
import { onOpenModal } from '../../store/ui/uiSlice'
import { onIdsReserva } from '../../store/prestamos/reservaSlice'
import Swal from 'sweetalert2'
import { CarritoButton } from '../components/CarritoButton'
import { CarritoReserva } from '../components/CarritoReserva'
import { paginacionOpciones } from "../../helpers/paginacionOpciones"

export const ReservasPages = () => {

    const [ filterText, setFilterText ] = useState('')

    const { reservas, reservaSave } = useSelector(state => state.reserva)

    const { modalOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarReservas(filterText))
        
    }, [reservaSave, filterText])

    const handleEliminarReserva = ({id}) => {

        let estadoReserva = 4

        Swal.fire({
            title: '¿Estás seguro que deseas cancelar la reserva?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo cancelar reserva',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startEliminarReserva({id, estadoReserva}))
                Swal.fire(
                    '¡Felicidades!',
                    'La reserva ha sido cancelada',
                    'success'
                )
            }
        })

    }

    const handleShow = ({id_libro,id_usuario}) => {

        dispatch(onOpenModal())
        dispatch(onIdsReserva({id_libro, id_usuario}))
        
    }

    const columns = [
        
        {
            name: 'Rut usuario',
            selector: row => row.rut_usuario,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre_usuario,
            sortable: true,
        },
        {
            name: 'Apellido paterno',
            selector: row => row.apellido_pate_usuario,
            sortable: true,
        },
        {
            name: 'Libro reservado',
            selector: row => row.titulo_libro,
            sortable: true,
        },
        {
            name: 'Fecha reserva',
            selector: row => row.fecha_reserva,
            sortable: true,
        },
        {
            name: 'Estado reserva',
            selector: row => row.estado_reserva,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className="mx-2">
                                    <CButton color="primary" onClick={() => handleShow(data)}>
                                        Prestar
                                    </CButton>
                                </div>
                                <div>
                                    <CButton color="danger" onClick={() => handleEliminarReserva(data)}>
                                        Cancelar
                                    </CButton>  
                                </div>
                            </div>,
            width: "250px" 
        }, 
    ];

    return (
        <CContainer lg>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Reservas</strong> 
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                title="Tabla libros reservados"
                                responsive
                                pagination
                                columns={columns}
                                data={reservas}
                                highlightOnHover={true}
                                paginationComponentOptions={paginacionOpciones}
                                noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                persistTableHead
                                striped
                                subHeader
                                subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por nombre'} />}
                                actions={ <CarritoButton onExport={reservas} onNombreBoton={'Carrito'} />}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {
                (modalOpen) && <ReservasModal/>
            }
            <CarritoReserva/>
        </CContainer>
    )
}
