import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({

    name: 'auth',
    initialState:{
        status: 'not-authenticated', //not-authenticated, authenticated, checking
        user: {},
        errorMessage: false
    },
    reducers:{
        login: ( state, {payload} ) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = null
        },
        logout: ( state ) => {
            state.status = 'not-authenticated'
            state.user = {} 
            state.errorMessage = null
        },

        onCheckingLogin: ( state ) => {

            state.status = 'checking'

        },

        onNotAuthenticatedLogin: ( state ) => {

            state.status = 'not-authenticated'

        },

        onErrorMessage: ( state ) => {

            ( state.errorMessage == true) ?  state.errorMessage = false :  state.errorMessage = true 

        }
    }

}) 

export const { login, logout, onCheckingLogin, onNotAuthenticatedLogin, onErrorMessage } = authSlice.actions