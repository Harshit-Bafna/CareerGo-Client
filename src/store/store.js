import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './slices/errorSlice'
import loaderReducer from './slices/loaderSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        error: errorReducer,
        loader: loaderReducer,
        auth: authReducer,
    },
})
