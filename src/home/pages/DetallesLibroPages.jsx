import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem, CButton, CCard, CCardImage, CCol, CContainer, CHeaderDivider, CListGroup, CListGroupItem, CRow, CSpinner } from '@coreui/react'
import bibliotecaApi from '../../api/bibliotecaApi'
import { onAgregarLibroCarrito } from '../../store/prestamos/carritoSlice'
import { onOpenCarrito } from '../../store/ui/uiSlice'

export const DetallesLibroPages = () => {
    
    const [ libro, setLibro ] = useState(null)

    const { id } = useParams()

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    useEffect(() => {
        buscarLibroPorId(id)
    }, [])

    const buscarLibroPorId = async(id) => {
        try {

            const {data} = await bibliotecaApi.get(`libros/buscarId?id_libro=${id}`)

            setLibro(data.data)
                    
        } catch (error) {
        
            console.error(error)
            
        }
    }

    const handleOpenCarrito = (libro) => {

        if(carrito.length < 2){
            
            dispatch(onAgregarLibroCarrito(libro))

        }

        dispatch(onOpenCarrito())
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
            <CContainer>
                <CRow>
                    {
                        (libro) ? (
                            <>
                                <CCol md={6} lg={3}>
                                    <CCard border="light">
                                        <CCardImage variant="top" src={`http://localhost/biblioteca_vn_backend/storage/app/public/${libro.url}`} />
                                        {/* <CCardImage variant="top" src={`http://134.122.124.97/storage/${libro.url}`} /> */}
                                        <CListGroup className="list-group-flush">
                                            <CListGroupItem>Categoría: {libro.categoria_libro}</CListGroupItem>
                                            <CListGroupItem>Páginas:</CListGroupItem>
                                            <CListGroupItem>Año:</CListGroupItem> 
                                        </CListGroup>
                                    </CCard>
                                </CCol>
                                <CCol md={6} lg={9}>
                                    <CRow>
                                        <h1>{libro.titulo_libro} - {libro.autor.label[0]}</h1>
                                    </CRow>
                                    {/* <CRow>
                                        <CCol className='border p-3 mt-3 text-center' lg={3}>
                                            <h6>Quedan 6 unidades</h6>
                                            <CListGroup>
                                                <CListGroupItem><CButton color="danger" onClick={() => handleOpenCarrito(libro)}>Agregar</CButton></CListGroupItem>
                                            </CListGroup>
                                        </CCol>
                                    </CRow> */}
                                    <CRow>
                                        <h3 className='mt-3'>Reseña "{libro.titulo_libro}": </h3>
                                        <h5 dangerouslySetInnerHTML={{ __html: libro.resena_libro }}></h5>
                                    </CRow>
                                </CCol>
                            </>
                        ) : (
                            <>
                                <CSpinner/>
                            </>
                        )
                    }
                </CRow>
            </CContainer>
        </>
    
    )
}
