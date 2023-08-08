import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { Modal, Button, Form } from 'react-bootstrap'
import { onCloseModalEjemplar } from '../../../store/ui/uiSlice'
import bibliotecaApi from '../../../api/bibliotecaApi'
import { startAgregarEditorial, startAgregarEjemplar } from '../../../store/biblioteca/thunk'
import { customStyles } from '../../../helpers/customStyles.js'
import { onLoadingTrue } from '../../../store/biblioteca/ejemplarSlice'
import { validarAnio } from '../../../helpers/validarAnio'
import { validarNumeroEnRango } from '../../../helpers/validarNumeroEnRango'

export const EjemplaresModal = () => {

    const [editoriales, setEditoriales] = useState([])

    const { modalOpenEjemplar } = useSelector(state => state.ui)

    const { initialEjemplar, loadingSelect, ejemplarSave } = useSelector(state => state.ejemplar)

    const dispatch = useDispatch()

    const {formState: { errors }, handleSubmit, control} = useForm({defaultValues: initialEjemplar})

    useEffect(() => {

        getEditoriales()

    }, [ejemplarSave])

    const onSubmit = ({id, ejemplarEditorial, anioEdiEjemplar, isbnEjemplar, numPagEjemplar}) => {

        const estado_ejemplar = 1 
        let id_editorial = ejemplarEditorial.value
        let id_libro = id
        let deweyEjemplar = initialEjemplar.deweyLibro + ' ' + anioEdiEjemplar

        dispatch(startAgregarEjemplar({id_editorial, id_libro, anioEdiEjemplar, deweyEjemplar, isbnEjemplar, numPagEjemplar, estado_ejemplar}))

    }
    
    const handleClose = () => {

        dispatch(onCloseModalEjemplar())
    
    }

    const getEditoriales = async() => {

        try {
            
            const { data } = await bibliotecaApi.get('editoriales/listar')

            let arreglado = data.data.map( item => { 
                return { value: item.id , label : item.nombre_editorial }; 
            });

            setEditoriales(arreglado)

        } catch (error) {

            console.error(error)

        }

    }

    const handleAgregarEditorial = (editorial) => {

        const agregarEditorialSelect = 1

        let estadoEditorial = 1

        let editorialNombre  = editorial.replace(/(^|\n|\s)(\w)/g, (match) => match.toUpperCase())

        dispatch(onLoadingTrue())

        dispatch(startAgregarEditorial({editorialNombre, agregarEditorialSelect, estadoEditorial}))

    }

    return (
        <Modal size="lg" show={modalOpenEjemplar} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Ejemplar</Modal.Title>
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
                <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Controller 
                        control={control} 
                        name="isbnEjemplar" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'ISBN es obligatorio'
                            },
                            pattern: {
                                value: /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]*$/,
                                message: "ISBN no es válido",
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
                    {errors.isbnEjemplar && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.isbnEjemplar.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Número de páginas ejemplar</Form.Label>
                    <Controller 
                        control={control} 
                        name="numPagEjemplar" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: 'Número de páginas es obligatorio',
                                validate: {positive: v => validarNumeroEnRango(v) == true || 'Número de páginas debe estar entre 1 a 10000'}
                            },
                        }}
                        render={({ field: {onChange, value, ref } }) => (
                            <Form.Control
                                onChange={onChange} 
                                value={value}
                                ref={ref}  
                                type="Number"
                                min="1" 
                                max="10000" 
                                step="1"
                                placeholder="Ingrese número páginas del ejemplar" 
                            />
                        )}
                    />
                    {errors.numPagEjemplar && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.numPagEjemplar.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Año edición</Form.Label> 
                    <Controller 
                        control={control} 
                        name="anioEdiEjemplar" 
                        defaultValue=""
                        rules={{
                            required:{
                                value: true,
                                message: "Año edición editorial es obligatorio"
                            },
                            validate: {positive: v => validarAnio(v) == true || 'El año no es válido. Ingrese un año entre 1800 y el año actual.'} 
                        }}
                        render={({ field: { onChange, value, ref } }) => (
                            <Form.Control 
                                onChange={onChange} 
                                value={value} 
                                ref={ref}  
                                type="number"
                                min="1800" 
                                max="2099" 
                                step="1"
                                placeholder="Ingresa año edición ejemplar" 
                            />
                        )}
                    />
                    {errors.anioEdiEjemplar && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.anioEdiEjemplar.message}
                        </Form.Text> 
                    } 
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Seleccione editorial</Form.Label>
                    <Controller
                        name="ejemplarEditorial"
                        control={control}
                        rules={{
                            required:{
                                value: true,
                                message: "Seleccione una editorial"
                            }
                        }}
                        render={({ field, fieldState: { invalid } }) => (
                            <CreatableSelect
                                {...field}
                                styles={customStyles} 
                                options={editoriales}
                                isDisabled={loadingSelect}
                                isLoading={loadingSelect}
                                noOptionsMessage={() => "No hay resultados"}
                                formatCreateLabel={()=>'Agregar nueva editorial'}
                                placeholder='Seleccione editorial'
                                onCreateOption={(value) => handleAgregarEditorial(value)}
                            />
                        )}   
                    />
                    {errors.ejemplarEditorial && 
                        <Form.Text className="text-danger" variant='danger'>
                            {errors.ejemplarEditorial.message}
                        </Form.Text> 
                    }     
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" type='submit'>
                    Agregar Ejemplar
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    )
}
