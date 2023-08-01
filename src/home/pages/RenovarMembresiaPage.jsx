import { CAlert, CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CFormText, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

export const RenovarMembresiaPage = () => {

    const { errorMessage, status } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const { formState: { errors }, handleSubmit, setValue, reset, control} = useForm()

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}
