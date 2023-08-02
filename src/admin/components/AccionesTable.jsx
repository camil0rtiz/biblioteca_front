import { useDispatch, useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { onOpenModal } from '../../store/ui/uiSlice'
import { exportarCvs } from '../../helpers/exportarCvs'

export const AccionesTable = ({ onExport, onNombreBoton }) => {

    const { user } = useSelector(state => state.auth)

    const isVoluntario = user.tipo_rol === 'Voluntario'

    const dispatch = useDispatch()

    const handleShow = () => {

        dispatch(onOpenModal())
    
    }

    const handleExcel = (filename, rows) => {

        exportarCvs(filename, rows)

    }
    
    return (
        
        <>
            {/* <CButton color='success' onClick={() => handleExcel('data.csv', onExport.data)}>Exportar</CButton> */}
            <CButton color="primary" onClick={handleShow} disabled={isVoluntario}>{onNombreBoton}</CButton>
        </>

    )
}
