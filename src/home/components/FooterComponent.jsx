import { CCol, CContainer, CFooter, CImage, CLink, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cibInstagram, cibFacebookF, cibWhatsapp } from '@coreui/icons'
import logo from '../../assets/img/bcnv.jpg'

export const FooterComponent = () => {
    return (
        <CFooter className='bg-black'>
            <CContainer fluid className="text-white">
                <CRow>
                    <CCol className="text-center mb-2" lg={3}>
                        <CImage rounded thumbnail src={logo} width={150} height={150} />
                    </CCol>
                    <CCol className="text-center" lg={3}>
                        <h5>Dirección</h5>
                        <p>
                            Concepción, Chile<br />
                            Correo: bibliotecavallenoble@gmail.com <br />
                        </p>
                    </CCol>
                    <CCol className="text-center" lg={3}>
                        <h5>Nuestro Horario</h5>
                        <p>Lunes: 6:00 a 8:30</p>
                    </CCol>
                    <CCol lg={3} className="text-center">
                        <h5>Síguenos</h5>
                        <a href="https://www.instagram.com/miempresa/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                            <CIcon icon={cibInstagram} size='xl' />
                        </a>
                        <a href="https://www.facebook.com/miempresa" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                            <CIcon icon={cibFacebookF} size='xl' />
                        </a>
                        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer" className="text-white">
                            <CIcon icon={cibWhatsapp} size='xl' />
                        </a>
                    </CCol>
                </CRow>
                <CRow className="d-flex mt-2 justify-content-center">
                    <div className="text-center">
                        <strong>Biblioteca Valle Noble </strong>
                        <span>Todos los derechos reservados &copy; 2023</span>
                    </div>
                </CRow>
            </CContainer>
        </CFooter>
    )
}

