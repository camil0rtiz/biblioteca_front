import { CFooter } from "@coreui/react"

export const FooterAdmin = () => {
    return (
        <CFooter>
            <div>
                <a target="_blank" rel="noopener noreferrer">
                    Biblioteca Valle Noble
                </a>
            </div>
            <div className="ms-auto">
                <a target="_blank" rel="noopener noreferrer">
                    Todos los derechos reservados
                </a>
                <span className="ms-1">&copy; 2023</span>
            </div>
        </CFooter>
    )
}
