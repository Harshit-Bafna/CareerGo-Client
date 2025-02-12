import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage: null,
    isError: false,
}

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload
            state.isError = true
        },
        clearError: (state) => {
            state.errorMessage = null
            state.isError = false
        },
    },
})

export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer
