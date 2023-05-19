import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from "swiper";
import { startListarEventosHome } from '../../store/biblioteca/thunk';
import '../../assets/css/navbar.css'
import '../../assets/css/eventos.css'


export const EventosPages = () => {

    const { eventosHome, noticiasHome } = useSelector(state => state.evento)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(startListarEventosHome())

    }, [])

    console.log(noticiasHome)

    return (

        <Container className="site-layout-content" fluid="lg">
            <Row>
                <div className="d-flex justify-content-center">
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to:'/home'}} >Home</Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{to:'/eventos'}}>Eventos</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </Row>
            <Row>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Eventos</h3>
                </div>
            </Row>
            <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-5">
                {eventosHome.map((evento) => (
                    <Col key={evento.id}>
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
                                    <img className='imagen-portada' src={`http://134.122.124.97/${archivo.url}`} alt={`Imagen ${archivo.id}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div>
                            <h4 className='text-center'>{evento.titulo_evento}</h4>
                        </div>
                        <div  dangerouslySetInnerHTML={{ __html: evento.descripcion_evento }}></div>
                    </Col>
                ))}
            </Row>
            <Row>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Noticias</h3>
                </div>
            </Row>
            <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-5">
                {noticiasHome.map((evento) => (
                    <Col key={evento.id}>
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
                                    <img className='imagen-portada' src={`http://134.122.124.97/storage/${archivo.url}`} alt={`Imagen ${archivo.id}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div>
                            <h4 className='text-center'>{evento.titulo_evento}</h4>
                        </div>
                        <div  dangerouslySetInnerHTML={{ __html: evento.descripcion_evento }}></div>
                    </Col>
                ))}
            </Row>
        </Container>
    
    )
}
