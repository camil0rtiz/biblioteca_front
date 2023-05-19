import { useState } from "react"
import { ProgressBar} from 'react-bootstrap'
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
        <>  
            <div>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-6 ">
                            {getPagContent(page)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
