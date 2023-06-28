import { useDispatch, useSelector } from 'react-redux'
import { CAlert, CButton, CCloseButton, CListGroup, CListGroupItem, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react'
import { onCloseCarritoAdmin } from '../../store/ui/uiSlice'

export const CarritoAdmin = () => {

    const { carritoAdminOpen } = useSelector(state => state.ui)

    const { carritoReserva } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseCarritoAdmin())

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
                        
                        <CListGroupItem key={cart.id} className='mb-2'>{cart.dewey_unic_ejemplar}</CListGroupItem>
                    
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
                    <CButton color="dark" size="lg" shape="rounded-pill">Reservar</CButton>
                </div>
            </div> 
        </COffcanvas>
    )
}
