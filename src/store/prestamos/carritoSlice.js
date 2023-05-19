import { createSlice } from '@reduxjs/toolkit'

export const carritoSlice = createSlice({

    name: 'carrito',
    initialState:{

        carrito: [],

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
        
        onEliminarLibroCarrito: ( state, { payload } ) => {

            const index = state.carrito.findIndex( libro => libro.id === payload );

            state.carrito.splice( index, 1 )

        }
    }

}) 

export const { onAgregarLibroCarrito, onEliminarLibroCarrito } = carritoSlice.actions