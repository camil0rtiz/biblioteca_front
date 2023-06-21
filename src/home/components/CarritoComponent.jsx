import { useDispatch, useSelector } from 'react-redux'
import { CAlert, CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCloseButton, CCol, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import { onCloseCarrito } from '../../store/ui/uiSlice'
import { onEliminarLibroCarrito } from '../../store/prestamos/carritoSlice'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/libros.css'

export const CarritoComponent = () => {

    const { carritoOpen } = useSelector(state => state.ui)

    const { carrito } = useSelector(state => state.carrito)
    
    const dispatch = useDispatch()
    
    const navigate = useNavigate()   

    const handleClose = () => {

        dispatch(onCloseCarrito())

    }

    const handleEliminarLibro = (id) => {

        dispatch(onEliminarLibroCarrito(id))

    }

    const handleReserva = () => {

        dispatch(onCloseCarrito())

        navigate('/reservas')

    }

    return (
        <>
            <COffcanvas className='bg-light' placement="start" visible={carritoOpen} onHide={handleClose}>
                <COffcanvasHeader>
                    <COffcanvasTitle>Carrito</COffcanvasTitle>
                    <CCloseButton className="text-reset" onClick={handleClose} />
                </COffcanvasHeader>
                <COffcanvasBody>
                    {carrito.map((cart) => (
                        <CCard key={cart.id} className="mb-3">
                            <CRow className="g-0">
                                <CCol md={4}>
                               
                                    <CCardImage src={` http://localhost/biblioteca_vn_backend/storage/app/public/${cart.url}`} />
                                    {/* <CCardImage src={`http://134.122.124.97/storage/${cart.url}`} /> */}
                                </CCol>
                                <CCol md={8}>
                                    <CCardBody  className='d-flex justify-content-center align-items-center'>
                                        <CCardTitle>{cart.titulo_libro}</CCardTitle>
                                        <CCardText>
                                            <CButton onClick={() => handleEliminarLibro(cart.id)} color="danger">
                                                Eliminar
                                            </CButton>
                                        </CCardText>
                                    </CCardBody>
                                </CCol>
                            </CRow>
                        </CCard>
                    ))}
                    {
                        (carrito.length == 0) && (

                            <CAlert color="info">
                                <p>
                                    Estimado lector, recuerde que puede reservar una cantidad máxima de 2 libros.
                                </p>
                            </CAlert>

                        )
                    }
                </COffcanvasBody>
                    {
                        (carrito.length > 0) && (
                            <div className="reservar-button border-top" >
                                <div className="d-grid p-3">
                                    <CButton color="dark" size="lg" shape="rounded-pill" onClick={() => handleReserva()}>Reservar</CButton>
                                </div>
                            </div> 
                        ) 
                    }
            </COffcanvas>
        </>
    )
}
