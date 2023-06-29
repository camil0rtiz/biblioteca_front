import { createSlice } from '@reduxjs/toolkit'

export const prestamoSlice = createSlice({

    name: 'prestamo',
    initialState:{

        prestamos: [],

    },
        
    reducers:{

        onListarPrestamos: (state, {payload}) => {
            state.prestamos = payload
        },

    }

}) 

export const { onListarPrestamos } = prestamoSlice.actions