import { createSlice } from '@reduxjs/toolkit'

export const reservaSlice = createSlice({

    name: 'reserva',
    initialState:{

        reservas: [],
        reservaSave: false,
        libroId: null,
        usuarioId: null,
        errorReserva: {
            error: false,
            errorMessage: ''
        },
        errorListarReserva: {
            error: false,
            errorMessage: ''
        },
        succesReserva: false,
        
    },
        
    reducers:{

        onListarReservas: (state, {payload}) => {
            state.reservas = payload
        },

        onSaveReserva: (state) => {

            (state.reservaSave == true) ? state.reservaSave = false : state.reservaSave = true 

        },

        onIdsReserva: (state, {payload}) => {

            state.usuarioId = payload
            
        },

        onClearLibroReserva: (state) => {//cambiar despues

            state.libroId = null

        },

        onErrorReserva: (state, {payload}) => {

            state.errorReserva = {...state.errorReserva, ...payload};

        },

        onClearErrorReserva: (state) => {

            state.errorReserva = {
                error: false,
                errorMessage: ''
            }

        },

        onSuccesReserva: (state, {payload}) => {

            state.succesReserva = payload

        },

        onErrorListarReserva: (state, {payload}) => {

            state.errorListarReserva = {...state.errorListarReserva, ...payload};

        },

        onClearListarErrorReserva: (state) => {

            state.errorListarReserva = {
                error: false,
                errorMessage: ''
            }

        },
    
    }

}) 

export const { onListarReservas, onSaveReserva, onIdsReserva, onClearLibroReserva, onErrorReserva, onClearErrorReserva, onSuccesReserva, onErrorListarReserva, onClearListarErrorReserva } = reservaSlice.actions