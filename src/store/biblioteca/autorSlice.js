import { createSlice } from '@reduxjs/toolkit'

export const autorSlice = createSlice({

    name: 'autor',
    initialState:{
        initialAutor:  {
            id: '',
            autorNombre: ''
        },
        autores: [],
        loadingSelect: false,
        autorSave: false 
    },
        
    reducers:{

        onAgregarAutor: (state, { payload }) => {

            state.initialAutor = {...state.initialAutor, ...payload};
            
        },

        onListarAutores: (state, {payload}) => {
            state.autores = payload
        },

        onClearAutores: (state) => {
            state.initialAutor = {
                id: '',
                autorNombre: ''
            }
        },

        onLoadingFalse: (state) => {
            state.loadingSelect = false
        },

        onLoadingTrue: (state) => {
            state.loadingSelect = true
        },

        onSaveAutor: (state) => {
            (state.autorSave == true) ? state.autorSave = false : state.autorSave = true 
        }
        
    }

})

export const { onAgregarAutor, onListarAutores, onClearAutores, onLoadingFalse, onLoadingTrue, onSaveAutor } = autorSlice.actions