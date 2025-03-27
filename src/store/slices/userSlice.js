import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { startLoading, stopLoading } from "./loaderSlice"
import { setError } from "./errorSlice"
import { setSuccess } from "./messageSlice"
import successMessage from "../../utils/constants/successMessage"
import api from "../../utils/services/api"

const userURL = 'api/v1/user'

const initialState = {
    userId: null,
    emailAddress: null,
    name: null,
    profileImage: null,
    role: null,
    institutionId: null,
    userProfileProgress: null
}

export const selfIdentification = createAsyncThunk('user/selfIdentification', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.get(`/${userURL}/self-identification`)

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

export const updateBasicInfo = createAsyncThunk('user/updateBasicInfo', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.put(`/${userURL}/basicInfo`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.updateBasicInfo))

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

export const getBasicInfo = createAsyncThunk('user/getBasicInfo', async (_, thunkAPI) => {
    try {
        const { data } = await api.get(`/${userURL}/basicInfo`)

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

export const createAchievement = createAsyncThunk('user/createAchievement', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.post(`/${userURL}/achievement`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.createAchievement))

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

export const getAchievements = createAsyncThunk('user/getAchievements', async (_, thunkAPI) => {
    try {
        const { data } = await api.get(`/${userURL}/achievement`)

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

export const updateAchievement = createAsyncThunk('user/updateAchievement', async (Payload, thunkAPI) => {
    try {
        const { data } = await api.put(`/${userURL}/achievement/${Payload.achievementId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.updateAchievement))

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

export const deleteAchievement = createAsyncThunk('user/deleteAchievement', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.delete(`/${userURL}/achievement/${Payload.achievementId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.deleteAchievement))

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

export const createCertification = createAsyncThunk('user/createCertification', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.post(`/${userURL}/certification`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.createCertification))

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

export const getCertification = createAsyncThunk('user/getCertification', async (_, thunkAPI) => {
    try {
        const { data } = await api.get(`/${userURL}/certification`)

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

export const updateCertification = createAsyncThunk('user/updateCertification', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.put(`/${userURL}/certification/${Payload.certificationId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.updateCertification))

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

export const deleteCertification = createAsyncThunk('user/deleteCertification', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.delete(`/${userURL}/certification/${Payload.certificationId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.deleteCertification))

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

export const createEducation = createAsyncThunk('user/createEducation', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.post(`/${userURL}/education`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.createEducation))

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

export const getEducation = createAsyncThunk('user/getEducation', async (_, thunkAPI) => {
    try {
        const { data } = await api.get(`/${userURL}/education`)

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

export const updateEducation = createAsyncThunk('user/updateEducation', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.put(`/${userURL}/education/${Payload.educationId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.updateEducation))

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

export const deleteEducation = createAsyncThunk('user/deleteEducation', async (Payload, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading())

        const { data } = await api.delete(`/${userURL}/education/${Payload.educationId}`, Payload)

        if (!data.success) {
            thunkAPI.dispatch(setError(data.message))
            return thunkAPI.rejectWithValue(data.message)
        }

        thunkAPI.dispatch(setSuccess(successMessage.deleteEducation))

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

export const updateProfileImage = createAsyncThunk('user/updateProfileImage', async (Payload, thunkAPI) => {
    try {
        const { data } = await api.put(`/${userURL}/profileImage`, Payload)

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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.data.userId
            state.emailAddress = action.payload.data.emailAddress
            state.name = action.payload.data.name
            state.profileImage = action.payload.data.profileImage
            state.role = action.payload.data.role
            state.institutionId = action.payload.data.institutionId
            state.userProfileProgress = action.payload.data.userProfileProgress
        },
        clearUser: (state) => {
            state.userId = null
            state.emailAddress = null
            state.name = null
            state.profileImage = null
            state.role = null
            state.institutionId = null
            state.userProfileProgress = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(selfIdentification.fulfilled, (state, action) => {
            state.userId = action.payload.data.userId
            state.emailAddress = action.payload.data.emailAddress
            state.name = action.payload.data.name
            state.profileImage = action.payload.data.profileImage
            state.role = action.payload.data.role
            state.institutionId = action.payload.data.institutionId
            state.userProfileProgress = action.payload.data.userProfileProgress
        })

    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer