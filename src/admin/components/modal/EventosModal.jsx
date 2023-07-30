import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller, useController } from 'react-hook-form'
import { Modal, Button, Form } from 'react-bootstrap'
import ReactSelect from "react-select"
import ReactQuill from 'react-quill'
import { onCloseModal } from '../../../store/ui/uiSlice'
import 'react-quill/dist/quill.snow.css'
import bibliotecaApi from '../../../api/bibliotecaApi'
import { startActualizarEvento, startAgregarEvento } from '../../../store/biblioteca/thunk'
import { onClearEventos } from '../../../store/biblioteca/eventoSlice'
import '../../../assets/css/eventos.css'
import { customStyles } from '../../../helpers/customStyles.js'
import { formateoMayusculas } from '../../../helpers/formateoMayusculas'

export const EventosModal = () => {

    const [ categorias, setCategoria ] = useState([])

    const { modalOpen } = useSelector(state => state.ui)

    const { user } = useSelector(state => state.auth)

    const { initialEvento } = useSelector(state => state.evento)
    
    const dispatch = useDispatch()

    const { formState: { errors }, handleSubmit, setValue, control } = useForm({defaultValues: initialEvento})
    
    const descripcion = useController({
        name: 'eventoDescripcion',
        control,
        rules: { 
            required:'Descripción evento es obligatorio',
        },
        defaultValues: initialEvento
    })

    useEffect(() => {

        getEventos()

    }, [])

    const getEventos = async() => {

        try {
            
            const { data } = await bibliotecaApi.get('categorias/listar')

            let arreglado = data.data.map( item => { 
                return { value: item.id , label : item.tipo_categoria }; 
            });

            setCategoria(arreglado)

        } catch (error) {

            console.error(error)

        }

    }

    const handleFileChange = (name) => (e) => {

        const file = e.target.files[0]

        setValue(name, file)
        
    }

    const handleClose = () => {

        dispatch(onClearEventos())
        dispatch(onCloseModal())
    
    }

    const onSubmit = ({id,eventoTitulo,eventoTipo,eventoImagen,eventoDescripcion}) => {

        const id_usuario = user.id
        const id_categoria = eventoTipo.value
        const estado_evento = 1

        if(id){

            dispatch(startActualizarEvento({id,eventoTitulo,eventoDescripcion,id_categoria}))

            return

        }

        dispatch(startAgregarEvento({eventoTitulo,eventoImagen,eventoDescripcion,id_usuario,id_categoria,estado_evento}))
    
    }

    return (
        <Modal size="lg" show={modalOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Evento</Modal.Title>
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
                        <Form.Label>Titulo evento</Form.Label> 
                        <Controller 
                            control={control} 
                            name="eventoTitulo" 
                            defaultValue=""
                            rules={{
                                required:{
                                    value: true,
                                    message: "Titulo evento es obligatorio"
                                },
                                minLength: { value: 2, message: 'El titulo tiene que ser mas largo' }, 
                            }}
                            render={({ field: { onChange, value, ref } }) => (
                                <Form.Control 
                                    onChange={e => onChange(formateoMayusculas(e.target.value))}  
                                    value={value} 
                                    ref={ref}  
                                    type="text" 
                                    placeholder="Ingresa título evento" 
                                />
                            )}
                        />
                        {errors.eventoTitulo && 
                            <Form.Text className="text-danger" variant='danger'>
                                {errors.eventoTitulo.message}
                            </Form.Text> 
                        } 
                    </Form.Group>
                    {
                        (!initialEvento.id) && (
                            
                            <Form.Group controlId="formFile" className="mb-3">
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
                                        />
                                    )}
                                />
                                {errors.eventoImagen && 
                                    <Form.Text className="text-danger" variant='danger'>
                                        {errors.eventoImagen.message}
                                    </Form.Text> 
                                } 
                            </Form.Group>
                        )
                    }
                    <Form.Group className="mb-3">
                        <Form.Label>Seleciona tipo de evento</Form.Label>
                        <Controller
                            name="eventoTipo"
                            control={control}
                            rules={{
                                required:{
                                    value: true,
                                    message: "Tipo de evento es obligatorio"
                                },
                            }}
                            render={({ field, fieldState}) => (
                                <ReactSelect
                                    {...field}
                                    styles={customStyles} 
                                    options={categorias}
                                    placeholder='Seleccione tipo de evento'
                                    noOptionsMessage={() => "No hay resultados"}
                                />
                            )}   
                        />
                        {errors.eventoTipo && 
                            <Form.Text className="text-danger" variant='danger'>
                                {errors.eventoTipo.message}
                            </Form.Text> 
                        } 
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Descripcion evento</Form.Label>
                        <ReactQuill
                            value={descripcion.field.value}
                            onChange={descripcion.field.onChange}
                            placeholder='Ingrese descripción evento'
                        />
                        {errors.eventoDescripcion && 
                            <Form.Text className="text-danger" variant='danger'>
                                {errors.eventoDescripcion.message}
                            </Form.Text> 
                        } 
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit'>
                        Agregar Evento
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
