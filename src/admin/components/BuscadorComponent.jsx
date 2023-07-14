import { useState } from "react"
import { CButton, CFormInput } from "@coreui/react"
import { formateoRut } from "../../helpers/formateoRut"

export const BuscadorComponent = ({ onFilter ,onPlaceholder }) => {

    const [ rut, setRut ] = useState('')

    const handleBuscarRut = () => {
        onFilter(rut);
    }
    
    const handleChange = (e) => {
        setRut(e.target.value);
    }

    return (
        <>
            <div className="d-flex align-items-center">
                <CFormInput
                    type="text"
                    className="form-control mr-2 mx-2"
                    value={rut}
                    onChange={handleChange}
                    placeholder={onPlaceholder}
                />
                <CButton color="primary" onClick={() => handleBuscarRut()}>Buscar</CButton>
            </div>
        </>
    )
}
