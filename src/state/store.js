import { configureStore } from "@reduxjs/toolkit"; 

import dateRducer from './date/dateSlice';
import authSlice from './auth/authSlice'
import searchToggleSlice from "./searchtoggle/searchToggleSlice";

export default configureStore({
    reducer:{
        dates: dateRducer,
        auth: authSlice,
        toggleState: searchToggleSlice
    }
})