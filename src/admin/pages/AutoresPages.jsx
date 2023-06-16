import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import DataTable from "react-data-table-component"
import { startListarAutores } from '../../store/biblioteca/thunk'
import { AutoresModal } from '../components/modal/AutoresModal'
import { onOpenModal } from '../../store/ui/uiSlice'
import { onAgregarAutor } from '../../store/biblioteca/autorSlice'
import { FiltroComponent } from '../components/FiltroComponent'
import { AccionesTable } from '../components/AccionesTable'
import Swal from 'sweetalert2'

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const AutoresPages = () => {

    const [ filterText, setFilterText ] = useState('')

    const { autores, autorSave } = useSelector(state => state.autor)

    const { modalOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarAutores())
        
    }, [autorSave])

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Nombre Autor',
            selector: row => row.nombre_autor,
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
                                    <CButton color="danger" onClick={() => handleEliminarAutor(data)}>
                                        Eliminar
                                    </CButton>
                                </div>
                            </div>,
            width: "250px" 
        }, 
    ];

    const handleShow = ({id, nombre_autor}) => {

        dispatch(onOpenModal())

        id && dispatch(onAgregarAutor({id, autorNombre: nombre_autor}))
    
    }

    const handleEliminarAutor = ({id}) => {

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

    const data = autores.data

    return (
        <>  
            <CContainer lg>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Autores</strong> 
                            </CCardHeader>
                            <CCardBody>
                                <DataTable
                                    title="Tabla Autores"
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
                                    actions={ <AccionesTable onExport={autores} onNombreBoton={'Agregar Autor'} />}
                                />
                            </CCardBody>
                        </CCard>
                        {
                            (modalOpen) && <AutoresModal/>
                        }
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}
