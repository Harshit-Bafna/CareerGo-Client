import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setError } from "./errorSlice"
import { setSuccess } from "./messageSlice"
import { startLoading, stopLoading } from "./loaderSlice"
import successMessage from "../../utils/constants/successMessage"
import config from "../../data/config"
import api from "../../utils/services/api"

const serverURL = config.SERVER_URL
const counsellingURL = 'api/v1/counselling'

const initialState = null

export const BookNewCounsellingSession = createAsyncThunk('book/counselling', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.post(`${serverURL}/${counsellingURL}/request`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const GetCounsellingSessions = createAsyncThunk('get/counselling', async ({ userId, institutionId, status }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.get(`${serverURL}/${counsellingURL}?userId=${userId}&institutionId=${institutionId}&status=${status}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const GetBookedDates = createAsyncThunk('getBookedDates/counselling', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.get(`${serverURL}/${counsellingURL}/getBookedDates`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const ApproveOrRejectCounsellingSession = createAsyncThunk('approveOrReject/counselling', async ({ counsellingId, Payload }, thunkAPI) => {
    try {

        const { data } = await api.put(`${serverURL}/${counsellingURL}/approve/${counsellingId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const RescheduleCounsellingSession = createAsyncThunk('reschedule/counselling', async ({ counsellingId, Payload }, thunkAPI) => {
    try {

        const { data } = await api.put(`${serverURL}/${counsellingURL}/reschedule/${counsellingId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const CancelCounsellingSession = createAsyncThunk('cancel/counselling', async ({ counsellingId }, thunkAPI) => {
    try {

        const { data } = await api.delete(`${serverURL}/${counsellingURL}/cancel/${counsellingId}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

export const CompleteCounsellingSession = createAsyncThunk('complete/counselling', async ({ counsellingId }, thunkAPI) => {
    try {

        const { data } = await api.put(`${serverURL}/${counsellingURL}/complete/${counsellingId}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.userRegister))

        return data

    } catch (error) {
        const errorMessage =
            api.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Something went wrong'

        thunkAPI.dispatch(setError(errorMessage))
        return thunkAPI.rejectWithValue(errorMessage)
    }
})

const counsellingSlice = createSlice({
    name: 'counselling',
    initialState,
    reducers: {},
})

export default counsellingSlice.reducer