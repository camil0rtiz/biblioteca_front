import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startBuscarEditorial } from '../../store/biblioteca/thunk'
import DataTable from "react-data-table-component"
import { onOpenModal } from '../../store/ui/uiSlice'
import { EditorialesModal } from '../components/modal/EditorialesModal'
import { onAgregarEditorial } from '../../store/biblioteca/editorialSlice'
import { AccionesTable } from '../components/AccionesTable'
import { FiltroComponent } from '../components/FiltroComponent'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import Swal from 'sweetalert2'

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const EditorialesPages = () => {

    const [ filterText, setFilterText ] = useState('')

    const { editoriales, editorialSave } = useSelector(state => state.editorial)

    const { modalOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startBuscarEditorial(filterText))
    }, [editorialSave, filterText])
    

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre Editorial',
            selector: row => row.nombre_editorial,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className='mx-2'>
                                    <CButton color="warning" onClick={() => handleShow(data)}>
                                        Editar
                                    </CButton>
                                </div>
                                <div>
                                    <CButton color="danger" onClick={() => handleEliminarEditorial(data)}>
                                        Eliminar
                                    </CButton> 
                                </div>
                            </div>,
            width: "250px"  
        }, 
    ];

    const handleShow = ({id, nombre_editorial}) => {

        dispatch(onOpenModal())

        id && dispatch(onAgregarEditorial({id, editorialNombre: nombre_editorial}))

    }

    const handleEliminarEditorial = () => {

        Swal.fire({
            title: '¿Estás seguro de querer eliminar un autor?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'El autor ha sido eliminado correctamente.',
                    'success'
                )
            }
        })

    }

    const data = editoriales.data

    return (

        <>  
            <CContainer lg>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Editoriales</strong> 
                            </CCardHeader>
                            <CCardBody>
                                <DataTable
                                    title="Tabla Editoriales"
                                    responsive
                                    pagination
                                    columns={columns}
                                    data={data}
                                    highlightOnHover={true}
                                    paginationComponentOptions={paginacionOpciones}
                                    noDataComponent={<span className='mt-4' >No se encontro ningún elemento</span>}
                                    fixedHeader
                                    fixedHeaderScrollHeight="600px"
                                    persistTableHead
                                    striped
                                    subHeader
                                    subHeaderComponent={ <FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por nombre'} />}
                                    actions={<AccionesTable onExport={editoriales} onNombreBoton={'Agregar Editorial'}/>}
                                />
                            </CCardBody>
                        </CCard>
                        {
                            (modalOpen) && <EditorialesModal/>
                        }
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}
