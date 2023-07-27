import { createSlice } from '@reduxjs/toolkit'

export const libroSlice = createSlice({

    name: 'libro',
    initialState:{
        initialLibro:  {
            id: '',
            tituloLibro: '',
            deweyLibro: '',
            anioPublicacionLibro: '',
            resenaLibro: '',
            autorLibro: [],
            url: '',
            idPortada: ''
        },
        libros: [],
        masReservados: [],//aqui los libros mas reservados por lo usuarios
        ultimosAgregados: [], //aqui se muestran los último libros que se agregaron
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

        onListarMasReservados: (state, {payload}) => {

            state.masReservados = payload
            
        },

        onListarUltimosAgregados: (state, {payload}) => {

            state.ultimosAgregados = payload
            
        },

        onClearLibros: (state) => {
            state.initialLibro = {
                id: '',
                tituloLibro: '',
                deweyLibro: '',
                anioPublicacionLibro: '',
                resenaLibro: '',
                autorLibro: [],
                url: '',
                id_portada: ''
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

export const {onAgregarLibro, onListarLibros, onListarMasReservados, onListarUltimosAgregados, onClearLibros, onCantidadPaginas, onCantidadPaginado, onSaveLibro } = libroSlice.actions