import { useDispatch, useSelector } from "react-redux"
import { CBreadcrumb, CBreadcrumbItem, CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CContainer, CHeaderDivider, CImage, CListGroup, CListGroupItem, CRow } from "@coreui/react"
import '../../assets/css/navbar.css'
import { startReservarLibro } from "../../store/prestamos/thunk"

export const ReservaLibroPage = () => {

    const { user } = useSelector(state => state.auth)

    const { carrito } = useSelector(state => state.carrito)

    const dispatch = useDispatch()

    const handleReserva = () => {

        let librosReservados = []

        carrito.map((cart)=> {
            librosReservados.push(cart.id)
        })

        dispatch(startReservarLibro(librosReservados, user.id))

    }

    return (
        <>
            <CHeaderDivider/>
            <CContainer fluid >
                <CBreadcrumb className='"m-0 ms-2 mt-3'>
                    <CBreadcrumbItem to='home'>Home</CBreadcrumbItem>
                    <CBreadcrumbItem active>Libros</CBreadcrumbItem>
                </CBreadcrumb>
            </CContainer>
            <CContainer>
                <CRow>
                    <CCol>
                        {carrito.map((cart) => (
                            <CCard key={cart.id}>
                                <CRow className="g-0">
                                    <CCol md={4}>
                                        <CCardImage src={`http://134.122.124.97/storage/${cart.url}`}/>
                                    </CCol>
                                    <CCol md={8}>
                                        <CCardBody className='d-flex justify-content-center align-items-center'>
                                            <CCardTitle>{cart.titulo_libro}</CCardTitle>
                                            <CCardText>
                                            </CCardText>
                                        </CCardBody>
                                    </CCol>
                                </CRow>
                            </CCard>            
                        ))}
                    </CCol>
                    <CCol lg="3">
                        <div className="d-grid mt-4">
                            <CButton onClick={() => handleReserva()} color="dark" size="lg" >Reservar </CButton>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
        
        </>
    )
}
