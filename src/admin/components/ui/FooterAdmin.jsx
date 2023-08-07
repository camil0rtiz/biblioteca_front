import { CFooter } from "@coreui/react"

export const FooterAdmin = () => {
    return (
        <CFooter className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="order-md-2 mt-3 mt-md-0">
                <a target="_blank" rel="noopener noreferrer">
                    Todos los derechos reservados
                </a>
                <span className="ms-1">&copy; 2023</span>
            </div>
            <div className="order-md-1 mb-3 mb-md-0">
                <a target="_blank" rel="noopener noreferrer">
                    Biblioteca Valle Noble
                </a>
            </div>
        </CFooter>
    )
}
