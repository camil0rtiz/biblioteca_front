import { useState } from "react"
import { CButton, CFormInput, CInputGroup } from "@coreui/react"

export const BuscadorComponent = ({ onFilter, onPlaceholder }) => {

    const [ rut, setRut ] = useState('')

    const handleBuscarRut = () => {
        onFilter(rut);
    }
    
    const handleChange = (e) => {

        let rutUsuario = e.target.value

        let firstValue = e.target.value.slice(0,1)

        if (isNaN(firstValue) === false) {

            let valor = rutUsuario.replace(/^0+|[^0-9kK]+/g, "")
            rutUsuario = valor

            let number = valor.slice(0,-1)
            let dv = valor.slice(-1)

            if(number === '') {
                rutUsuario = valor
            }else{
                rutUsuario = parseInt(number) + '-' + dv
            }
        }
    
        setRut(rutUsuario)
    }

    return (
        <>
            <CInputGroup className="mb-3">
                <CFormInput 
                    type="text"
                    className="form-control"
                    value={rut}
                    maxLength={10}
                    onChange={handleChange}
                    placeholder={onPlaceholder}
                />
                <CButton type="button" color="primary" variant="outline" onClick={() => handleBuscarRut()} id="button-addon2">Buscar</CButton>
            </CInputGroup>
        </>
    )
}
