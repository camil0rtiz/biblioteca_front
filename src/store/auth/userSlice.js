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
        estaditicas: [],
        userSave: false,
        userExists: false,
        errorMessage: false,
        errorRenovacion: {
            error: false,
            errorMessage: ''
        },
        succesRenovacion: false,
    
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

        },

        onMessageErrorUser: (state) => {

            state.errorMessage = true

        },

        onClearMessageErrorUser: (state) => {

            state.errorMessage = false

        },

        onAgregarEstadisticas: (state,{payload}) => {

            state.estaditicas = payload

        },

        onErrorRenovacion: (state, {payload}) => {

            state.errorRenovacion = {...state.errorRenovacion, ...payload};

        },

        onClearErrorRenovacion: (state) => {

            state.errorRenovacion = {
                error: false,
                errorMessage: ''
            }

        },

        onSuccesRenovacion: (state, {payload}) => {

            state.succesRenovacion = payload

        },
        
    }

}) 

export const {onAgregarUser, onClearUser, onListarUsersHabilitados, onListarUsersPendientes, onIdUserComprobante, onClearIdUserComprobante, onUserExists, onSave, onMessageErrorUser, onClearMessageErrorUser, onAgregarEstadisticas, onErrorRenovacion, onClearErrorRenovacion, onSuccesRenovacion} = userSlice.actions