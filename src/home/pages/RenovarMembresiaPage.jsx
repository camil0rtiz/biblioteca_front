import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CAlert, CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { validaImagenes } from '../../helpers/validarImagenes'
import ReactSelect from 'react-select'
import Swal from 'sweetalert2'
import { customStyles } from '../../helpers/customStyles'
import bibliotecaApi from '../../api/bibliotecaApi'
import { startRenovarMembresiaHome } from '../../store/auth/thunk'

export const RenovarMembresiaPage = () => {

    const [membresia, setMembresia] = useState([])

    const { user } = useSelector(state => state.auth)

    const { succesRenovacion, errorRenovacion } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { formState: { errors }, handleSubmit, setValue, reset, control} = useForm()

    const handleFileChange = (name) => (e) => {

        const file = e.target.files[0]

        setValue(name, file)
        
    }

    useEffect(() => {

        getMembresia()

    }, [])

    const onSubmit = ({registroTipoMembresia, registroComproTransferencia, registroComproDomicilio}) => {

        let estadoUsuario = 2

        let idMembresia = registroTipoMembresia.value

        Swal.fire({
            title: '¿Estás seguro de querer renovar la membresía?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo renovar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRenovarMembresiaHome({id: user.id, idMembresia, registroComproTransferencia, registroComproDomicilio, estadoUsuario}))
            }
        })

    }

    const getMembresia = async() => {

        try {
            
            const {data} = await bibliotecaApi.get('membresias/listar')

            let membresiasArregladas = data.data.map( item => { 

                return { value: item.id , label : item.tipo_membresia }

            })

            setMembresia(membresiasArregladas)

        } catch (error) {

            console.error(error)

        }

    }

    const handleHome = () => {

        navigate('-1')
        
    }

    return (
        <div className="bg-light mt-5">
            <CContainer>
                <CRow>
                    {
                        (succesRenovacion) && (
                            <CAlert color="success">
                                <p>
                                    La renovación de su membresía ha sido registrada con éxito.
                                </p>
                            </CAlert>
                        )
                    }

                    {
                        (errorRenovacion.error) && (
                            <CAlert color="danger">
                                <p>
                                    {errorRenovacion.errorMessage}
                                </p>
                            </CAlert>
                        )
                    }
                </CRow>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <h3>Renovar Membresía</h3>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Form.Group  className="mb-3">
                                            <Form.Label>Tipo membresía</Form.Label>
                                            <Controller
                                                name="registroTipoMembresia"
                                                control={control}
                                                rules={{
                                                    required:{
                                                        value: true,
                                                        message: "Seleccione un Membresía"
                                                    },
                                                }}
                                                render={({ field, fieldState: { invalid } }) => (
                                                    <ReactSelect
                                                        {...field}
                                                        styles={customStyles}
                                                        options={membresia}
                                                        noOptionsMessage={() => "No hay resultados"}
                                                        isClearable
                                                        placeholder='Seleccione una membresia'
                                                    />
                                                )} 
                                            />
                                            {errors.registroTipoMembresia && 
                                                <Form.Text className="text-danger" variant='danger'>
                                                    {errors.registroTipoMembresia.message}
                                                </Form.Text> 
                                            } 
                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Subir comprobante de transferencia</Form.Label>
                                            <Controller 
                                                control={control} 
                                                name="registroComproTransferencia" 
                                                defaultValue=""
                                                rules={{
                                                    required:{
                                                        value: true,
                                                        message: "Comprobante de transferencia es obligatorio"
                                                    },
                                                    validate: {positive: v => validaImagenes(v,1) == true || 'Formato de imagen no válido. Solo se permiten archivos PNG, JPG y JPEG.'} 
                                                }}
                                                render={({ field: { ref } }) => (
                                                    <Form.Control 
                                                        onChange={handleFileChange("registroComproTransferencia")} 
                                                        ref={ref} 
                                                        type="file" 
                                                    />
                                                )}
                                            />
                                            {errors.registroComproTransferencia && 
                                                <Form.Text className="text-danger" variant='danger'>
                                                    {errors.registroComproTransferencia.message}
                                                </Form.Text> 
                                            }
                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Subir comprobante de domicilio o boleta de servicio</Form.Label>
                                            <Controller 
                                                control={control} 
                                                name="registroComproDomicilio" 
                                                defaultValue=""
                                                rules={{
                                                    required:{
                                                        value: true,
                                                        message: "Comprobante de domicilio es obligatorio"
                                                    },
                                                    validate: {positive: v => validaImagenes(v,1) == true || 'Formato de imagen no válido. Solo se permiten archivos PNG, JPG y JPEG.'} 
                                                }}
                                                render={({ field: { ref } }) => (
                                                    <Form.Control 
                                                        onChange={handleFileChange("registroComproDomicilio")} 
                                                        ref={ref} 
                                                        type="file" 
                                                    />
                                                )}
                                            />
                                            {errors.registroComproDomicilio && 
                                                <Form.Text className="text-danger" variant='danger'>
                                                    {errors.registroComproDomicilio.message}
                                                </Form.Text> 
                                            }
                                        </Form.Group>
                                        <div className="d-flex justify-content-between mt-xs-5">
                                            <Button variant="primary" onClick={() => handleHome()}>Volver a inicio</Button>
                                            <Button variant="dark" type="submit">Renovar</Button>
                                        </div>
                                    </Form>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}
