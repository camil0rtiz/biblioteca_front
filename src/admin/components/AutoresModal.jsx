import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Modal, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { startActualizarAutor, startAgregarAutor } from '../../store/biblioteca/thunk'
import { onCloseModal } from '../../store/ui/uiSlice'
import { onClearAutores } from '../../store/biblioteca/autorSlice'

export const AutoresModal = () => {

    const { modalOpen } = useSelector(state => state.ui)

    const { initialAutor } = useSelector(state => state.autor)

    const dispatch = useDispatch()

    const {formState: { errors }, handleSubmit, control} = useForm({ defaultValues: initialAutor })

    const onSubmit = ({id,autorNombre}) => {

        if(id){
            
            dispatch(startActualizarAutor({id,autorNombre}))  

            return          
        }

        dispatch(startAgregarAutor({autorNombre}))

    }
    
    const handleClose = () => {

        dispatch(onClearAutores())
        dispatch(onCloseModal())
    
    }

    return (
        <Modal size="lg" show={modalOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{initialAutor.id ? 'Actualizar Autor' : 'Agregar Autor'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                <Form.Group className="mb-3" >
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
                    <Form.Label>Nombre Autor</Form.Label> 
                    <Controller 
                        control={control} 
                        name="autorNombre" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'Nombre autor es obligatorio'
                            },
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                            <Form.Control 
                                onChange={onChange} 
                                value={value} 
                                ref={ref}  
                                type="text" 
                                placeholder="ingrese nombre autor"
                            />
                        )}
                    />
                    {errors.autorNombre && 
                        <Form.Text className="text-danger" variant='danger'>
                            <FontAwesomeIcon icon={faCircleExclamation} /> {errors.autorNombre.message}
                        </Form.Text> 
                    } 
                </Form.Group>                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" type='submit'>
                    {initialAutor.id ? 'Actualizar Autor' : 'Agregar Autor'}
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}
