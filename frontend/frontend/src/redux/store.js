import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice'
import courseReducer from './courseSlice'


export const store= configureStore({
    reducer:{
        user:userSlice,
        course: courseReducer
    }

})