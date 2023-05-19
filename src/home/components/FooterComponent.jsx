import { CFooter, CLink } from '@coreui/react';
import logo from '../../assets/img/bcnv.jpg'

export const FooterComponent = () => {
    return (
        <CFooter position='fixed'>
            <div>
                <CLink>Biblioteca Valle Noble</CLink>
                <span>&copy; 2023 Camilo Ortiz.</span>
            </div>
            <div>
                <span>Powered by</span>
                <CLink href="https://coreui.io">CoreUI</CLink>
            </div>
        </CFooter>
    )
}

