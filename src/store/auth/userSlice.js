import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({

    name: 'user',
    initialState:{
        initialUsuario:  {
            id: '',
            registroRut: '', 
            registroNombre: '',
            registroApellidoPaterno: '',
            registroApellidoMaterno: '',
            registroCorreo:'',
            registroNumeroCelular: '',
            registroDireccion:'',
            registroNumCasa:'',
            registroFechaNacimiento:'',
            registroPassword:'',
            registroConfirPassword:'',
            idMembresia: '',
            registroTipoRol: []
        },
        usersPendientes: [],
        usersHabilitados: [],
        userSave: false,
    
    },
        
    reducers:{
        onAgregarUser: (state, { payload }) => {

            state.initialUsuario = {...state.initialUsuario, ...payload};
            
        },
        onClearUser: (state) => {
            state.initialUsuario = {
                id: '',
                registroRut: '', 
                registroNombre: '',
                registroApellidoPaterno: '',
                registroApellidoMaterno: '',
                registroCorreo: '',
                registroNumeroCelular: '',
                registroDireccion: '',
                registroNumCasa: '',
                registroFechaNacimiento: '',
                registroPassword: '',
                registroConfirPassword: '',
                idMembresia: '',
                registroTipoRol: []
            }
        },
        onListarUsers: (state, {payload}) => {

            payload.data.forEach(usuario => {

                    if(usuario.estado_usuario == 1){

                        state.usersHabilitados = payload

                    }
                    else if(usuario.estado_usuario == 2){

                        state.usersPendientes = payload

                    }

            })
        },

        onSave: (state) => {
            (state.userSave == true) ? state.userSave = false : state.userSave = true 
        }
        
    }

}) 

export const {onAgregarUser, onClearUser, onListarUsers, onSave} = userSlice.actions