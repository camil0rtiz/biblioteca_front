import { useDispatch, useSelector } from 'react-redux'
import { CAlert, CButton, CCloseButton, CListGroup, CListGroupItem, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react'
import { onCloseCarritoAdmin } from '../../store/ui/uiSlice'
import { startPrestarLibro } from '../../store/prestamos/thunk'

export const CarritoAdmin = () => {

    const { carritoAdminOpen } = useSelector(state => state.ui)

    const { carritoReserva } = useSelector(state => state.carrito)

    const { usuarioId } = useSelector(state => state.reserva)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseCarritoAdmin())

    }

    const handlePrestarLibro = () => {

        let estadoPrestamo = 1

        let ejemplaresPrestados = []

        carritoReserva.map((cart)=> {
            ejemplaresPrestados.push(cart.id)
        })

        dispatch(startPrestarLibro(ejemplaresPrestados,usuarioId,estadoPrestamo))

    }

    return (
        <COffcanvas className='bg-light' placement="end" visible={carritoAdminOpen} onHide={handleClose}>
            <COffcanvasHeader>
                <COffcanvasTitle>Carrito</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={handleClose} />
            </COffcanvasHeader>
            <COffcanvasBody>
                <CListGroup>
                    {carritoReserva.map((cart) => (
                        
                        <CListGroupItem key={cart.id} className='mb-2 d-flex justify-content-between align-items-center'>
                            <div>
                                <div>
                                    {cart.titulo_libro}
                                </div>
                                <div>
                                    {cart.dewey_unic_ejemplar}
                                </div>
                            </div>
                            <div>
                                <CButton color="danger" shape="rounded-pill">Eliminar</CButton>
                            </div>
                        </CListGroupItem>
                    
                    ))}
                </CListGroup>
                {
                    (carritoReserva.length == 0) && (
                        <CAlert color="info">
                            <p>
                                Estimado lector, recuerde que puede reservar una cantidad máxima de 2 libros.
                            </p>
                        </CAlert>
                    )
                }
            </COffcanvasBody>
            <div className="reservar-button border-top" >
                <div className="d-grid p-3">
                    <CButton color="dark" size="lg" shape="rounded-pill" onClick={() => handlePrestarLibro()}>Prestar libro</CButton>
                </div>
            </div> 
        </COffcanvas>
    )
}
