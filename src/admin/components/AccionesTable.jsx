import { useDispatch } from 'react-redux'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { onOpenModal } from '../../store/ui/uiSlice'
import { exportarCvs } from '../../helpers/exportarCvs'

export const AccionesTable = ({ onExport, onNombreBoton }) => {

    const dispatch = useDispatch()

    const handleShow = () => {

        dispatch(onOpenModal())
    
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
