import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { store } from "./store/store"
import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/sass/style.scss'

export const BibliotecaApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    )
}
