import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './slices/errorSlice'
import loaderReducer from './slices/loaderSlice'

export const store = configureStore({
    reducer: {
        error: errorReducer,
        loader: loaderReducer,
    },
})
