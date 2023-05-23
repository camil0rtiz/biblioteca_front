
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CBadge, CBreadcrumb, CBreadcrumbItem, CButton, CCard, CCardBody, CCardFooter, CCardImage, CCardSubtitle, CCardTitle, CCol, CContainer, CHeaderDivider, CListGroup, CListGroupItem, CRow } from "@coreui/react"
import bibliotecaApi from "../../api/bibliotecaApi"
import { onOpenCarrito, onOpenFiltros } from "../../store/ui/uiSlice"
import { FiltrosComponent } from "../components/FiltrosComponent"
import { onAgregarLibroCarrito } from "../../store/prestamos/carritoSlice"
import '../../assets/css/navbar.css'
import { PaginadorComponent } from "../components/PaginadorComponent"

export const LibrosPages = () => {

    const [ libros, setLibros ] = useState([])

    const [cantPaginas, setCantPaginas] = useState(0)

    const [numPagina, setNumPagina] = useState(0)

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    useEffect(() => {
        listarLibros()
    }, [numPagina])

    const listarLibros = async() => {
        try {

            const {data} = await bibliotecaApi.get(`libros/listar?page=${numPagina}`)

            setLibros(data.data)
        
            setCantPaginas(data.data2.last_page)
        
        } catch (error) {
        
            console.error(error)
            
        }
    }

    const openCarrito = (libro) => {

        if(carrito.length < 2){
            
            dispatch(onAgregarLibroCarrito(libro))

        }

        // localStorage.setItem('carrito', JSON.stringify(libro)), 

        dispatch(onOpenCarrito())
    }

    const openFiltros = () => {
        
        dispatch(onOpenFiltros())
        
    }

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
                        <div>
                            <CButton color="warning" onClick={() => openFiltros()}>Filtros</CButton>
                        </div>
                    </div>
                </CRow>
                <CRow xs={{ cols: 1 }} sm={{ cols: 2 } } md={{ cols: 4 } } lg={{ cols: 4 }} xl={{ cols: 5 }} className="mt-1 g-4">
                    {libros.map((libro) => (
                        <CCol key={libro.id}>
                            <CCard border="light">
                                <CCardImage style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} />
                                <CCardBody>
                                    <CCardTitle className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></CCardTitle>
                                    <CCardSubtitle className="text-muted text-center">{libro.autor.label[0]}</CCardSubtitle>
                                </CCardBody>
                                <CListGroup className="list-group-flush">
                                    <CListGroupItem className="text-center"><CButton color="dark" className="text-center" onClick={() => openCarrito(libro)}>Agregar</CButton></CListGroupItem>
                                </CListGroup>     
                                <CCardFooter className="text-center">
                                    {
                                        (libro.cantidad_ejemplares != 0) ? 
                                        (
                                            <small className="text-muted">
                                                Disponibles: {libro.cantidad_ejemplares}
                                            </small>
                                        ):
                                        (
                                            <small>
                                                <CBadge color="danger">Agotado</CBadge>
                                            </small>
                                        )
                                    }
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
                <CRow>
                    <PaginadorComponent cantPaginas={cantPaginas} setNumPagina={setNumPagina}/>
                </CRow>
                <FiltrosComponent/>
            </CContainer>
        </>
    )
}
