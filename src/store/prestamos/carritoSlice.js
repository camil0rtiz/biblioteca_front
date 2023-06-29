import { createSlice } from '@reduxjs/toolkit'

export const carritoSlice = createSlice({

    name: 'carrito',
    initialState:{

        carrito: [],
        carritoReserva: [],

    },
        
    reducers:{

        onAgregarLibroCarrito: (state, { payload }) => {

            if(state.carrito.length != 0){

                state.carrito.forEach((libro) => {
                    
                    if(libro.id != payload.id){
                        state.carrito.push(payload)
                    }
            
                })
            }else{

                state.carrito.push(payload)
            
            }

            
        },

        onAgregarEjemplarCarrito: (state, { payload }) => {

            //evita que 2 ejemplares con el mismo id se vuelva a repetir

            if(state.carritoReserva.length != 0){

                state.carritoReserva.forEach((ejemplar) => {
                    
                    if(ejemplar.id != payload.id){
                        state.carritoReserva.push(payload)
                    }
            
                })
            }else{

                state.carritoReserva.push(payload)
            
            }

        },
        
        onEliminarLibroCarrito: ( state, { payload } ) => {

            const index = state.carrito.findIndex( libro => libro.id === payload );

            state.carrito.splice( index, 1 )

        },

        onEliminarEjemplarCarrito: ( state, { payload } ) => {

            const index = state.carritoReserva.findIndex( ejemplar => ejemplar.id === payload );

            state.carritoReserva.splice( index, 1 )

        },

        onClearCarrito: ( state ) => {

            state.carrito = []

        }
    }

}) 

export const { onAgregarLibroCarrito, onAgregarEjemplarCarrito, onEliminarLibroCarrito, onEliminarEjemplarCarrito, onClearCarrito } = carritoSlice.actions