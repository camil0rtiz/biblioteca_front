import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        modalOpen: false,
        modalOpenEjemplar: false,
        carritoOpen: false,
        filtrosOpen: false,
        sidebarAdmin: true
    },
    reducers: {

        onOpenCarrito: (state) => {
            state.carritoOpen = true
        },

        onOpenFiltros: (state) => {
            state.filtrosOpen = true
        },

        onOpenModal: (state) => {
            state.modalOpen = true
        },

        onOpenModalEjemplar: (state) => {
            state.modalOpenEjemplar = true
        },

        onCloseCarrito: (state) => {
            state.carritoOpen = false
        },

        onCloseFiltros: (state) => {
            state.filtrosOpen = false
        },

        onCloseModal: (state) => {
            state.modalOpen = false
        },

        onCloseModalEjemplar: (state) => {
            state.modalOpenEjemplar = false
        },

        onCloseSidebar: (state) => {

            (state.sidebarAdmin == true) ? state.sidebarAdmin = false : state.sidebarAdmin = true 
            
        }
        
    },
})

export const {
    onOpenCarrito, 
    onCloseCarrito, 
    onOpenModal, 
    onCloseModal, 
    onOpenModalEjemplar, 
    onCloseModalEjemplar, 
    onOpenFiltros,
    onCloseFiltros,
    onCloseSidebar
} = uiSlice.actions

