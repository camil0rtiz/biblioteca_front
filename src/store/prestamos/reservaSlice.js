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
        }

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

        }
        
    }

}) 

export const { onListarReservas, onSaveReserva, onIdsReserva, onClearLibroReserva, onErrorReserva, onClearErrorReserva } = reservaSlice.actions