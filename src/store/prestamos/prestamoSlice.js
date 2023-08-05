import { createSlice } from '@reduxjs/toolkit'

export const prestamoSlice = createSlice({

    name: 'prestamo',
    initialState:{

        prestamos: [],
        prestamoSave: false,
        errorPrestamo: {
            error: false,
            errorMessage: ''
        }, 

    },
        
    reducers:{

        onListarPrestamos: (state, {payload}) => {
            state.prestamos = payload
        },

        onSavePrestamo: (state) => {
            (state.prestamoSave == true) ? state.prestamoSave = false : state.prestamoSave = true 
        },

        onErrorPrestamo: (state, {payload}) => {

            state.errorPrestamo = {...state.errorPrestamo, ...payload};

        },

        onClearErrorPrestamo: (state) => {

            state.errorPrestamo = {
                error: false,
                errorMessage: ''
            }

        },

    }

}) 

export const { onListarPrestamos, onSavePrestamo, onErrorPrestamo, onClearErrorPrestamo } = prestamoSlice.actions