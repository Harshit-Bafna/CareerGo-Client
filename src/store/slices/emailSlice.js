import { createAsyncThunk } from '@reduxjs/toolkit'
import config from "../../data/config"
import axios from 'axios'
import { startLoading, stopLoading } from './loaderSlice'
import { setError } from './errorSlice'
import { createSlice } from '@reduxjs/toolkit'

const serverURL = config.SERVER_URL
const emailURL = 'api/v1/send/email'

export const sendEmail = createAsyncThunk('send/email', async (emailPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${emailURL}`, emailPayload)

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

export const sendBulkEmail = createAsyncThunk('send/bulkEmail', async (emailPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${emailURL}/bulk`, emailPayload)

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

export const sendMultipleEmail = createAsyncThunk('send/multipleEmail', async (emailPayload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await axios.post(`${serverURL}/${emailURL}/multiple`, emailPayload)

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

const emailSlice = createSlice({
    name: 'email',
    initialState: null,
    reducers: {},
})

export default emailSlice.reducer
