import { CFooter, CLink } from '@coreui/react';
import logo from '../../assets/img/bcnv.jpg'

export const FooterComponent = () => {
    return (
        <CFooter className='bg-dark' position='fixed'>
            <div>
                <strong className='text-light'>Biblioteca Valle Noble</strong>
            </div>
            <div>
                <span className='text-light'>Todos los derechos reservados</span>
                <span className='text-light'> &copy; 2023 </span>
            </div>
        </CFooter>
    )
}

