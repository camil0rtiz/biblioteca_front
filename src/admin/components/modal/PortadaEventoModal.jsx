import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Button, Form } from 'react-bootstrap'
import { onCloseModalPortadaEvento } from "../../../store/ui/uiSlice"
import { startCambiarPortadaEvento } from "../../../store/biblioteca/thunk"

export const PortadaEventoModal = () => {

    const { modalOpenPortadaEvento } = useSelector(state => state.ui)

    const { initialEvento } = useSelector(state => state.evento)

    const dispatch = useDispatch()

    const {formState: { errors }, handleSubmit, setValue , control} = useForm({defaultValues: initialEvento})

    const handleFileChange = (name) => (e) => {

        const files = Array.from(e.target.files)
        
        setValue(name, files)
    
    }

    const onSubmit = ({id, eventoImagen}) => {

        dispatch(startCambiarPortadaEvento(id, eventoImagen))

    }

    const handleClose = () => {
        
        dispatch(onCloseModalPortadaEvento())

    }

    return (
        <Modal size="xs" show={modalOpenPortadaEvento} onHide={handleClose} animation={false}>
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
                    <div className='d-flex justify-content-center align-items-center mb-3'>
                        {/* <img src={`http://localhost/biblioteca_vn_backend/storage/app/public/${initialLibro.url}`} alt="Portada del libro" width="200" /> */}
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
