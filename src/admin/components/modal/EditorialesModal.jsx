import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { onCloseModal } from '../../../store/ui/uiSlice'
import { Modal, Button, Form } from 'react-bootstrap'
import { startActualizarEditorial, startAgregarEditorial } from '../../../store/biblioteca/thunk'
import { onClearEditoriales } from '../../../store/biblioteca/editorialSlice'

export const EditorialesModal = () => {

    const { modalOpen } = useSelector(state => state.ui)

    const { initialEditorial } = useSelector(state => state.editorial)

    const dispatch = useDispatch()

    const {formState: { errors }, handleSubmit, control} = useForm({ defaultValues: initialEditorial })

    const onSubmit = ({id, editorialNombre}) => {

        if(id){
            
            dispatch(startActualizarEditorial({id, editorialNombre})) 

            return
            
        }

        dispatch(startAgregarEditorial({editorialNombre}))

    }

    const handleClose = () => {

        dispatch(onClearEditoriales())
        dispatch(onCloseModal())
    
    }


    return (
        <Modal size="lg" show={modalOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{initialEditorial.id ? 'Actualizar Editorial' : 'Agregar Editorial'}</Modal.Title>
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
                        <Form.Label>Nombre Editorial</Form.Label> 
                        <Controller 
                            control={control} 
                            name="editorialNombre" 
                            defaultValue=""
                            rules={{
                                required:{
                                    value: true,
                                    message: "Nombre editorial es obligatorio"
                                },
                                minLength: { value: 2, message: 'El nombre de editorial tiene que ser mas largo' }, 
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control 
                                    onChange={onChange} 
                                    value={value} 
                                    ref={ref}  
                                    type="text" 
                                    placeholder="Ingresa nombre editorial" 
                                />
                            )}
                        />
                        {errors.editorialNombre && 
                            <Form.Text className="text-danger" variant='danger'>
                                {errors.editorialNombre.message}
                            </Form.Text> 
                        } 
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        {initialEditorial.id ? 'Actualizar Editorial' : 'Agregar Editorial'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
