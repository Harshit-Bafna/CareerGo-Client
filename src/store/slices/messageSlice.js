import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    successMessage: null,
    isSuccess: false,
}

export const successSlice = createSlice({
    name: "success",
    initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.successMessage = action.payload
            state.isSuccess = true
        },
        clearSuccess: (state) => {
            state.successMessage = null
            state.isSuccess = false
        },
    },
})

export const { setSuccess, clearSuccess } = successSlice.actions

export default successSlice.reducer
