import { useState } from "react"
import { CCol, CContainer, CRow } from "@coreui/react"
import { MembresiaRegisterForm } from "../components/MembresiaRegisterForm"
import { ComprobanteRegisterForm } from "../components/ComprobanteRegisterForm"
import { PersonalRegisterForm } from "../components/PersonalRegisterForm"

export const RegisterPages = () => {

    const [ page, setPage ] = useState(0)

    const goNextPage = () => {
        setPage( page + 1 )
    }
    
    const goBackPage = () => {
        setPage( page - 1 )
    }
    

    const tituloPage = ['Datos personales', ' Datos Membresia' , 'Datos de Pago']

    const getPagContent = (page) => {
        
        switch(page) {
            case 0:
                return <PersonalRegisterForm goNextPage={goNextPage} goBackPage={goBackPage} />
            case 1:
                return <MembresiaRegisterForm goNextPage={goNextPage} goBackPage={goBackPage} />
            case 2:
                return <ComprobanteRegisterForm  goBackPage={goBackPage}/>
            default:
                throw new Error('Página no encontrada')
        }
    }

    return (

        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol xs={12} md={6}>
                        {getPagContent(page)}
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    
    )
}
