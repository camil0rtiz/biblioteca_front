import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CBreadcrumb, CBreadcrumbItem, CHeaderDivider, CContainer, CRow, CCard, CCardImage, CCardBody, CCardTitle, CCardSubtitle, CCarousel, CCarouselItem, CImage} from '@coreui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from "swiper"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../assets/css/home.css'
import Biblio from '../../assets/img/libros.jpg'
import bibliotecaApi from '../../api/bibliotecaApi'

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
            <div>
                <CCarousel controls indicators>
                    <CCarouselItem>
                        <CImage className="d-block w-100 carousel-image" src={Biblio} alt="slide 1" />
                    </CCarouselItem>
                    <CCarouselItem>
                        <CImage className="d-block w-100 carousel-image" src={Biblio} alt="slide 2" />
                    </CCarouselItem>
                    <CCarouselItem>
                        <CImage className="d-block w-100 carousel-image" src={Biblio} alt="slide 3" />
                    </CCarouselItem>
                </CCarousel>
            </div>
            <CContainer>
                <CRow>
                    <h3 className='mt-3'>Últimos agregados</h3>
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
                                <CCard border="light">
                                    <CCardImage style={{height: 360}} variant="top" src={` http://localhost/biblioteca_vn_backend/storage/app/public/${libro.url}`} />
                                    {/* <CCardImage style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} /> */}
                                    <CCardBody>
                                        <CCardTitle className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></CCardTitle>
                                        <CCardSubtitle className="text-muted text-center">{libro.autor.label[0]}</CCardSubtitle>
                                    </CCardBody>
                                </CCard>
                            </SwiperSlide>
                            
                        ))}
                    </Swiper>
                </CRow>
                <CRow className='d-flex justify-content-center mb-3'>
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
                                <CCard border="light">
                                    <CCardImage style={{height: 360}} variant="top" src={` http://localhost/biblioteca_vn_backend/storage/app/public/${libro.url}`} />
                                    {/* <CCardImage style={{height: 360}} variant="top" src={`http://134.122.124.97/storage/${libro.url}`} /> */}
                                    <CCardBody>
                                        <CCardTitle className="text-center"><Link to={`/libros/${libro.id}`}>{libro.titulo_libro}</Link></CCardTitle>
                                        <CCardSubtitle className="text-muted text-center">{libro.autor.label[0]}</CCardSubtitle>
                                    </CCardBody>
                                </CCard>
                            </SwiperSlide>
                            
                        ))}
                    </Swiper>
                </CRow>
            </CContainer>
        </>
    )
}
