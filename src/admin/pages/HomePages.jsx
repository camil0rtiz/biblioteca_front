import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { startEstadisticas, startHabilitarUsuario, startListarUsuariosPendientes, startRechazarComprobante } from "../../store/auth/thunk"
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CWidgetStatsF } from '@coreui/react'
import { FiltroComponent } from "../components/FiltroComponent"
import CIcon from "@coreui/icons-react"
import { cilBell, cilMoon, cilSettings, cilUser } from "@coreui/icons"
import Swal from "sweetalert2"
import { ComprobantesModal } from "../components/modal/ComprobantesModal"
import { onOpenModal } from "../../store/ui/uiSlice"
import { onIdUserComprobante } from "../../store/auth/userSlice"
import { paginacionOpciones } from "../../helpers/paginacionOpciones"

export const HomePages = () => {

    const [filterText, setFilterText] = useState('')

    const { modalOpen } = useSelector(state => state.ui)

    const { usersPendientes, userSave, estaditicas } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListarUsuariosPendientes(filterText))
    },[userSave, filterText])

    useEffect(() => {
        dispatch(startEstadisticas())
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

    const handleRechazar = (id) => {

        let estadoUsuario = 3

        Swal.fire({
            title: '¿Estás seguro de querer rechazar los comprobantes del usuario?',
            text: "¡Asegurate de haber revisado los comprobantes!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo rechazar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRechazarComprobante(id, estadoUsuario))
                Swal.fire(
                    'Rechazado!',
                    'El usuario ha sido rechazado.',
                    'success'
                )
            }
        })

    }

    const handleShow = (data) => {

        dispatch(onOpenModal())
        dispatch(onIdUserComprobante(data.archivos))

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
            name: 'Acciones',
            button: true,
            cell: (data) => 
                            <div className='d-flex justify-content-between'>
                                <div className="mx-1">
                                    <CButton onClick={() => handleShow(data)} color="info">
                                        Comprobantes
                                    </CButton>
                                </div>
                                <div className="mx-1">
                                    <CButton onClick={() => handleHabilitar(data.id)} color="primary">
                                        Habilitar
                                    </CButton>
                                </div>
                                <div className="mx-1">
                                    <CButton onClick={() => handleRechazar(data.id)} color="danger">
                                        Rechazar
                                    </CButton>
                                </div>
                            </div>,
            width: "400px" 
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
                    value={estaditicas.numero_libros_reservados}
                    color="primary"
                />
                </CCol>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilUser} size="xl" />}
                    padding={false}
                    title="Prestamos vencidos"
                    value={estaditicas.prestamos_vencidos}
                    color="info"
                />
                </CCol>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilMoon} size="xl" />}
                    padding={false}
                    title="Usuarios Vencidos"
                    value={estaditicas.cantidad_usuarios_vencidos}
                    color="warning"
                />
                </CCol>
                <CCol xs={12} sm={6} lg={3}>
                <CWidgetStatsF
                    className="mb-3"
                    icon={<CIcon width={24} icon={cilBell} size="xl" />}
                    padding={false}
                    title="Usuarios pendientes"
                    value={estaditicas.cantidad_usuarios_pendientes}
                    color="danger"
                />
            </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Vecinos pendientes</strong> 
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
                                subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por rut o nombre'} />}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {
                (modalOpen) && <ComprobantesModal/>
            }
        </CContainer>
        
    )
}
