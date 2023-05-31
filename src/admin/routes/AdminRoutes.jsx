import { Navigate, Route, Routes } from 'react-router-dom'
import { FooterAdmin } from '../components/ui/FooterAdmin'
import { HeaderAdmin } from '../components/ui/HeaderAdmin'
import { SidebarAdmin } from '../components/ui/SidebarAdmin'
import { AutoresPages } from '../pages/AutoresPages'
import { EditorialesPages } from '../pages/EditorialesPages'
import { EventosPages } from '../pages/EventosPages'
import { HomePages } from '../pages/HomePages'
import { LibrosPages } from '../pages/LibrosPages'
import { ReservasPages } from '../pages/ReservasPages'
import { UsuariosPages } from '../pages/UsuariosPages'
import { CarritoAdmin } from '../components/CarritoAdmin'

export const AdminRoutes = () => {
    return (
        <>  
            <div>
                <SidebarAdmin/>
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                    <HeaderAdmin/>
                    <div className="body flex-grow-1 px-3">
                        <Routes>
                            <Route path='/reservas' element={<ReservasPages/>}/>
                            <Route path='/eventos' element={<EventosPages/>}/>
                            <Route path='/usuarios' element={<UsuariosPages/>}/>
                            <Route path='/libros' element={<LibrosPages/>}/>
                            <Route path='/autores' element={<AutoresPages/>}/>
                            <Route path='/editoriales' element={<EditorialesPages/>}/>
                            <Route path='/home' element={<HomePages/>}/>
                            <Route path="/*" element={<Navigate to='home'/>} />
                        </Routes>
                    </div>
                    <CarritoAdmin/>
                    <FooterAdmin/>
                </div>
            </div>
        </>
    )
}
