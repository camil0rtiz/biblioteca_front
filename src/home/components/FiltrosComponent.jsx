import { useDispatch, useSelector } from 'react-redux'
import { CCloseButton, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react'
import { onCloseFiltros } from '../../store/ui/uiSlice'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFilter } from '@fortawesome/free-solid-svg-icons'

export const FiltrosComponent = () => {

    const { filtrosOpen } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseFiltros())

    }

    return (
            
        <COffcanvas placement="end" visible={filtrosOpen} onHide={handleClose}>
            <COffcanvasHeader>
                <COffcanvasTitle>Filtros</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={handleClose} />
            </COffcanvasHeader>
            <COffcanvasBody>
                Content for the offcanvas goes here. You can place just about any Bootstrap component or
                custom elements here.
            </COffcanvasBody>
        </COffcanvas>
        
    )
}
