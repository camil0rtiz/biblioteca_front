import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody, CButton } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { startDevolucionPrestamo, startListarPrestamos, startRenovarPrestamo } from '../../store/prestamos/thunk'
import { paginacionOpciones } from "../../helpers/paginacionOpciones"
import { ExpandedPrestamos } from '../components/ExpandedPrestamos'
import { BuscadorComponent } from '../components/BuscadorComponent'
import Swal from 'sweetalert2'

export const PrestamosPages = () => {
    
    const [searchRut, setSearchRut] = useState('');

    const { prestamos, prestamoSave } = useSelector(state => state.prestamo)

    const dispatch = useDispatch()

    useEffect(() => {

        if (searchRut || prestamoSave) {

            dispatch(startListarPrestamos(searchRut))
            return

        }

        dispatch(startListarPrestamos())
        
    }, [searchRut, prestamoSave])

    const handleDevolucionLibro = ({id, id_ejemplar, id_libro}) => {

        Swal.fire({
            title: '¿Estás seguro de querer eliminar un libro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDevolucionPrestamo({id, id_ejemplar, id_libro}))
                Swal.fire(
                    '¡Eliminado!',
                    'El libro ha sido eliminado correctamente.',
                    'success'
                )
            }
        })

    }

    const handleRenovarPrestamo = ({id}) => {

        Swal.fire({
            title: '¿Estás seguro de querer eliminar un libro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRenovarPrestamo({id}))
                Swal.fire(
                    '¡Eliminado!',
                    'El libro ha sido eliminado correctamente.',
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
            name: 'Nombre usuario',
            selector: row => row.nombre_usuario,
            sortable: true,
        },
        {
            name: 'Fecha prestamo',
            selector: row => row.fecha_prestamo,
            sortable: true,
        },
        {
            name: 'Fecha devolución',
            selector: row => row.fecha_entre_prestamo,
            sortable: true,
        },
        {
            name: 'Estado prestamo',
            selector: row => row.estado_prestamo,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className="mx-2">
                                    <CButton color="danger" onClick={() => handleDevolucionLibro(data)}>
                                        Devolución
                                    </CButton>
                                </div>
                                <div>
                                    <CButton color="primary" onClick={() => handleRenovarPrestamo(data)}>
                                        Renovar
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
                            <strong>Prestamos</strong> 
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                title="Tabla libros prestados"
                                responsive
                                pagination
                                columns={columns}
                                data={prestamos}
                                highlightOnHover={true}
                                paginationComponentOptions={paginacionOpciones}
                                noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                persistTableHead
                                striped
                                expandableRows
                                expandableRowsComponent={ExpandedPrestamos}
                                subHeader
                                subHeaderComponent={<BuscadorComponent onFilter={setSearchRut} onPlaceholder={'Buscar usuario por rut'} />}
                                // actions={ <AccionesTable onExport={usersPendientes} onNombreBoton={'Agregar Autor'} />}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}
