import { useDispatch, useSelector } from 'react-redux'
import { CButton, CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react'
import { onCloseFiltros } from '../../store/ui/uiSlice'

export const FiltrosComponent = () => {

    const { filtrosOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseFiltros())

    }

    return (
            
        <COffcanvas className='bg-light' placement="end" visible={filtrosOpen} onHide={handleClose}>
            <COffcanvasHeader>
                <COffcanvasTitle>Filtros</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={handleClose} />
            </COffcanvasHeader>
            <COffcanvasBody>
                
            </COffcanvasBody>
            <div className="reservar-button border-top" >
                <div className="d-grid p-3">
                    <CButton color="dark" size="lg" shape="rounded-pill" >Filtrar</CButton>
                </div>
            </div>
        </COffcanvas>
        
    )
}
