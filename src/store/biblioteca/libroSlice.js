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
        cantidadPaginas: 0,
        cantidadPaginado: 0,
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

        onCantidadPaginas: (state, {payload})  => {

            state.cantidadPaginas = payload
            
        },

        
        onCantidadPaginado: (state, {payload})  => {

            state.cantidadPaginado = payload
            
        },
        
        onSaveLibro: (state) => {

            (state.libroSave == true) ? state.libroSave = false : state.libroSave = true 

        }
        
    }

})

export const {onAgregarLibro, onListarLibros, onClearLibros, onCantidadPaginas, onCantidadPaginado, onSaveLibro } = libroSlice.actions