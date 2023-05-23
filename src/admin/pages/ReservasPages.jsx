import { CCard, CCardHeader, CCol, CContainer, CRow, CCardBody } from '@coreui/react'

export const ReservasPages = () => {
    return (
        <CContainer lg>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Reservas</strong> 
                        </CCardHeader>
                        <CCardBody>
                            <p>Pronto reservas</p>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}
