import { useDispatch, useSelector } from 'react-redux'
import { CAlert, CButton, CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react'
import { onCloseCarritoAdmin } from '../../store/ui/uiSlice'

export const CarritoAdmin = () => {

    const { carritoAdminOpen } = useSelector(state => state.ui)

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
                <CAlert color="info">
                    <p>
                        Carrito esta vacío
                    </p>
                </CAlert>
            </COffcanvasBody>
            <div className="reservar-button border-top" >
                <div className="d-grid p-3">
                    <CButton color="dark" size="lg" shape="rounded-pill">Reservar</CButton>
                </div>
            </div> 
        </COffcanvas>
    )
}
