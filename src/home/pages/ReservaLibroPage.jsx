import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { CAlert, CBreadcrumb, CBreadcrumbItem, CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CContainer, CHeaderDivider, CImage, CListGroup, CListGroupItem, CRow } from "@coreui/react"
import { startReservarLibro } from "../../store/prestamos/thunk"
import Swal from 'sweetalert2'
import '../../assets/css/reservas.css'
import { onEliminarLibroCarrito } from "../../store/prestamos/carritoSlice"

export const ReservaLibroPage = () => {

    const { user } = useSelector(state => state.auth)

    const { errorReserva, succesReserva } = useSelector(state => state.reserva)

    console.log(succesReserva);

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const handleReserva = () => {

        let estadoReserva = 1

        let librosReservados = []

        carrito.map((cart)=> {
            librosReservados.push(cart.id)
        })

        Swal.fire({
            title: '¿Estás seguro de querer reservar el o los libro(s)?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo reservar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startReservarLibro(librosReservados, user.id, estadoReserva))
            }
        })

    }

    const handleEliminarLibro = (id) => {

        dispatch(onEliminarLibroCarrito(id))

    }

    return (
        <>
            <CHeaderDivider/>
            <CContainer fluid >
                <CBreadcrumb className='"m-0 ms-2 mt-3'>
                    <CBreadcrumbItem to='home'>Home</CBreadcrumbItem>
                    <CBreadcrumbItem active>Reserva</CBreadcrumbItem>
                </CBreadcrumb>
            </CContainer>
            <CContainer>
                <CRow>
                    {
                        (succesReserva) && (
                            <CAlert color="success">
                                <p>
                                    Su reserva ha sido registrada con éxito. Debe dirigirse a la biblioteca para buscar su libro.
                                </p>
                            </CAlert>
                        )
                    }
                    {
                        (errorReserva.error) && (
                            <CAlert color="danger">
                                <p>
                                    {errorReserva.errorMessage}
                                </p>
                            </CAlert>
                        )
                    }
                </CRow>
                <CRow>
                        {
                            (carrito.length == 0) ? (

                                <CAlert color="info">
                                    <p>
                                        Estimado lector, recuerde que puede reservar una cantidad máxima de 2 libros.
                                    </p>
                                </CAlert>

                            ):(
                                <> 
                                    <CCol className="mb-3">
                                        {carrito.map((cart) => (
                                            <CCard key={cart.id}>
                                                <CRow className="g-0">
                                                    <CCol md={4} className="d-flex align-items-center justify-content-center">
                                                        {/* <CCardImage src={`http://localhost/biblioteca_vn_backend/storage/app/public/${cart.url}`} /> */}
                                                        <CCardImage src={`http://134.122.124.97/storage/${cart.url}`} />
                                                    </CCol>
                                                    <CCol md={8}>
                                                        <CCardBody className="d-flex flex-column align-items-center">
                                                            <div className="text-center">
                                                                <CCardTitle>{cart.titulo_libro}</CCardTitle>
                                                            </div>
                                                            <div className="mt-4 d-flex justify-content-center">
                                                                <CButton onClick={() => handleEliminarLibro(cart.id)} color="danger">
                                                                    Eliminar
                                                                </CButton>
                                                            </div>
                                                        </CCardBody>
                                                    </CCol>
                                                </CRow>
                                            </CCard>            
                                        ))}
                                    </CCol>
                                    <CCol lg="3">
                                        <div className="d-grid mt-2">
                                            <CButton onClick={() => handleReserva()} color="dark" size="lg" >Reservar </CButton>
                                        </div>
                                        <div className="d-grid mt-2">
                                            <CButton color="primary" size="lg" to="/" component={NavLink} >Volver a inicio</CButton>
                                        </div>
                                    </CCol>
                                </>
                            )
                        }
                </CRow>
            </CContainer>
        
        </>
    )
}
