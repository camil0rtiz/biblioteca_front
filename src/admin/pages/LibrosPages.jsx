import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import { startListarLibros } from "../../store/biblioteca/thunk";
import { onOpenModal, onOpenModalEjemplar } from "../../store/ui/uiSlice"
import { LibrosModal } from '../components/LibrosModal'
import { ExpandedComponent } from '../components/ExpandedComponent'
import { onAgregarLibro } from "../../store/biblioteca/libroSlice"
import { EjemplaresModal } from "../components/EjemplaresModal"
import { onAgregarEjemplar } from "../../store/biblioteca/ejemplarSlice"
import { FiltroComponent } from "../components/FiltroComponent"
import { AccionesTable } from "../components/AccionesTable"

const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
}

export const LibrosPages = () => {

    const [filterText, setFilterText] = useState('')

    const [totalRows, setTotalRows] = useState(0)

	const [perPage, setPerPage] = useState(10)

    const { libros, libroSave } = useSelector(state => state.libro)

    const { modalOpen, modalOpenEjemplar } = useSelector(state => state.ui)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startListarLibros())
    }, [libroSave])

    const handleShow = ({id, titulo_libro, isbn_libro, dewey_libro, categoria_libro, numero_pagi_libro, anio_publi_libro, resena_libro, autor}) => {

        dispatch(onOpenModal())

        let autorLibro = []
        
        if(id){

            for (let i = 0; i < autor.value.length; i++) {
            
                autorLibro.push({
                    value: autor.value[i], 
                    label: autor.label[i],
                })
            }

            autor.value == '' && (autorLibro = []),
            
            dispatch(onAgregarLibro({id, tituloLibro: titulo_libro, isbnLibro: isbn_libro, deweyLibro: dewey_libro, categoriaLibro: categoria_libro, 
                                    numPagLibro: numero_pagi_libro, anioPublicacionLibro: anio_publi_libro, resenaLibro: resena_libro, autorLibro}))

        }
    }

    const columns = [

        {
            name: 'Título libro',
            selector: row => row.titulo_libro,
            sortable: true,
        },
        {
            name: 'ISBN',
            selector: row => row.isbn_libro,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_libro,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad_ejemplares,
            sortable: true,
            width: "200px"  
        },
        {
            name: 'Portada',
            grow: 0,
		    cell: (data) => <img height="100px" width="80px" src={`http://134.122.124.97/storage/${data.url}`}/>,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className="mx-2">
                                    <CButton color="info" onClick={() => handleShowEjemplar(data)}>
                                        Agregar Ejemplar
                                    </CButton>
                                </div>
                                <div className="mx-2">
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
            width: "400px"  
        }, 
    ];

    const handleShowEjemplar = ({id, dewey_libro}) => {

        dispatch(onOpenModalEjemplar())

        dispatch(onAgregarEjemplar({id,'deweyLibro':dewey_libro}))
        
    }

    const data = libros.data //los datos que van a estar en la datatable

    return (
        <>
            <CContainer lg>
                <CRow>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Libros</strong> 
                            </CCardHeader>
                            <CCardBody>
                                <DataTable
                                    title='Tabla Libros'
                                    responsive
                                    columns={columns}
                                    data={data}
                                    highlightOnHover={true}
                                    noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                    fixedHeader
                                    fixedHeaderScrollHeight="600px"
                                    persistTableHead
                                    striped
                                    // progressPending={pending}
                                    // progressComponent={<CustomLoader />}
                                    expandableRows
                                    expandableRowsComponent={ExpandedComponent}
                                    subHeader
                                    subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por nombre, ISBN, dewey'} />}
                                    actions={ <AccionesTable onExport={libros} onNombreBoton={'Agregar Libro'} />}
                                    pagination
                                    paginationComponentOptions={paginacionOpciones}
                                    paginationServer
                                    // paginationTotalRows={totalRows}
                                    // onChangeRowsPerPage={handlePerRowsChange}
                                    // onChangePage={handlePageChange}
                                />
                            </CCardBody>
                        </CCard>
                        {
                        
                            (modalOpenEjemplar) && <EjemplaresModal/>
                        
                        }

                        {

                            (modalOpen) && <LibrosModal/>

                        }
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}
