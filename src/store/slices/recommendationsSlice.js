import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setError } from "./errorSlice"
import config from "../../data/config"
import api from "../../utils/services/api"

const serverURL = config.SERVER_URL
const recommendationsURL = 'api/v1/recommendations'

const initialState = null

export const InstitutionsRecommendation = createAsyncThunk('recommendations', async (Payload, thunkAPI) => {
    try {
        const { data } = await api.post(`${serverURL}/${recommendationsURL}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

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

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers: {},
})

export default recommendationsSlice.reducer