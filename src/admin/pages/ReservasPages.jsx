import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody } from '@coreui/react'
import DataTable from 'react-data-table-component';
import { FiltroComponent } from '../components/FiltroComponent';

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const ReservasPages = () => {

    const columns = [
    
        {
            name: 'Rut',
            selector: row => row.rut_usuario,
            sortable: true,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre_usuario,
            sortable: true,
        },
        {
            name: 'Apellido Paterno',
            selector: row => row.apellido_pate_usuario,
            sortable: true,
        },
        {
            name: 'Correo',
            selector: row => row.email,
            sortable: true,
        },
        // {
        //     name: 'Comprobante',
        //     button: true,
        //     cell: (data) => <div>
        //                         <CButton onClick={() => handleDescargarComprobante(data.id)} color="info" >
        //                             Descargar 
        //                         </CButton>
        //                     </div> 
        // }, 
        // {
        //     name: 'Acciones',
        //     button: true,
        //     cell: (data) => <div>
        //                         <CButton onClick={() => handleHabilitar(data.id)} color="primary" >
        //                             Habilitar
        //                         </CButton>
        //                     </div> 
        // }, 
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
                                // data={data}
                                highlightOnHover={true}
                                paginationComponentOptions={paginacionOpciones}
                                noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                fixedHeader
                                fixedHeaderScrollHeight="600px"
                                persistTableHead
                                striped
                                subHeader
                                // subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por nombre'} />}
                                // actions={ <AccionesTable onExport={usersPendientes} onNombreBoton={'Agregar Autor'} />}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}
