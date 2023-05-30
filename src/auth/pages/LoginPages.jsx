import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CFormText, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { validaRut } from "../../helpers/validarRut"
import { startLogin } from "../../store/auth/thunk"
import { onCheckingLogin, onErrorMessage } from "../../store/auth/authSlice"

export const LoginPages = () => {

    const { errorMessage, status } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const { formState: { errors }, handleSubmit, setValue, reset, control} = useForm()

    const handleLogin = ({ loginRut, loginPassword }) => {

        dispatch(onCheckingLogin())

        dispatch(startLogin(loginRut, loginPassword, reset))

    }

    const handleCloseAlert = () => {
        
        dispatch(onErrorMessage())

    } 

    const formateoRut = ( rut ) => {
    
        var firstValue = rut.slice(0,1)

        if (isNaN(firstValue) === false) {

            var valor = rut.replace(/^0+|[^0-9kK]+/g, "")
            rut = valor;
    
            var number = valor.slice(0,-1)
            var dv = valor.slice(-1)
    
            if(number === '') {
                rut = valor
            }else{
                rut = parseInt(number) + '-' + dv
            }
        }
        
        setValue('loginRut', rut)
    
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSubmit(handleLogin)} onReset={reset} validated={false}>
                                        <h1>Accede</h1>
                                        <p className="text-medium-emphasis">Inicia sesión con tu cuenta</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <Controller 
                                                control={control} 
                                                name="loginRut" 
                                                defaultValue=""  
                                                rules={{
                                                    onChange: e => formateoRut(e.target.value),
                                                    required:{
                                                        value: true,
                                                        message: "Rut es obligatorio"
                                                    },
                                                    minLength: { value: 2, message: 'El rut tiene que ser mas largo' },
                                                    validate: {positive: v => validaRut(v) == true || 'Rut tiene que ser válido'} 
                                                }}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <CFormInput
                                                        onChange={onChange} 
                                                        value={value} 
                                                        ref={ref}  
                                                        type="text"
                                                        placeholder="Rut"  
                                                        maxLength={10} 
                                                    />
                                                )}
                                                
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <Controller 
                                                control={control} 
                                                name="loginPassword"
                                                defaultValue=""  
                                                rules={{
                                                    required: {value: true, message: 'Contraseña es obligatoria'},
                                                }}
                                                render={({ field: { onChange, value, ref } }) => (
                                                    <CFormInput
                                                        onChange={onChange} 
                                                        value={value} 
                                                        ref={ref}  
                                                        type="password"
                                                        placeholder="Contraseña"
                                                        feedbackInvalid="Please enter a message in the textarea."
                                                    />
                                                )}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton type="submit" color="primary" className="px-4">
                                                    Ingresa
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    ¿Olvidaste tu contraseña?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-dark py-5">
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Registrate Ahora</h2>
                                        <p>
                                            Si no estas subcrito aun, pulsa el botón resgitrate ahora
                                        </p>
                                        <Link to="/auth/registro">
                                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                            Registrate ahora
                                        </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}
