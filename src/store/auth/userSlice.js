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
        userIdComprobante: null,
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
        onListarUsersHabilitados: (state, {payload}) => {

            state.usersHabilitados = payload

        },

        onListarUsersPendientes: (state, {payload}) => {

            state.usersPendientes = payload

        },

        onIdUserComprobante: (state, {payload}) => {

            state.userIdComprobante = payload

        },

        onClearIdUserComprobante: (state) => {

            state.userIdComprobante = null

        },

        onSave: (state) => {

            (state.userSave == true) ? state.userSave = false : state.userSave = true 

        }
        
    }

}) 

export const {onAgregarUser, onClearUser, onListarUsersHabilitados, onListarUsersPendientes, onIdUserComprobante, onClearIdUserComprobante, onSave} = userSlice.actions