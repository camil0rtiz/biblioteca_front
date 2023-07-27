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
        idsComprobantes: [],
        usersPendientes: [],
        usersHabilitados: [],
        userSave: false,
        userExists: false
    
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
                registroConfirCorreo: '',
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

            state.idsComprobantes = payload

        },

        onClearIdUserComprobante: (state) => {

            state.idsComprobantes = []

        },

        onUserExists: (state,{payload}) => {

            state.userExists = payload

        },

        onSave: (state) => {

            (state.userSave == true) ? state.userSave = false : state.userSave = true 

        }
        
    }

}) 

export const {onAgregarUser, onClearUser, onListarUsersHabilitados, onListarUsersPendientes, onIdUserComprobante, onClearIdUserComprobante, onUserExists, onSave} = userSlice.actions