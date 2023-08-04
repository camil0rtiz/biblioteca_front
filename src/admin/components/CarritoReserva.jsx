import { useDispatch, useSelector } from 'react-redux'
import { CAlert, CButton, CCloseButton, CListGroup, CListGroupItem, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle } from '@coreui/react'
import { onCloseCarritoAdmin } from '../../store/ui/uiSlice'
import { startPrestarLibro } from '../../store/prestamos/thunk'
import { onEliminarEjemplarCarrito } from '../../store/prestamos/carritoSlice'
import Swal from 'sweetalert2'

export const CarritoReserva = () => {

    const { user } = useSelector(state => state.auth)

    const { carritoAdminOpen } = useSelector(state => state.ui)

    const { carritoReserva } = useSelector(state => state.carrito)

    const { usuarioId } = useSelector(state => state.reserva)

    const dispatch = useDispatch()

    const handleClose = () => {

        dispatch(onCloseCarritoAdmin())

    }

    const handlePrestarLibro = () => {

        let estadoPrestamo = 1

        let descontarStock = 2

        let idBibliotecario = user.id

        let ejemplaresPrestados = []

        let reservaId = []

        carritoReserva.map((cart)=> {
            ejemplaresPrestados.push(cart.id)
            reservaId.push(cart.id_reserva)
        })

        Swal.fire({
            title: '¿Estás seguro de querer prestar el o los libro(s)?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo prestar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startPrestarLibro(ejemplaresPrestados, usuarioId, estadoPrestamo, idBibliotecario, descontarStock, reservaId))
            }
        })

    }

    const handleEliminarEjemplar = (id) => {

        dispatch(onEliminarEjemplarCarrito(id))

    }

    return (
        <COffcanvas className='bg-light' placement="end" visible={carritoAdminOpen} onHide={handleClose}>
            <COffcanvasHeader>
                <COffcanvasTitle>Carrito prestamos</COffcanvasTitle>
                <CCloseButton className="text-reset" onClick={handleClose} />
            </COffcanvasHeader>
            <COffcanvasBody>
                <CListGroup>
                    {carritoReserva.map((cart) => (
                        
                        <CListGroupItem key={cart.id} className='mb-2 d-flex justify-content-between align-items-center'>
                            <div>
                                <div>
                                    {cart.titulo_libro}
                                </div>
                                <div>
                                    {cart.dewey_unic_ejemplar}
                                </div>
                            </div>
                            <div>
                                <CButton color="danger" shape="rounded-pill" onClick={() => handleEliminarEjemplar(cart.id)}>Eliminar</CButton>
                            </div>
                        </CListGroupItem>
                    
                    ))}
                </CListGroup>
                {
                    (carritoReserva.length == 0) && (
                        <CAlert color="info">
                            <p>
                                Estimado, recuerde que puede reservar una cantidad máxima de 2 libros.
                            </p>
                        </CAlert>
                    )
                }
            </COffcanvasBody>
            {
                (carritoReserva.length > 0) && (
                    <div className="reservar-button border-top" >
                        <div className="d-grid p-3">
                            <CButton color="dark" size="lg" shape="rounded-pill" onClick={() => handlePrestarLibro()}>Prestar libro</CButton>
                        </div>
                    </div> 
                )
            }
        </COffcanvas>
    )
}
