import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { userSlice } from './auth/userSlice'
import { uiSlice } from './ui/uiSlice'
import { libroSlice } from './biblioteca/libroSlice'
import { autorSlice } from './biblioteca/autorSlice'
import { editorialSlice } from './biblioteca/editorialSlice'
import { ejemplarSlice } from './biblioteca/ejemplarSlice'
import { carritoSlice } from './prestamos/carritoSlice'
import { eventoSlice } from './biblioteca/eventoSlice'
import { reservaSlice } from './prestamos/reservaSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        ui: uiSlice.reducer,
        libro: libroSlice.reducer,
        autor: autorSlice.reducer,
        editorial : editorialSlice.reducer,
        ejemplar: ejemplarSlice.reducer,
        evento: eventoSlice.reducer,
        carrito: carritoSlice.reducer,
        reserva: reservaSlice.reducer
    },
})

