import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { startDescargarComprobante, startHabilitarUsuario, startListarUsuarios } from "../../store/auth/thunk"
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import { FiltroComponent } from "../components/FiltroComponent"

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const HomePages = () => {

    const [filterText, setFilterText] = useState('')

    const { usersPendientes, userSave } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListarUsuarios(2))
    },[userSave])

    const handleHabilitar = (id) => {

        let estadoUsuario = 1

        dispatch(startHabilitarUsuario(id,estadoUsuario))

    }

    const handleDescargarComprobante = (id) => {

        dispatch(startDescargarComprobante(id))

    }

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
        {
            name: 'Comprobante',
            button: true,
            cell: (data) => <div>
                                <CButton onClick={() => handleDescargarComprobante(data.id)} color="info" >
                                    Descargar 
                                </CButton>
                            </div> 
        }, 
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div>
                                <CButton onClick={() => handleHabilitar(data.id)} color="primary" >
                                    Habilitar
                                </CButton>
                            </div> 
        }, 
    ];

    const data = usersPendientes.data

    return (

        <CContainer lg>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Eventos</strong> 
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                title="Tabla Vecinos Pendientes"
                                responsive
                                pagination
                                columns={columns}
                                data={data}
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
