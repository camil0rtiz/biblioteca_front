import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import { UsuariosModal } from '../components/modal/UsuariosModal'
import { onOpenModal  } from '../../store/ui/uiSlice'
import { startListarUsuariosHabilitados } from '../../store/auth/thunk'
import { onAgregarUser } from '../../store/auth/userSlice'
import { FiltroComponent } from "../components/FiltroComponent"
import { AccionesTable } from '../components/AccionesTable'
import Swal from 'sweetalert2'

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const UsuariosPages = () => {
    
    const [ filterText, setFilterText ] = useState('')

    const { usersHabilitados, userSave } = useSelector(state => state.user)

    const { modalOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListarUsuariosHabilitados())
    }, [userSave])
    
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
            name: 'Rol',
            selector: row => (
                <span className="text-primary">
                    {
                        (row.tipo_rol) ? row.tipo_rol : 'Vecino'
                    }
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className="mx-2">
                                    <CButton color="warning" onClick={() => handleShow(data)} disabled={(data.id_rol == 1 ? true : false)}>
                                        Editar
                                    </CButton>
                                </div>
                                <div>
                                    <CButton color="danger" disabled={(data.id_rol == 1 ? true : false)} onClick={() => handleEliminarUsuario(data)}>
                                        Eliminar
                                    </CButton>  
                                </div>
                            </div>,
            width: "250px"  
        }, 
    ];

    const handleShow = ({id,rut_usuario, nombre_usuario, apellido_pate_usuario, apellido_mate_usuario, calle_usuario, numero_tele_usuario ,email, numero_casa_usuario,fecha_naci_usuario, id_rol,tipo_rol}) => {

        dispatch(onOpenModal())
        
        if(id){

            let registroTipoRol = []

            if(id_rol){

                registroTipoRol.push({
                    'value': id_rol,
                    'label': tipo_rol
                })

            }else{
                registroTipoRol.push({
                    'value': '',
                    'label': ''
                })

            }

            dispatch(onAgregarUser({id,
                registroRut: rut_usuario, 
                registroNombre: nombre_usuario,
                registroApellidoPaterno: apellido_pate_usuario,
                registroApellidoMaterno: apellido_mate_usuario,
                registroNumeroCelular: numero_tele_usuario,
                registroCorreo: email,
                registroDireccion: calle_usuario,
                registroNumCasa: numero_casa_usuario,
                registroFechaNacimiento: fecha_naci_usuario,
                registroTipoRol
            }))

        }

    }

    const handleEliminarUsuario = ({id}) => {

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
                Swal.fire(
                    'Habilitado!',
                    'El usuario ha sido habilitado correctamente correctamente.',
                    'success'
                )
            }
        })

    }

    const data = usersHabilitados.data

    return (
        <CContainer lg>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Usuarios</strong> 
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                title="Tabla Usuarios"
                                responsive
                                pagination
                                columns={columns}
                                data={data}
                                highlightOnHover={true}
                                paginationComponentOptions={paginacionOpciones}
                                noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                fixedHeader
                                persistTableHead
                                fixedHeaderScrollHeight="600px"
                                subHeader
                                subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por rut, nombre, rol'} />}
                                actions={ <AccionesTable onExport={usersHabilitados} onNombreBoton={'Agregar Usuario'} />}
                            />
                        </CCardBody>
                    </CCard>
                    {
                        (modalOpen) && <UsuariosModal/>
                    }
                </CCol>
            </CRow>
        </CContainer>
        
    )
}
