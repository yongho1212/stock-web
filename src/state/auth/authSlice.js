import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: false
    },
    reducers: {
        login: (state, action) =>{
            state.auth = true;
        },
        logout: (state, action) =>{
            // 
            state.dates = false;
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer;