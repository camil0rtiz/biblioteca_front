import { createSlice } from '@reduxjs/toolkit'

export const reservaSlice = createSlice({

    name: 'reserva',
    initialState:{

        reservas: [],
        reservaSave: false,
        libroId: null,
        usuarioId: null

    },
        
    reducers:{

        onListarReservas: (state, {payload}) => {
            state.reservas = payload
        },

        onSaveReserva: (state) => {

            (state.reservaSave == true) ? state.reservaSave = false : state.reservaSave = true 

        },

        onIdsReserva: (state, {payload}) => {

            state.libroId = payload.id_libro
            state.usuarioId = payload.id_usuario
            
        },

        onClearLibroReserva: (state) => {//cambiar despues

            state.libroId = null

        } 
        
    }

}) 

export const { onListarReservas, onSaveReserva, onIdsReserva, onClearLibroReserva } = reservaSlice.actions