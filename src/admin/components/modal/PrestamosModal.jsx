import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, ListGroup, Form } from 'react-bootstrap'
import ReactSelect from "react-select"
import { onCloseModalPrestamos } from '../../../store/ui/uiSlice'
import { onEliminarPrestamoCarrito } from '../../../store/prestamos/carritoSlice'
import { customStyles } from '../../../helpers/customStyles'
import bibliotecaApi from '../../../api/bibliotecaApi'
import { startPrestarLibro } from '../../../store/prestamos/thunk'

export const PrestamosModal = () => {

    const [ usuarios, setUsuarios ] = useState([])

    const { user } = useSelector(state => state.auth)

    const { modalPrestamos } = useSelector(state => state.carrito)

    const { modalOpenPrestamos } = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const { formState: { errors }, handleSubmit, control } = useForm()

    useEffect(() => {

        getUsuarios()

    }, [])

    const getUsuarios = async() => {

        try {
            
            const { data } = await bibliotecaApi.get('usuarios/listarHabilitados')

            let arreglado = data.data.map( item => { 
                return { value: item.id , label : `${item.rut_usuario} - ${item.nombre_usuario}  ${item.apellido_pate_usuario}`}; 
            });

            setUsuarios(arreglado)

        } catch (error) {

            console.error(error)

        }

    }


    const handleClose = () => {

        dispatch(onCloseModalPrestamos())

    }

    const handleEliminarEjemplar = (id) => {

        dispatch(onEliminarPrestamoCarrito(id))

    }

    const onSubmit = ({idVecino}) => {
        
        let usuarioId = idVecino.value
        
        let estadoPrestamo = 1

        let descontarStock = 1

        let idBibliotecario = user.id

        let ejemplaresPrestados = []

        modalPrestamos.map((cart)=> {
            ejemplaresPrestados.push(cart.id)
        })

        dispatch(startPrestarLibro(ejemplaresPrestados, usuarioId, estadoPrestamo, idBibliotecario, descontarStock))

    }

    return (
        <Modal size="xs" show={modalOpenPrestamos} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Prestar libros</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Selecione vecino lector</Form.Label>
                        <Controller
                            name="idVecino"
                            control={control}
                            rules={{
                                required:{
                                    value: true,
                                    message: "Usuarios es obligatorio"
                                },
                            }}
                            render={({ field, fieldState}) => (
                                <ReactSelect
                                    {...field}
                                    styles={customStyles} 
                                    options={usuarios}
                                    placeholder='Seleccione un vecino lector'
                                    noOptionsMessage={() => "No hay resultados"}
                                />
                            )}   
                        />
                        {errors.idVecino && 
                            <Form.Text className="text-danger" variant='danger'>
                                {errors.idVecino.message}
                            </Form.Text> 
                        } 
                    </Form.Group>
                    <ListGroup variant="light">
                        {modalPrestamos.map((cart) => (
                            <ListGroup.Item  key={cart.id} className='mb-2 d-flex justify-content-between align-items-center'>
                                <div>
                                    <div>
                                        {cart.titulo_libro}
                                    </div>
                                    <div>
                                        {cart.dewey_unic_ejemplar}
                                    </div>
                                </div>
                                <div>
                                    <Button variant='danger' shape="rounded-pill" onClick={() => handleEliminarEjemplar(cart.id)}>Eliminar</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='submit'>
                        Prestar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
