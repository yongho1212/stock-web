import { configureStore } from "@reduxjs/toolkit"; 

import dateRducer from './date/dateSlice';
import authSlice from './auth/authSlice'

export default configureStore({
    reducer:{
        dates: dateRducer,
        auth: authSlice
    }
})