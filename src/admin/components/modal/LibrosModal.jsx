import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller, useController } from 'react-hook-form'
import { Modal, Button, Form } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import ReactQuill from 'react-quill'
import bibliotecaApi from '../../../api/bibliotecaApi'
import { onClearLibros } from '../../../store/biblioteca/libroSlice'
import { onCloseModal } from '../../../store/ui/uiSlice'
import { startActualizarLibro, startAgregarAutor, startAgregarLibro } from '../../../store/biblioteca/thunk'
import 'react-quill/dist/quill.snow.css'
import { customStyles } from '../../../helpers/customStyles.js'
import { onLoadingTrue } from '../../../store/biblioteca/autorSlice'

export const LibrosModal = () => {

    const [autores, setAutores] = useState([])

    const [isLoading, setIsLoading] = useState(false);

    const { modalOpen } = useSelector(state => state.ui)

    const { initialLibro } = useSelector(state => state.libro)

    const { autorSave } = useSelector(state => state.autor)

    const dispatch = useDispatch()
    
    const {formState: { errors }, handleSubmit, setValue, control} = useForm({ defaultValues: initialLibro })

    const resena = useController({
        name: 'resenaLibro',
        control,
        rules: { 
            required:'Reseña libro es obligatoria',
        },
        defaultValues: initialLibro
    })

    useEffect(() => {
        
        getAutores()

    }, [autorSave])

    initialLibro.autorLibro.forEach((item) => {

        for (let index in autores) {

            if (autores[index].value == item.value) {
                autores.splice(index, 1);
            }
        }

    });

    const onSubmit = ({id,tituloLibro,isbnLibro,deweyLibro,numPagLibro,anioPublicacionLibro,resenaLibro,autorLibro,portadaLibro}) => {

        console.log({id,tituloLibro,isbnLibro,deweyLibro,numPagLibro,anioPublicacionLibro,resenaLibro,autorLibro,portadaLibro});

        let portada = portadaLibro

        const estadoLibro = 1

        let idAutor = Object.assign(autorLibro.map(autor => autor.value))

        if(id){
        
            dispatch(startActualizarLibro({id, tituloLibro, isbnLibro, deweyLibro, numPagLibro, anioPublicacionLibro, resenaLibro, idAutor}))  

            return          
        }

        dispatch(startAgregarLibro({tituloLibro, isbnLibro, deweyLibro, numPagLibro, anioPublicacionLibro, resenaLibro, estadoLibro, idAutor, portada}))

    }
    
    const handleClose = () => {

        dispatch(onClearLibros())
        dispatch(onCloseModal())
    
    }

    const getAutores = async() => {

        try {
            
            const {data} = await bibliotecaApi.get('autores/listar')

            let arreglado = data.data.map( item => { 
                return { value: item.id , label : item.nombre_autor }; 
            });

            setAutores(arreglado)

        } catch (error) {

            console.error(error)

        }

    }

    const handleFileChange = (name) => (e) => {

        const file = e.target.files[0]

        setValue(name, file)
        
    }

    const handleAgregarAutor = (autor) => {

        const agregarAutorSelect = 1

        const autorNombre = autor

        dispatch(onLoadingTrue())

        dispatch(startAgregarAutor({autorNombre, agregarAutorSelect}))

    }

    return (
        <Modal size="lg" show={modalOpen} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{initialLibro.id ? 'Actualizar Libro' : 'Agregar Libro'}</Modal.Title>
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
                    <Form.Label>Titulo libro</Form.Label> 
                    <Controller 
                        control={control} 
                        name="tituloLibro" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'Título libro es obligatorio'
                            },
                            minLength: { value: 2, message: 'El titulo tiene que ser mas largo' }, 
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                            <Form.Control 
                                onChange={onChange} 
                                value={value} 
                                ref={ref}  
                                type="text" 
                                placeholder="ingrese título del libro"
                            />
                        )}
                    />
                    {errors.tituloLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.tituloLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Controller 
                        control={control} 
                        name="isbnLibro" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'ISBN es obligatorio'
                            },
                            // validate:{
                            //     valido: v => validaIsbn(v) || 'ISBN no es válido'
                            // } 
                        }}
                        render={({ field: {onChange, value, ref } }) => (
                            <Form.Control
                                onChange={onChange} 
                                value={value}
                                ref={ref}  
                                type="text"
                                placeholder="ingrese ISBN" 
                            />
                        )}
                    />
                    {errors.isbnLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.isbnLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Dewey</Form.Label>
                    <Controller 
                        control={control} 
                        name="deweyLibro" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'Dewey libro es obligatorio'
                            },
                        }}
                        render={({ field: {onChange, value, ref } }) => (
                            <Form.Control
                                onChange={onChange} 
                                value={value}
                                ref={ref}  
                                type="text"
                                placeholder="ingrese dewey del libro" 
                            />
                        )}
                    />
                    {errors.deweyLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.deweyLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Número de páginas libro</Form.Label>
                    <Controller 
                        control={control} 
                        name="numPagLibro" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'Número de páginas es obligatorio'
                            },
                        }}
                        render={({ field: {onChange, value, ref } }) => (
                            <Form.Control
                                onChange={onChange} 
                                value={value}
                                ref={ref}  
                                type="Number"
                                min="1" 
                                max="5000" 
                                step="1"
                                placeholder="ingrese número paginas del libro" 
                            />
                        )}
                    />
                    {errors.numPagLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.numPagLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Año publicación del libro</Form.Label>
                    <Controller 
                        control={control} 
                        name="anioPublicacionLibro" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'El año de publicación del libro es obligatoria'
                            },
                        }}
                        render={({ field: {onChange, value, ref } }) => (
                            <Form.Control
                                onChange={onChange} 
                                value={value}
                                ref={ref}  
                                type="Number"
                                min="1900" 
                                max="2099" 
                                step="1"
                                placeholder="ingrese año de publicación del libro"
                            />
                        )}
                    />
                    {errors.anioPublicacionLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.anioPublicacionLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Subir imagen de portada</Form.Label>
                    <Controller 
                        control={control} 
                        name="portadaLibro" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: "Imagen de portada es obligatoria"
                            },
                        }}
                        render={({ field: {ref } }) => (
                            <Form.Control 
                                onChange={handleFileChange("portadaLibro")} 
                                ref={ref}  
                                type="file"
                            />
                        )}
                    />
                    {errors.portadaLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.portadaLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Seleccione autor(es)</Form.Label>
                    <Controller
                        name="autorLibro"
                        control={control}
                        rules={{
                            required:{
                                value: true,
                                message: "Seleccione un autor"
                            },
                        }}
                        render={({ field, fieldState: { invalid } }) => (
                            <CreatableSelect
                                {...field}
                                styles={customStyles} 
                                options={autores}
                                isMulti
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                noOptionsMessage={() => "No hay resultados"}
                                formatCreateLabel={()=>'Agregar nuevo autor'}
                                placeholder='Seleccione autor o autores'
                                onCreateOption={(value) => handleAgregarAutor(value)}
                            />
                        )}
                        
                    />
                    {errors.autorLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.autorLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Descripcion evento</Form.Label>
                    <ReactQuill
                        value={resena.field.value}
                        onChange={resena.field.onChange}
                        placeholder='ingrese una reseña'
                    />
                    {errors.resenaLibro && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.resenaLibro.message}
                        </Form.Text> 
                    } 
                </Form.Group>                                  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" type='submit'>
                    {initialLibro.id ? 'Actualizar Libro' : 'Agregar Libro'}
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}
