import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { startRefrech } from '../store/auth/thunk'
import { HomeRoutes } from '../home/routes/HomeRoutes'
import { RegisterPages } from '../auth/pages/RegisterPages'
import { PublicRouter } from './PublicRouter'
import { LoginPages } from '../auth/pages/LoginPages'
import { PrivateRouter } from './PrivateRouter'
import { AdminRoutes } from '../admin/routes/AdminRoutes'

export const AppRouter = () => {
    
    const dispatch =  useDispatch()

    useEffect(() => {
        dispatch(startRefrech())
    }, [])
    
    return (

        <Routes>
            
            <Route path='/auth/login' element={
                <PublicRouter>
                    <LoginPages/>
                </PublicRouter>
            }/>

            <Route path='/admin/*' element={
                <PrivateRouter>
                    <AdminRoutes/>
                </PrivateRouter>
            }/>
                
            <Route path="/*" element={<HomeRoutes/>}/>
            <Route path='/auth/registro' element={<RegisterPages/>}/>

        </Routes>

    )
}
