import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CBreadcrumb, CBreadcrumbItem, CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CContainer, CHeaderDivider, CRow } from '@coreui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from "swiper";
import { startListarEventosHome } from '../../store/biblioteca/thunk';
import '../../assets/css/eventos.css'

export const EventosPages = () => {

    const { eventosHome, noticiasHome } = useSelector(state => state.evento)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarEventosHome())

    }, [])

    return (
        
        <>
            <CHeaderDivider/>
            <CContainer fluid >
                <CBreadcrumb className='"m-0 ms-2 mt-3'>
                    <CBreadcrumbItem to='home'>Home</CBreadcrumbItem>
                    <CBreadcrumbItem active>Libros</CBreadcrumbItem>
                </CBreadcrumb>
            </CContainer>
            <CContainer lg>
                <CRow>
                    <CCol className="d-flex justify-content-center">
                        <h3>Eventos</h3>
                    </CCol>
                </CRow>    
                <CRow className="g-5">
                    {eventosHome.map((evento) => (
                        <CCol xl={6} key={evento.id}>
                            <CCard className="card-evento">
                                <CCardBody>
                                    <div className='card_imagen-evento'>
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            breakpoints={{
                                                1200: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 30,
                                                }
                                            }}
                                            spaceBetween={50}
                                            navigation={true} 
                                            slidesPerView={1}
                                            autoplay={{
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            }}
                                            pagination={{
                                                clickable: true,
                                            }}    
                                        >
                                            {evento.archivos.map((archivo) => (
                                                <SwiperSlide key={archivo.id}>
                                                    <CCardImage className='imagen-evento' src={`http://134.122.124.97/storage/${archivo.url}`} alt={`Imagen ${archivo.id}`} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                    <div className='card_descripcion_evento'>
                                        <CCardTitle className='text-center'>{evento.titulo_evento}</CCardTitle>
                                        <CCardText dangerouslySetInnerHTML={{ __html: evento.descripcion_evento }}></CCardText>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
                <CRow>
                    <CCol className="d-flex justify-content-center">
                        <h3 className='mt-5'>Noticias</h3>
                    </CCol>
                </CRow> 
                <CRow className="g-5 mb-5">
                    {noticiasHome.map((evento) => (
                        <CCol xl={6} key={evento.id}>
                            <CCard className="mb-4">
                                <CCardBody>
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        breakpoints={{
                                            1200: {
                                                slidesPerView: 1,
                                                spaceBetween: 30,
                                            }
                                        }}
                                        spaceBetween={50}
                                        navigation={true} 
                                        slidesPerView={1}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}    
                                    >
                                        {evento.archivos.map((archivo) => (
                                            <SwiperSlide key={archivo.id}>
                                                <CCardImage className='imagen-evento' src={`http://134.122.124.97/storage/${archivo.url}`} alt={`Imagen ${archivo.id}`} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <CCardTitle className='text-center'>{evento.titulo_evento}</CCardTitle>
                                    <CCardText dangerouslySetInnerHTML={{ __html: evento.descripcion_evento }}>
                                    </CCardText>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))}
                </CRow>
            </CContainer>
        </>
    )
}
