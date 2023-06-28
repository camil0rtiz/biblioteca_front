import { useDispatch } from 'react-redux'
import { CButton } from '@coreui/react'
import { onOpenCarritoAdmin } from '../../store/ui/uiSlice'
import { exportarCvs } from '../../helpers/exportarCvs'

export const CarritoButton = ({onExport, onNombreBoton}) => {

    const dispatch = useDispatch()

    const handleShow = () => {

        dispatch(onOpenCarritoAdmin())
    
    }

    const handleExcel = (filename, rows) => {

        exportarCvs(filename, rows)

    }
    
    return (
        
        <>
            <CButton color='success' onClick={() => handleExcel('data.csv', onExport.data)}>Exportar</CButton>
            <CButton color="primary" onClick={handleShow}>{onNombreBoton}</CButton>
        </>

    )
}
