
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CAlert, CBadge, CBreadcrumb, CBreadcrumbItem, CButton, CCard, CCardBody, CCardFooter, CCardImage, CCardSubtitle, CCardTitle, CCol, CContainer, CFormInput, CHeaderDivider, CListGroup, CListGroupItem, CRow } from "@coreui/react"
import { onOpenCarrito, onOpenFiltros } from "../../store/ui/uiSlice"
import { FiltrosComponent } from "../components/FiltrosComponent"
import { onAgregarLibroCarrito } from "../../store/prestamos/carritoSlice"
import { PaginadorComponent } from "../components/PaginadorComponent"
import { startListarLibros } from "../../store/biblioteca/thunk"

export const LibrosPages = () => {

    const [ page, setPage ] = useState(0)

    const [filterText, setFilterText] = useState('');

    const { libros, cantidadPaginado } = useSelector(state => state.libro)

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    useEffect(() => {

        let perPage = 10

        dispatch(startListarLibros(page, perPage, filterText))

    }, [page, filterText])

    const handleOpenCarrito = (libro) => {

        if(carrito.length < 2){
            
            dispatch(onAgregarLibroCarrito(libro))

        }

        // localStorage.setItem('carrito', JSON.stringify(libro)), 

        dispatch(onOpenCarrito())
    }

    const openFiltros = () => {
        
        dispatch(onOpenFiltros())
        
    }

    const onFilter = (event) => {

        setFilterText(event.target.value);

    };

    return (
        <>
            <CHeaderDivider/>
            <CContainer fluid >
                <CBreadcrumb className='"m-0 ms-2 mt-3'>
                    <CBreadcrumbItem to='home'>Home</CBreadcrumbItem>
                    <CBreadcrumbItem active>Libros</CBreadcrumbItem>
                </CBreadcrumb>
            </CContainer>
            <CContainer >
                <CRow>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h3>Libros</h3>
                        </div>
                        {/* <div>
                            <CButton color="warning" onClick={() => openFiltros()}>Filtros</CButton>
                        </div> */}
                    </div>
                </CRow>
                <CRow>
                    <div className="mt-1">
                        <CFormInput
                            type="text"
                            className='form-control'
                            value={filterText}
                            onChange={onFilter}
                            placeholder='Buscar por título de libro'
                        />
                    </div>
                </CRow>
                <CRow xs={{ cols: 1 }} sm={{ cols: 2 } } md={{ cols: 4 } } lg={{ cols: 4 }} xl={{ cols: 5 }} className="mt-1 g-4">
                    {libros.length === 0 ? (

                        <CAlert
                            className="w-100 d-flex align-items-center justify-content-center"
                            color="danger"
                            >
                            <p>No se encontraron libros.</p>
                        </CAlert>

                    ) : (
                        
                        libros.map((libro) => (
                            <CCol key={libro.id}>
                                <CCard border="light">
                                    {/* <CCardImage style={{height: 360}} variant="top" src={`http://localhost/biblioteca_vn_backend/storage/app/public/${libro.url}`} /> */}
                                    <CCardImage style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} />
                                    <CCardBody>
                                        <CCardTitle className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></CCardTitle>
                                        <CCardSubtitle className="text-muted text-center">{libro.autor.label[0]}</CCardSubtitle>
                                    </CCardBody>
                                    <CListGroup className="list-group-flush">
                                        <CListGroupItem className="text-center"><CButton color="dark" className="text-center" onClick={() => handleOpenCarrito(libro)} disabled={(libro.stock_libro == 0) ? true : false}>Agregar</CButton></CListGroupItem>
                                    </CListGroup>     
                                    <CCardFooter className="text-center">
                                        <small className="text-muted">
                                            Disponibles: {libro.stock_libro}
                                        </small>
                                    </CCardFooter>
                                </CCard>
                            </CCol>
                        ))
                    )}
                </CRow>
                <CRow>
                    <PaginadorComponent cantPaginas={cantidadPaginado} setNumPagina={setPage}/>
                </CRow>
                <FiltrosComponent/>
            </CContainer>
        </>
    )
}
