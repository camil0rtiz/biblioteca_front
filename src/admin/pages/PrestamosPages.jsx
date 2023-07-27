import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody, CButton } from '@coreui/react'
import { FiltroComponent } from '../components/FiltroComponent'
import DataTable from 'react-data-table-component'
import { startDevolucionPrestamo, startListarPrestamos } from '../../store/prestamos/thunk'
import { paginacionOpciones } from "../../helpers/paginacionOpciones"
import { ExpandedPrestamos } from '../components/ExpandedPrestamos'

export const PrestamosPages = () => {
    
    const [ filterText, setFilterText ] = useState('')

    const { prestamos } = useSelector(state => state.prestamo)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarPrestamos())
        
    }, [])

    const handleDevolucionLibro = ({id, id_ejemplar, id_libro}) => {

        dispatch(startDevolucionPrestamo({id, id_ejemplar, id_libro}))

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
            name: 'Título libro',
            selector: row => row.titulo_libro,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_unic_ejemplar,
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
        // {
        //     name: 'Acciones',
        //     button: true,
        //     cell: (data) => <div className='d-flex justify-content-between'>
        //                         <div className="mx-2">
        //                             <CButton color="primary" onClick={() => handleDevolucionLibro(data)}>
        //                                 Devolución
        //                             </CButton>
        //                         </div>
        //                     </div>,
        //     width: "250px" 
        // }, 
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
                                subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por nombre'} />}
                                // actions={ <AccionesTable onExport={usersPendientes} onNombreBoton={'Agregar Autor'} />}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}
