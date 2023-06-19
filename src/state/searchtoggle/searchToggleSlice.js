import { createSlice } from '@reduxjs/toolkit';


export const searchToggleSlice = createSlice({
    name: 'searchToggle',
    initialState: {
        toggleState: false
    },
    reducers: {
        setToggleState: (state, action) =>{
            state.toggleState = action.payload;
        },

    }
})

export const {setToggleState} = searchToggleSlice.actions

export default searchToggleSlice.reducer;