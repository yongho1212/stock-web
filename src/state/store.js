import { configureStore } from "@reduxjs/toolkit"; 

import dateRducer from './date/dateSlice';

export default configureStore({
    reducer:{
        dates: dateRducer
    }
})