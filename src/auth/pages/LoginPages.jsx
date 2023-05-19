import { useDispatch, useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import { Button, Form, Alert, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
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
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="p-4 col-xs-1 col-md-4 mt-5 border border-2 rounded rounded-2 shadow">
                        <h3 className="mt-4 text-center">Inicia Sesión</h3>
                        
                        <Form onSubmit={handleSubmit(handleLogin)} onReset={reset}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Rut*</Form.Label>
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
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="text" 
                                            placeholder="Ingrega tu rut" 
                                            maxLength={10} 
                                        />
                                    )}
                                />
                                {errors.loginRut && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        <FontAwesomeIcon icon={faCircleExclamation} /> {errors.loginRut.message}
                                    </Form.Text> 
                                }                                            
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="loginPassword"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Contraseña es obligatoria'},
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="password" 
                                            placeholder="Ingrega tu contraseña" 
                                        />
                                    )}
                                />
                                {errors.loginPassword && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        <FontAwesomeIcon icon={faCircleExclamation} /> {errors.loginPassword.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                            {
                                (errorMessage) && (
                                    <Alert variant="danger" onClose={() => handleCloseAlert()} dismissible>
                                        <p><FontAwesomeIcon icon={faCircleExclamation}/> Rut o Contraseña incorrectos</p>
                                    </Alert>
                                )
                            }
                            <div className="d-grid mt-3 mb-4">
                                {
                                    (status == 'checking') ? 
                                    (   
                                        <Button variant="dark" type="submit" disabled>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            /> Autenticando
                                        </Button>
                                    ):(
                                        <Button variant="dark" type="submit">Iniciar Sesión</Button>
                                    )
                                }
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
