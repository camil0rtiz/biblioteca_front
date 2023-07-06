import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Button, Form, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap'
import { validaRut } from "../../helpers/validarRut"
import { onAgregarUser, onUserExists } from "../../store/auth/userSlice"
import { formateoRut } from "../../helpers/formateoRut"
import { CAlert, CCard, CCardBody, CCardGroup, CProgress, CProgressBar } from "@coreui/react"
import { formateoMayusculas } from '../../helpers/formateoMayusculas'
import bibliotecaApi from "../../api/bibliotecaApi"

export const PersonalRegisterForm = ({goNextPage}) => {

    const { initialUsuario, userExists } = useSelector(state => state.user)

    const dispatch =  useDispatch()

    const navigate = useNavigate();

    const { formState: { errors }, handleSubmit, setValue, control, watch } = useForm({ defaultValues: initialUsuario })

    const onSubmit = async({ registroRut,registroNombre,registroApellidoPaterno,registroApellidoMaterno,registroFechaNacimiento,registroCorreo, registroConfirCorreo,registroNumeroCelular,registroDireccion,registroNumCasa,registroPassword,registroConfirPassword }) => {
        
        const {data} = await bibliotecaApi.get(`usuarios/verificar/${registroRut}`)
        console.log(data);
        if (data.data == true) {
            dispatch(onUserExists(true));
        } else if (data.data == false) {

            console.log(data);
            dispatch(
                onAgregarUser({
                    registroRut,
                    registroNombre,
                    registroApellidoPaterno,
                    registroApellidoMaterno,
                    registroFechaNacimiento,
                    registroCorreo,
                    registroConfirCorreo,
                    registroNumeroCelular,
                    registroDireccion,
                    registroNumCasa,
                    registroPassword,
                    registroConfirPassword,
                })
            );
            dispatch(onUserExists(false));
            goNextPage();
        }
    };

    const handleHome = () => {

        navigate('-1')
        
    }

    return (

        <CCardGroup>
            <CCard className="p-4">
                <CCardBody>
                    {userExists &&  
                        <CAlert color="danger">
                            Usuario ya se encuentra registrado
                        </CAlert>
                    }
                    <ProgressBar className="mb-3" animated variant="primary" now={33.3} label={'Paso 1'} />
                    <h3>Datos Personales</h3>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="mb-md-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Rut*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroRut" 
                                    defaultValue=""  
                                    rules={{
                                        onChange: e => formateoRut(e.target.value, setValue),
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
                                {errors.registroRut && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroRut.message}
                                    </Form.Text> 
                                }                                            
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Nombre*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroNombre"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Nombre es obligatorio'},
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={e => onChange(formateoMayusculas(e.target.value))}  
                                            value={value} 
                                            ref={ref}  
                                            type="text" 
                                            placeholder="Ingresa tu nombre" 
                                        />
                                    )}
                                />
                                {errors.registroNombre && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroNombre.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                        </Row>
                        <Row className="mb-md-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Apellido Paterno*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroApellidoPaterno"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Apellido paterno es obligatorio'},
                                        minLength: { value: 2, message: 'El apellido paterno tiene que ser mas largo' },
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={e => onChange(formateoMayusculas(e.target.value))}  
                                            value={value} 
                                            ref={ref}  
                                            type="text" 
                                            placeholder="Ingresa tu apellido paterno" 
                                        />
                                    )}
                                />
                                {errors.registroApellidoPaterno && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroApellidoPaterno.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Apellido Materno*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroApellidoMaterno"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Nombre es obligatorio'},
                                        minLength: { value: 2, message: 'El pellido materno tiene que ser mas largo' },
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={e => onChange(formateoMayusculas(e.target.value))}  
                                            value={value} 
                                            ref={ref}  
                                            type="text" 
                                            placeholder="Ingresa tu apellido materno" 
                                        />
                                    )}
                                />
                                {errors.registroApellidoMaterno && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroApellidoMaterno.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                        </Row>
                        <Row className="mb-md-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Fecha de nacimiento*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroFechaNacimiento"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Fecha de nacimiento es obligatoria'},
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="date"  
                                            placeholder="Ingresa tu fecha de nacimiento" 
                                        />
                                    )}
                                />
                                {errors.registroFechaNacimiento && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroFechaNacimiento.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label >Número celular</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroNumeroCelular"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Número de celular es obligatorio'},
                                        pattern: {
                                            value: /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/,
                                            message: 'Número de celular inválido',
                                        },
                                    }} 
                                    render={({ field: { onChange, value, ref } }) => (
                                        <InputGroup>
                                            <InputGroup.Text>+56</InputGroup.Text>
                                            <Form.Control
                                                onChange={onChange} 
                                                value={value} 
                                                ref={ref}  
                                                placeholder="Ingresa tu número de célular"
                                            />
                                        </InputGroup>
                                    )}
                                />
                                {errors.registroNumeroCelular && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroNumeroCelular.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                        </Row>
                        <Row className="mb-md-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Dirección</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroDireccion"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'La dirección de domicilio es obligatorio'},
                                        minLength: { value: 2, message: 'La direccion tiene que ser mas larga' }
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={e => onChange(formateoMayusculas(e.target.value))}  
                                            value={value} 
                                            ref={ref}  
                                            type="text"  
                                            placeholder="Ingresa tu dirección de domicilio" 
                                        />
                                    )}
                                />
                                {errors.registroDireccion && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroDireccion.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Número de domicilio</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroNumCasa"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Número de domicilio es obligatorio'},
                                        minLength: { value: 2, message: 'El número tiene que ser mas largo' },
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="text" 
                                            placeholder="Ingresa tu número de domicilio"
                                        />
                                    )}
                                />
                                {errors.registroNumCasa && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroNumCasa.message}
                                    </Form.Text> 
                                } 
                            </Form.Group> 
                        </Row>
                        <Row className="mb-md-3">
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Correo*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroCorreo"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Correo es obligatorio'},
                                        pattern: '^\S+@\S+$',
                                        minLength: { value: 2, message: 'El correo tiene que ser mas largo' },
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="email" 
                                            placeholder="Ingresa tu correo electronico" 
                                        />
                                    )}
                                />
                                {errors.registroCorreo && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroCorreo.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Confirmar correo*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroConfirCorreo"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Correo es obligatorio'},
                                        pattern: '^\S+@\S+$',
                                        minLength: { value: 2, message: 'El correo tiene que ser mas largo' },
                                        validate: (val) => {
                                            if (watch('registroCorreo') != val) {
                                                return "Los correos no coinciden";
                                            }
                                        }
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="email" 
                                            placeholder="Ingresa tu correo electronico" 
                                        />
                                    )}
                                />
                                {errors.registroConfirCorreo && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroConfirCorreo.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                        </Row>
                        <Row className="mb-md-3">
                            <Form.Group  as={Col} md={6}>
                                <Form.Label>Contraseña*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroPassword"
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
                                            placeholder="Ingresa tu contraseña" 
                                        />
                                    )}
                                />
                                {errors.registroPassword && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroPassword.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label>Confirmar contraseña*</Form.Label>
                                <Controller 
                                    control={control} 
                                    name="registroConfirPassword"
                                    defaultValue=""  
                                    rules={{
                                        required: {value: true, message: 'Confirmación de Contraseña es obligatoria'},
                                        validate: (val) => {
                                            if (watch('registroPassword') != val) {
                                                return "Las contraseñas no coinciden";
                                            }
                                        }
                                    }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Form.Control
                                            onChange={onChange} 
                                            value={value} 
                                            ref={ref}  
                                            type="password" 
                                            placeholder="Confirma tu contraseña" 
                                        />
                                    )}
                                />
                                {errors.registroConfirPassword && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.registroConfirPassword.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                        </Row>
                        <div className="d-flex justify-content-between mt-xs-5">
                            <Button variant="primary" onClick={() => handleHome()}>Volver a inicio</Button>
                            <Button variant="dark" type="submit">Siguiente</Button>
                        </div>
                    </Form> 
                </CCardBody>
            </CCard>
        </CCardGroup>
    )

}