import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { startDescargarComprobante, startHabilitarUsuario, startListarUsuariosPendientes } from "../../store/auth/thunk"
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CWidgetStatsF } from '@coreui/react'
import { FiltroComponent } from "../components/FiltroComponent"
import CIcon from "@coreui/icons-react"
import { cilBell, cilMoon, cilSettings, cilUser } from "@coreui/icons"
import Swal from "sweetalert2"

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
        dispatch(startListarUsuariosPendientes())
    },[userSave])

    const handleHabilitar = (id) => {

        let estadoUsuario = 1

        Swal.fire({
            title: '¿Estás seguro de querer habilitar a usuario?',
            text: "¡Asegurate de haber revisado los comprobantes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo habilitar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startHabilitarUsuario(id,estadoUsuario))
                Swal.fire(
                    'Habilitado!',
                    'El usuario ha sido habilitado correctamente correctamente.',
                    'success'
                )
            }
        })

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
            cell: (data) => <>
                                <div>
                                    <CButton onClick={() => handleHabilitar(data.id)} color="primary" >
                                        Habilitar
                                    </CButton>
                                </div> 
                                <div>
                                    <CButton onClick={() => handleHabilitar(data.id)} color="primary" >
                                        Rechazar
                                    </CButton>
                                </div>
                            </> 
        }, 
    ];

    const data = usersPendientes.data

    return (

        <CContainer lg>
            <CRow>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilSettings} size="xl" />}
                    padding={false}
                    title="Libros reservados"
                    value="5"
                    color="primary"
                />
                </CCol>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilUser} size="xl" />}
                    padding={false}
                    title="Entregas vencidas"
                    value="4"
                    color="info"
                />
                </CCol>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                    padding={false}
                    title="Reservas pendientes"
                    value="4"
                    color="warning"
                />
                </CCol>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilBell} size="xl" />}
                    padding={false}
                    title="Usuarios pendientes"
                    value="2"
                    color="danger"
                />
            </CCol>
            </CRow>
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
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Libros reservados</strong> 
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
