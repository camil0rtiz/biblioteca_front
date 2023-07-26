import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        modalOpen: false,
        modalOpenEjemplar: false,
        modalOpenPrestamos: false,
        modalOpenPortada: false,
        carritoOpen: false,
        carritoAdminOpen: false,
        filtrosOpen: false,
        sidebarAdmin: true
    },
    reducers: {

        onOpenCarrito: (state) => {
            state.carritoOpen = true
        },

        onOpenCarritoAdmin: (state) => {
            state.carritoAdminOpen = true
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

        onOpenModalPrestamos: (state) => {
            state.modalOpenPrestamos = true
        },

        onOpenModalPortada: (state) => {
            state.modalOpenPortada = true
        },

        onCloseCarrito: (state) => {
            state.carritoOpen = false
        },

        onCloseCarritoAdmin: (state) => {
            state.carritoAdminOpen = false
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

        onCloseModalPrestamos: (state) => {
            state.modalOpenPrestamos = false
        },

        onCloseModalPortada: (state) => {
            state.modalOpenPortada = false
        },

        onCloseSidebar: (state) => {

            (state.sidebarAdmin == true) ? state.sidebarAdmin = false : state.sidebarAdmin = true 
            
        }
        
    },
})

export const {
    onOpenModal, 
    onOpenCarrito,
    onOpenCarritoAdmin, 
    onOpenModalEjemplar, 
    onOpenModalPrestamos,
    onOpenModalPortada,
    onOpenFiltros,
    onCloseCarrito,
    onCloseCarritoAdmin,
    onCloseModalPrestamos,
    onCloseModalPortada,
    onCloseModal, 
    onCloseModalEjemplar, 
    onCloseFiltros,
    onCloseSidebar
} = uiSlice.actions

