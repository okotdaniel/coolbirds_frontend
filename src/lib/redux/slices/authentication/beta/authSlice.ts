import { createSlice } from '@reduxjs/toolkit'


interface AuthState{
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState = {
    isAuthenticated: false,
    isLoading: true
}


const  authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        authenticate: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false 
        },
        loading: (state) => {
            state.isLoading = false
        }
    },
    
})

export const { authenticate, logout, loading, } = authSlice.actions;
export default authSlice.reducer;