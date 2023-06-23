import { createSlice } from '@reduxjs/toolkit'

export const reservaSlice = createSlice({

    name: 'reserva',
    initialState:{

        reservas: [],
        reservaSave: false,
        libroId: null

    },
        
    reducers:{

        onListarReservas: (state, {payload}) => {
            state.reservas = payload
        },

        onSaveReserva: (state) => {

            (state.reservaSave == true) ? state.reservaSave = false : state.reservaSave = true 

        },

        onIdLibroReserva: (state, {payload}) => {

            state.libroId = payload
        },

        onClearLibroReserva: (state, {payload}) => {

            state.libroId = null
        } 
        
    }

}) 

export const { onListarReservas, onSaveReserva, onIdLibroReserva, onClearLibroReserva } = reservaSlice.actions