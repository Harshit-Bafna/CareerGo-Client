import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { startLoading, stopLoading } from "./loaderSlice"
import { setError } from "./errorSlice"
import { setSuccess } from "./messageSlice"
import successMessage from "../../utils/constants/successMessage"
import api from "../../utils/services/api"

const institutionURL = 'api/v1/institution'

const initialState = null

export const updateInstitutionLogo = createAsyncThunk('institution/updateLogo', async ({ institutionId, logo }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.put(`/${institutionURL}/logo/${institutionId}?logo=${logo}`)

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
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const updateInstitutionDetails = createAsyncThunk('institution/updateDetails', async ({ institutionId, Payload }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.put(`/${institutionURL}/details/${institutionId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.updateInstitutionDetails))

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

export const getAllInstitutions = createAsyncThunk('institution/get', async ({ search, page, limit }, thunkAPI) => {
    try {
        const { data } = await api.get(`/${institutionURL}/getAllInstitutionList?search=${search}&page=${page}&limit=${limit}`)

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

export const getInstitutionDetails = createAsyncThunk('institution/getDetails', async ({ institutionId, Payload }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.get(`/${institutionURL}/details/${institutionId}`, Payload)

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
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const createCourseCategory = createAsyncThunk('institution/createCourseCategory', async ({ institutionId, Payload }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.post(`/${institutionURL}/courseCategory/${institutionId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.createCourseCategory))

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

export const getCourseCategory = createAsyncThunk('institution/getCourseCategory', async ({ institutionId }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.get(`/${institutionURL}/courseCategory/${institutionId}`)

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
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const deleteCourseCategory = createAsyncThunk('institution/deleteCourseCategory', async ({ institutionId, categoryName }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.delete(`/${institutionURL}/courseCategory/${institutionId}/?categoryName=${categoryName}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.deleteCourseCategory))

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

export const createCourse = createAsyncThunk('institution/createCourse', async ({ institutionId, Payload }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.post(`/${institutionURL}/course/${institutionId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.createCourse))

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

export const getAllCourse = createAsyncThunk('institution/getAllCourse', async ({ institutionId, category, search }, thunkAPI) => {
    try {
        const { data } = await api.get(`/${institutionURL}/course/all/${institutionId}/?category=${category}&search=${search}`)

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

export const getCourseDetails = createAsyncThunk('institution/getCourseDetails', async ({ institutionId, courseId }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.get(`/${institutionURL}/course/detail/${institutionId}?courseId=${courseId}`)

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
    } finally {
        thunkAPI.dispatch(stopLoading())
    }
})

export const updateCourseDetails = createAsyncThunk('institution/updateCourseDetails', async ({ institutionId, courseId, Payload }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.put(`/${institutionURL}/course/${institutionId}/?courseId=${courseId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.updateCourse))

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

export const deteleCourse = createAsyncThunk('institution/deteleCourse', async ({ institutionId, courseId }, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.delete(`/${institutionURL}/course/${institutionId}/?courseId=${courseId}`)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.deleteCourse))

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

const institutionSlice = createSlice({
    name: 'institution',
    initialState,
    reducers: {},
})

export default institutionSlice.reducer