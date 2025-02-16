import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { startLoading, stopLoading } from "./loaderSlice"
import { setError } from "./errorSlice"
import { setSuccess } from "./messageSlice"
import successMessage from "../../utils/constants/successMessage"
import axios from "axios"
import config from "../../data/config"

const serverURL = config.SERVER_URL
const authURL = 'api/v1/auth'
const institutionURL = 'api/v1/institution'

const initialState = {
    isLoggedIn: false,
    data: null,
    token: null,
    code: null
}

export const registerUser = createAsyncThunk('auth/create', async (userPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${authURL}/create`, userPayload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

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

export const registerInstitution = createAsyncThunk('auth/createInstitution', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${institutionURL}/create`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.institutionResgister))

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
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${authURL}/login`, loginPayload, { withCredentials: true });

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userLogin))

        return data;
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
});

export const forgetPassword = createAsyncThunk('auth/forgotPassword', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading());

        const { data } = await axios.put(`${serverURL}/${authURL}/forgot-password?emailAddress=${Payload.emailAddress}`, { withCredentials: true })

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userForgotPassword))

        return data;
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
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading());

        const { data } = await axios.put(`${serverURL}/${authURL}/reset-password/${Payload.token}`, Payload, { withCredentials: true })

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userResetPassword))

        return data;
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
});

export const verifyEmail = createAsyncThunk('auth/confirmation', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading());

        const { data } = await axios.put(`${serverURL}/${authURL}/confirmation/${Payload.token}?code=${Payload.code}`, {}, { withCredentials: true })

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userVerifyEmail))

        return data;
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
});

export const ResendVerifyEmailLink = createAsyncThunk('auth/confirmation', async ({emailAddress}, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading());

        const { data } = await axios.put(`${serverURL}/${authURL}/resend/email-verification?emailAddress=${emailAddress}`, {}, { withCredentials: true })

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userResendVerificationEmail))

        return data;
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