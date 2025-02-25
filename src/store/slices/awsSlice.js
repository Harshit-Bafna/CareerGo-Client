import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setError } from './errorSlice'
import axios from 'axios'
import config from '../../data/config'

const serverURL = config.SERVER_URL
const awsURL = 'api/v1/s3'

export const uploadToAWS = createAsyncThunk('aws/upload', async ({ fileDetails, setLoading }, thunkAPI) => {
    try { 
        setLoading(true)

        const { data } = await axios.post(`${serverURL}/${awsURL}/upload`, fileDetails)

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
        setLoading(false)
    }
})

export const getSignedURL = createAsyncThunk('aws/getSignedURL', async ({ key, setLoading }, thunkAPI) => {
    try { 
        setLoading(true)

        const { data } = await axios.get(`${serverURL}/${awsURL}/getSignedURL?key=${key}`)

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
        setLoading(false)
    }
})

export const deleteFile = createAsyncThunk('aws/deleteFile', async ({ key, setLoading }, thunkAPI) => {
    try { 
        setLoading(true)

        const { data } = await axios.delete(`${serverURL}/${awsURL}/deleteFile?key=${key}`)

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
        setLoading(false)
    }
})

const awsSlice = createSlice({
    name: 'aws',
    initialState: null,
    reducers: {},
})

export default awsSlice.reducer
