import { Navigate, Route, Routes } from 'react-router-dom'
import { EventosPages } from '../pages/EventosPages'
import { HomePages } from '../pages/HomePages'
import { LibrosPages } from '../pages/LibrosPages'
import { DetallesLibroPages } from '../pages/DetallesLibroPages'
import { ReservaLibroPage } from '../pages/ReservaLibroPage'
import { NavbarComponent } from '../components/NavbarComponent'
import { FooterComponent } from '../components/FooterComponent'
import { CarritoComponent } from '../components/CarritoComponent'

export const HomeRoutes = () => {
    return (
        <>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <NavbarComponent/>
                <div className="body flex-grow-1 px-3">
                    <Routes>
                        <Route path='/' element={<HomePages/>}/>
                        <Route path='/eventos' element={<EventosPages/>}/>
                        <Route path='/libros' element={<LibrosPages/>}/>
                        <Route path='/reservas' element={<ReservaLibroPage/>}/>
                        <Route path='/libros/:id' element={<DetallesLibroPages/>}/>
                        <Route path="/*" element={<Navigate to='/'/>} />
                    </Routes>
                </div>
                <CarritoComponent/>
                <FooterComponent/>
            </div>
        </>
    )
}
