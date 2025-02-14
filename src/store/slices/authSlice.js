import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { startLoading, stopLoading } from "./loaderSlice"
import { setError } from "./errorSlice"
import axios from "axios"
import config from "../../data/config"

const serverURL = config.SERVER_URL
const authURL = 'api/v1/auth'

const initialState = {
    isLoggedIn: false,
    data: null,
}

export const registerUser = createAsyncThunk('auth/create', async (userPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${authURL}/create`, userPayload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        return data
    } catch (error) {
        const errorMessage =
            axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const userLogin = createAsyncThunk('auth/login', async (loginPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading());

        const { data } = await axios.post(`${serverURL}/${authURL}/login`, loginPayload, { withCredentials: true });

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message));
            return thunkAPI.rejectWithValue(data.message);
        }

        return data;
    } catch (error) {
        const errorMessage =
            axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong';

        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
    } finally {
        thunkAPI.dispatch(stopLoading());
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.isLoggedIn = false
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoggedIn = true
                state.data = action.payload.data
            })
            .addCase(userLogin.rejected, (state) => {
                state.isLoggedIn = false
            })
    },
})

export default authSlice.reducer