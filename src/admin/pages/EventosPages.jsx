import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { EventosModal } from '../components/EventosModal'
import { onOpenModal } from '../../store/ui/uiSlice'
import { AccionesTable } from '../components/AccionesTable'
import { FiltroComponent } from '../components/FiltroComponent'
import { startListarEventos } from '../../store/biblioteca/thunk'
import { onAgregarEvento } from '../../store/biblioteca/eventoSlice'

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const EventosPages = () => {

    const [ filterText, setFilterText ] = useState('')

    const { modalOpen } = useSelector(state => state.ui)

    const { eventos, eventoSave } = useSelector(state => state.evento)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarEventos())
        
    }, [eventoSave])

    const columns = [
        {
            name: 'Título',
            selector: row => row.titulo_evento,
            sortable: true,
        },
        {
            name: 'Tipo',
            selector: row => row.tipo_categoria,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: row => row.descripcion_evento,
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
                                    <CButton color="danger">
                                        Eliminar
                                    </CButton> 
                                </div>
                            </div>,
            width: "250px"  
        }, 
    ];

    const handleShow = ({id, titulo_evento, descripcion_evento, id_categoria, tipo_categoria}) => {

        dispatch(onOpenModal())

        if(id) {

            let eventoTipo = []

            eventoTipo.push({
                'value': id_categoria,
                'label': tipo_categoria
            })

            dispatch(onAgregarEvento({id, eventoTitulo: titulo_evento, eventoTipo, eventoDescripcion: descripcion_evento }))
        
        }

    }

    const data = eventos.data

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
                                title="Tabla Eventos y Noticias"
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
                                subHeaderComponent={ <FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por titulo'} />}
                                actions={<AccionesTable onExport={eventos} onNombreBoton={'Agregar Evento'}/>}
                            />
                        </CCardBody>
                    </CCard>
                    {
                        (modalOpen) && <EventosModal/>
                    }
                </CCol>
            </CRow>
        </CContainer>
    )
}
