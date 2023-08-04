import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody, CButton } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { startEliminarReserva, startListarReservas } from '../../store/prestamos/thunk'
import { BuscadorComponent } from '../components/BuscadorComponent'
import Swal from 'sweetalert2'
import { CarritoButton } from '../components/CarritoButton'
import { CarritoReserva } from '../components/CarritoReserva'
import { paginacionOpciones } from "../../helpers/paginacionOpciones"
import { ExpandedReservas } from '../components/ExpandedReservas'

export const ReservasPages = () => {

    const [searchRut, setSearchRut] = useState('');

    const { reservas, reservaSave } = useSelector(state => state.reserva)

    const dispatch = useDispatch()

    useEffect(() => {

        if (reservaSave || searchRut) {
            dispatch(startListarReservas(searchRut));
        }

        dispatch(startListarReservas());
        
    }, [reservaSave, searchRut])

    const handleEliminarReserva = ({id}) => {

        let estadoReserva = 3

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
            selector: row => new Date(row.fecha_reserva).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }),
            sortable: true,
        },
        {
            name: 'Estado reserva',
            selector: row => (
                <span>
                    {
                        row.estado_reserva == "1" ? (
                            'Pendiente'
                        ) : row.estado_reserva == "2" ? (
                            'Reservado'
                        ) : (
                            null
                        )
                    }
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
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
                                title="Tabla usuarios con reserva de libros"
                                responsive
                                pagination
                                columns={columns}
                                data={reservas}
                                highlightOnHover={true}
                                paginationComponentOptions={paginacionOpciones}
                                noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                // persistTableHead
                                striped
                                expandableRows
                                expandableRowsComponent={ExpandedReservas}
                                subHeader
                                subHeaderComponent={<BuscadorComponent onFilter={setSearchRut} onPlaceholder={'Buscar usuario por rut'} />}
                                actions={ <CarritoButton onExport={reservas} onNombreBoton={'Carrito'} />}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CarritoReserva/>
        </CContainer>
    )
}
