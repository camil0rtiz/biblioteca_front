import { useState } from 'react'
import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody, CButton } from '@coreui/react'
import { FiltroComponent } from '../components/FiltroComponent'
import DataTable from 'react-data-table-component'

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const PrestamosPages = () => {

    const [ filterText, setFilterText ] = useState('')

    const columns = [
        
        {
            name: 'Rut usuario',
            // selector: row => row.rut_usuario,
            sortable: true,
        },
        {
            name: 'Nombre',
            // selector: row => row.nombre_usuario,
            sortable: true,
        },
        {
            name: 'Apellido paterno',
            // selector: row => row.apellido_pate_usuario,
            sortable: true,
        },
        {
            name: 'Libro reservado',
            // selector: row => row.titulo_libro,
            sortable: true,
        },
        {
            name: 'Fecha reserva',
            // selector: row => row.fecha_reserva,
            sortable: true,
        },
        {
            name: 'Estado reserva',
            // selector: row => row.estado_reserva,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className="mx-2">
                                    <CButton color="primary">
                                        Prestar
                                    </CButton>
                                </div>
                                <div>
                                    <CButton color="danger">
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
                            <strong>Prestamos</strong> 
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                title="Tabla libros prestados"
                                responsive
                                pagination
                                columns={columns}
                                // data={reservas}
                                highlightOnHover={true}
                                paginationComponentOptions={paginacionOpciones}
                                noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                persistTableHead
                                striped
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
