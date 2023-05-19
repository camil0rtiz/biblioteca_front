import { createSlice } from '@reduxjs/toolkit'

export const libroSlice = createSlice({

    name: 'libro',
    initialState:{
        initialLibro:  {
            id: '',
            tituloLibro: '',
            isbnLibro: '',
            deweyLibro: '',
            categoriaLibro: '',
            numPagLibro: '',
            anioPublicacionLibro: '',
            resenaLibro: '',
            autorLibro: []
        },
        libros: [],
        libroSave: false 
    },
        
    reducers:{

        onAgregarLibro: (state, { payload }) => {

            state.initialLibro = {...state.initialLibro, ...payload};
            
        },

        onListarLibros: (state, {payload}) => {
            state.libros = payload
        },

        onClearLibros: (state) => {
            state.initialLibro = {
                id: '',
                tituloLibro: '',
                isbnLibro: '',
                deweyLibro: '',
                categoriaLibro: '',
                numPagLibro: '',
                anioPublicacionLibro: '',
                resenaLibro: '',
                autorLibro: []
            }
        },

        onSaveLibro: (state) => {

            (state.libroSave == true) ? state.libroSave = false : state.libroSave = true 

        }
        
    }

})

export const {onAgregarLibro, onListarLibros, onClearLibros, onSaveLibro } = libroSlice.actions