import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Button, Form } from 'react-bootstrap'
import { onCloseModalPortadaEvento } from "../../../store/ui/uiSlice"
import { startCambiarPortadaEvento } from "../../../store/biblioteca/thunk"
import { validaImagenes } from "../../../helpers/validarImagenes"

export const PortadaEventoModal = () => {

    const { modalOpenPortadaEvento } = useSelector(state => state.ui)

    const { initialEvento } = useSelector(state => state.evento)

    const dispatch = useDispatch()

    const {formState: { errors }, handleSubmit, setValue , control} = useForm({defaultValues: initialEvento})

    const handleFileChange = (name) => (e) => {

        const file = e.target.files[0]

        setValue(name, file)
        
    }

    const onSubmit = ({id, idPortada, eventoImagen}) => {

        dispatch(startCambiarPortadaEvento(id, idPortada, eventoImagen))

    }

    const handleClose = () => {
        
        dispatch(onCloseModalPortadaEvento())

    }

    return (
        <Modal size="xl" show={modalOpenPortadaEvento} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Cambiar portada</Modal.Title>
        </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group>
                        <Controller 
                            control={control} 
                            name="id" 
                            defaultValue=""
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control 
                                    onChange={onChange} 
                                    value={value} 
                                    ref={ref}  
                                    type="hidden" 
                                />
                            )}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Controller 
                            control={control} 
                            name="idPortada" 
                            defaultValue=""
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control 
                                    onChange={onChange} 
                                    value={value} 
                                    ref={ref}  
                                    type="hidden" 
                                />
                            )}
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-center align-items-center mb-3'>
                        <img src={`http://localhost/biblioteca_vn_backend/storage/app/public/${initialEvento.url}`} alt="Portada del libro" width="500" />
                    </div>
                    <Form.Group controlId="formFile">
                        <Form.Label>Subir imagen</Form.Label>
                        <Controller 
                            control={control} 
                            name="eventoImagen" 
                            defaultValue=""
                            rules={{
                                required:{
                                    value: true,
                                    message: "Imagen es obligatoria"
                                },
                                validate: {positive: v => validaImagenes(v,1) == true || 'Formato de imagen no válido. Solo se permiten archivos PNG, JPG y JPEG.'} 
                            }}
                            render={({ field: {ref } }) => (
                                <Form.Control 
                                    onChange={handleFileChange("eventoImagen")} 
                                    ref={ref}  
                                    type="file"
                                    multiple
                                />
                            )}
                        />
                        {errors.eventoImagen && 
                            <Form.Text className="text-danger" variant='danger'>
                                {errors.eventoImagen.message}
                            </Form.Text> 
                        } 
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Cambiar Portada
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
