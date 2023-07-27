import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Modal, Button, Form } from 'react-bootstrap'
import { onCloseModalRenovar } from '../../../store/ui/uiSlice'
import { onClearUser } from '../../../store/auth/userSlice'
import ReactSelect from 'react-select'
import { customStyles } from '../../../helpers/customStyles'
import bibliotecaApi from '../../../api/bibliotecaApi'
import { startRenovarMembresia } from '../../../store/auth/thunk'

export const RenovarModal = () => {

    const [membresia, setMembresia] = useState([])

    const { initialUsuario } = useSelector(state => state.user)

    const { modalOpenRenovar } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const {formState: { errors }, handleSubmit, setValue , control} = useForm({defaultValues: initialUsuario})

    useEffect(() => {

        getMembresia()

    }, [])

    const onSubmit = ({id, registroTipoMembresia}) => {
        
        let estadoUsuario = 1

        let idMembresia = registroTipoMembresia.value

        dispatch(startRenovarMembresia(id, idMembresia, estadoUsuario))

    }

    const handleClose = () => {

        dispatch(onCloseModalRenovar())
        dispatch(onClearUser())

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

    return (
        <Modal size="xs" show={modalOpenRenovar} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Renovar membresía</Modal.Title>
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
                    <Form.Group  className="mb-1">
                        <Form.Label>Membresía</Form.Label>
                        <Controller
                            name="registroTipoMembresia"
                            control={control}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Renovar membresía
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
