import { createSlice } from '@reduxjs/toolkit'

export const ejemplarSlice = createSlice({

    name: 'ejemplar',
    initialState:{
        initialEjemplar:  {
            id: '',
            deweyLibro: '',
        },
        ejemplares: [],
        loadingSelect: false,
        ejemplarSave: false, 
    },

    reducers:{

        onAgregarEjemplar: (state, { payload }) => {

            state.initialEjemplar = {...state.initialEjemplar, ...payload};
            
        },

        onListarEjemplares: (state, {payload}) => {
            state.ejemplares = payload
        },

        onClearEjemplares: (state) => {
            state.initialEjemplar = {
                id: '',
                tituloLibro: '',
                isbnLibro: '',
                deweyLibro: '',
            }
        },
        
        onLoadingFalseE: (state) => {
            state.loadingSelect = false
        },

        onLoadingTrue: (state) => {
            state.loadingSelect = true
        },

        onSaveEjemplar: (state) => {
            (state.ejemplarSave == true) ? state.ejemplarSave = false : state.ejemplarSave = true 
        }

    }

})

export const { onAgregarEjemplar, onListarEjemplares, onLoadingFalseE, onLoadingTrue, onSaveEjemplar } = ejemplarSlice.actions