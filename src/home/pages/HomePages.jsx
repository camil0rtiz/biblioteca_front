import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../assets/css/navbar.css'
import '../../assets/css/home.css'
import bibliotecaApi from '../../api/bibliotecaApi'
import { CBreadcrumb, CBreadcrumbItem, CHeaderDivider, CContainer} from '@coreui/react';

export const HomePages = () => {
    
    const [ libros, setLibros ] = useState([])

    useEffect(() => {
        listarLibros()
    }, [])

    const listarLibros = async() => {
        try {

            const {data} = await bibliotecaApi.get('libros/listar')

            setLibros(data.data)
                    
        } catch (error) {
        
            console.error(error)
            
        }
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
                <Row className='d-flex justify-content-center swiper-container'>
                    <h3>Últimos agregados</h3>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            576: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            }
                        }}
                        spaceBetween={50}
                        slidesPerView={5}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        >
                        {libros.map((libro) => (
                            <SwiperSlide key={libro.id}>
                                <Card border="light" className="shadow">
                                    <Card.Img style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} />
                                    <Card.Body>
                                        <Card.Title className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></Card.Title>
                                        <Card.Subtitle className="text-muted text-center">{libro.autor.label[0]}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                            
                        ))}
                    </Swiper>
                </Row>
                <Row className='d-flex justify-content-center mb-5'>
                    <h3 className='mt-3'>Más Reservados</h3>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            576: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            }
                        }}
                        spaceBetween={50}
                        slidesPerView={5}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        >
                        {libros.map((libro) => (
                            <SwiperSlide key={libro.id}>
                                <Card border="light" className="shadow">
                                    <Card.Img style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} />
                                    <Card.Body>
                                        <Card.Title className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></Card.Title>
                                        <Card.Subtitle className="text-muted text-center">{libro.autor.label[0]}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                            
                        ))}
                    </Swiper>
                </Row>
            </CContainer>
        </>
    )
}
