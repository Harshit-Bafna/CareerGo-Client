import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
}

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        stopLoading: (state) => {
            state.isLoading = false
        },
    },
})

export const { startLoading, stopLoading } = loaderSlice.actions

export default loaderSlice.reducer