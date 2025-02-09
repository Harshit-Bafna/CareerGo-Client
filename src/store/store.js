import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './slices/errorSlice'

export const store = configureStore({
    reducer: {
        error: errorReducer
    },
})
