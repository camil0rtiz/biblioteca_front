import { useDispatch } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv, faBook } from '@fortawesome/free-solid-svg-icons'
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
            <CButton color='success' onClick={() => handleExcel('data.csv', onExport.data)}> <FontAwesomeIcon icon={faFileCsv}/> Exportar</CButton>
            <CButton color="primary" onClick={handleShow}> <FontAwesomeIcon icon={faBook} /> {onNombreBoton}</CButton>
        </>

    )
}
