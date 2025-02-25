import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './slices/errorSlice'
import successReducer from './slices/messageSlice'
import loaderReducer from './slices/loaderSlice'
import authReducer from './slices/authSlice'
import awsReducer from './slices/awsSlice'

export const store = configureStore({
    reducer: {
        error: errorReducer,
        success: successReducer,
        loader: loaderReducer,
        auth: authReducer,
        aws: awsReducer,
    },
})
