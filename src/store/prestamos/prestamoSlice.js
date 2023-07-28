import { createSlice } from '@reduxjs/toolkit'

export const prestamoSlice = createSlice({

    name: 'prestamo',
    initialState:{

        prestamos: [],
        prestamoSave: false 

    },
        
    reducers:{

        onListarPrestamos: (state, {payload}) => {
            state.prestamos = payload
        },

        onSavePrestamo: (state) => {
            (state.prestamoSave == true) ? state.prestamoSave = false : state.prestamoSave = true 
        }

    }

}) 

export const { onListarPrestamos, onSavePrestamo } = prestamoSlice.actions