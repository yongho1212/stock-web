import { createSlice } from '@reduxjs/toolkit';


export const dateSlice = createSlice({
    name: 'curr52',
    initialState: {
        dates: []
    },
    reducers: {
        setDays: (state, action) =>{
            state.dates = state.dates.concat(action.payload);
        },
        clearDays: (state, action) =>{
            // 
            state.dates = []
        }
    }
})

export const {setDays, clearDays} = dateSlice.actions

export default dateSlice.reducer;