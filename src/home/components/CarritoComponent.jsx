import { useDispatch, useSelector } from 'react-redux'
import { CAlert, CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCloseButton, CCol, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CRow } from '@coreui/react'
import { onCloseCarrito } from '../../store/ui/uiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBook, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { onEliminarLibroCarrito } from '../../store/prestamos/carritoSlice'
import { useNavigate } from 'react-router-dom'

export const CarritoComponent = () => {

    const [ show, setShow ] = useState(true);

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
                                    <CCardImage src={`http://134.122.124.97/storage/${cart.url}`} />
                                </CCol>
                                <CCol md={8}>
                                    <CCardBody  className='d-flex justify-content-center align-items-center'>
                                        <CCardTitle>{cart.titulo_libro}</CCardTitle>
                                        <CCardText>
                                            <CButton onClick={() => handleEliminarLibro(cart.id)} color="danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </CButton>
                                        </CCardText>
                                    </CCardBody>
                                </CCol>
                            </CRow>
                        </CCard>
                    ))}
                    {
                        (carrito.length > 0) ? (
                            <div className="d-grid mt-4">
                                <CButton color="dark" size="lg" onClick={() => handleReserva()}><FontAwesomeIcon icon={faBook}/> Reservar</CButton>
                            </div>
                        ): (<p>El carrito está vacio</p>)
                    }
                    {
                        (show) && (
                            <CAlert className='mt-4' color="info" onClose={() => setShow(false)} dismissible>
                                <p>
                                    <FontAwesomeIcon icon={faCircleInfo} />Estimado vecino, recuerde que puede reservar una cantidad máxima de 2 libros.
                                </p>
                            </CAlert>
                        )
                    }
                </COffcanvasBody>
            </COffcanvas>
        </>
    )
}
