import { createSlice } from '@reduxjs/toolkit'

export const eventoSlice = createSlice({

    name: 'evento',
    initialState:{
        initialEvento:  {
            id: '',
            eventoTitulo: '',
            eventoImagen: '',
            eventoTipo: [],
            eventoDescripcion: '',
            url: [],
            idPortada: '' 
        },
        eventos: [],
        eventosHome: [],
        noticiasHome: [],
        eventoSave: false 
    },
        
    reducers:{

        onAgregarEvento: (state, { payload }) => {

            state.initialEvento = {...state.initialEvento, ...payload};
            
        },

        onListarEventos: (state, {payload}) => {
            state.eventos = payload
        },

        onListarEventosHome: (state, {payload}) => {

            payload.forEach(evento => {

                if(evento.id_categoria == 1){

                    state.eventosHome = payload

                }
                else{

                    state.noticiasHome = payload

                }

            })
            
        },

        onClearEventos: (state) => {
            state.initialEvento = {
                id: '',
                eventoTitulo: '',
                eventoImagen: '',
                eventoTipo: [],
                eventoDescripcion: '',
                url: [],
                idPortada: '', 
            }
        },

        onSaveEvento: (state) => {

            (state.eventoSave == true) ? state.eventoSave = false : state.eventoSave = true 

        }
        
    }

})

export const { onAgregarEvento, onSaveEvento, onListarEventos, onListarEventosHome, onClearEventos } = eventoSlice.actions