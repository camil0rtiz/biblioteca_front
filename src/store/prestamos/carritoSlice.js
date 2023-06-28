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

            state.carritoReserva.push(payload)

        },
        
        onEliminarLibroCarrito: ( state, { payload } ) => {

            const index = state.carrito.findIndex( libro => libro.id === payload );

            state.carrito.splice( index, 1 )

        },

        onClearCarrito: ( state ) => {

            state.carrito = []

        }
    }

}) 

export const { onAgregarLibroCarrito, onAgregarEjemplarCarrito, onEliminarLibroCarrito, onClearCarrito } = carritoSlice.actions