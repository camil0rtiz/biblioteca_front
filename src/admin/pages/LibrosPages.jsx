import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import Swal from "sweetalert2";
import { startEliminarLibro, startListarLibros } from "../../store/biblioteca/thunk";
import { onOpenModal, onOpenModalEjemplar, onOpenModalPortada } from "../../store/ui/uiSlice"
import { LibrosModal } from '../components/modal/LibrosModal'
import { ExpandedLibros } from '../components/ExpandedLibros'
import { onAgregarLibro } from "../../store/biblioteca/libroSlice"
import { EjemplaresModal } from "../components/modal/EjemplaresModal"
import { onAgregarEjemplar } from "../../store/biblioteca/ejemplarSlice"
import { FiltroComponent } from "../components/FiltroComponent"
import { AccionesTable } from "../components/AccionesTable"
import { paginacionOpciones } from "../../helpers/paginacionOpciones"
import { PrestamosModal } from "../components/modal/PrestamosModal";
import { PortadaModal } from "../components/modal/PortadaModal";

export const LibrosPages = () => {

    const [ filterText, setFilterText] = useState('')

	const [ perPage, setPerPage ] = useState(10)

    const [ page, setPage ] = useState(1)

    const { libros, cantidadPaginas, libroSave } = useSelector(state => state.libro)

    const { modalOpen, modalOpenEjemplar, modalOpenPrestamos, modalOpenPortada } = useSelector(state => state.ui)
    
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarLibros(page, perPage, filterText))
        
    }, [libroSave, page, perPage, filterText])

    const handleShow = ({id, titulo_libro, dewey_libro, anio_publi_libro, resena_libro, autor}) => {

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
            
            dispatch(onAgregarLibro({id, tituloLibro: titulo_libro, deweyLibro: dewey_libro, anioPublicacionLibro: anio_publi_libro, resenaLibro: resena_libro, autorLibro}))

        }
    }

    const handleShowPortada = ({id, id_portada ,url}) => {

        dispatch(onOpenModalPortada())
        dispatch(onAgregarLibro({id, idPortada:id_portada, url}))

    }

    const handleShowEjemplar = ({id, dewey_libro}) => {

        dispatch(onOpenModalEjemplar())

        dispatch(onAgregarEjemplar({id,'deweyLibro':dewey_libro}))
        
    }

    const handleEliminarLibro = ({id}) => {

        let estado_libro = 2

        Swal.fire({
            title: '¿Estás seguro de querer eliminar un libro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startEliminarLibro({id, estado_libro}))
                Swal.fire(
                    '¡Eliminado!',
                    'El libro ha sido eliminado correctamente.',
                    'success'
                )
            }
        })

    }

    const handlePageChange = (page) => {

		setPage(page)

	}

    const handlePerRowsChange = (newPerPage) => {

        setPerPage(newPerPage)

	}

    const columns = [

        {
            name: 'Título libro',
            selector: row => row.titulo_libro,
            sortable: true,
        },
        {
            name: 'Dewey',
            selector: row => row.dewey_libro,
            sortable: true,
        },
        {
            name: 'Cantidad',
            selector: row => row.stock_libro,
            sortable: true,
            width: "200px"  
        },
        {
            name: 'Portada',
            grow: 0,
            
            cell: (data) => <img height="100px" width="80px" src={`http://localhost/biblioteca_vn_backend/storage/app/public/${data.url}`}/>,
		    // cell: (data) => <img height="100px" width="80px" src={`http://134.122.124.97/storage/${data.url}`}/>,
            sortable: true,
        },
        {
            name: 'Acciones',
            button: true,
            cell: (data) => <div className='d-flex justify-content-between'>
                                <div className="mx-1">
                                    <CButton color="info" onClick={() => handleShowEjemplar(data)}>
                                        Agregar Ejemplar
                                    </CButton>
                                </div>
                                <div className="mx-1">
                                    <CButton color="success" onClick={() => handleShowPortada(data)}>
                                        Cambiar portada
                                    </CButton>
                                </div>
                                <div className="mx-1">
                                    <CButton color="warning" onClick={() => handleShow(data)}>
                                        Editar
                                    </CButton>
                                </div>
                                <div className="mx-1">
                                    <CButton color="danger" onClick={() => handleEliminarLibro(data)}>
                                        Eliminar
                                    </CButton>
                                </div>
                            </div>,
            width: "500px"  
        }, 
    ];

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
                                    data={libros}
                                    highlightOnHover={true}
                                    noDataComponent={<span className='mt-4'>No se encontro ningún elemento</span>}
                                    fixedHeader
                                    fixedHeaderScrollHeight="600px"
                                    persistTableHead
                                    striped
                                    progressPending={false}
                                    // progressComponent={<CustomLoader />}
                                    expandableRows
                                    expandableRowsComponent={ExpandedLibros}
                                    subHeader
                                    subHeaderComponent={<FiltroComponent onFilter={e => setFilterText(e.target.value)} filterText={filterText} onPlaceholder={'Filtra por nombre, ISBN, dewey'} />}
                                    actions={ <AccionesTable onExport={libros} onNombreBoton={'Agregar Libro'} />}
                                    pagination
                                    paginationServer
                                    paginationTotalRows={cantidadPaginas}
                                    paginationComponentOptions={paginacionOpciones}
                                    onChangeRowsPerPage={handlePerRowsChange}
                                    onChangePage={handlePageChange}
                                />
                            </CCardBody>
                        </CCard>
                        {
                        
                            (modalOpenEjemplar) && <EjemplaresModal/>
                        
                        }

                        {

                            (modalOpen) && <LibrosModal/>

                        }

                        {

                            (modalOpenPrestamos) && <PrestamosModal/>

                        }

                        {

                            (modalOpenPortada) && <PortadaModal/>

                        }
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}
