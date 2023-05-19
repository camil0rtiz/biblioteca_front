import { createSlice } from '@reduxjs/toolkit'

export const editorialSlice = createSlice({

    name: 'editoriale',
    initialState:{
        initialEditorial:  {
            id: '',
            editorialNombre: ''
        },
        editoriales: [],
        editorialSave: false 
    },
        
    reducers:{

        onAgregarEditorial: (state, { payload }) => {

            state.initialEditorial = {...state.initialEditorial, ...payload};
            
        },

        onListarEditoriales: (state, {payload}) => {
            state.editoriales = payload
        },

        onClearEditoriales: (state) => {
            state.initialEditorial = {
                id: '',
                editorialNombre: ''
            }
        },

        onSaveEditorial: (state) => {

            (state.editorialSave == true) ? state.editorialSave = false : state.editorialSave = true 

        }
        
    }

})

export const {onAgregarEditorial, onListarEditoriales, onClearEditoriales, onSaveEditorial } = editorialSlice.actions