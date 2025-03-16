import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
})

api.interceptors.request.use(async (request) => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    if (!accessToken && refreshToken) {
        try {
            const { data } = await axios.post(`http://localhost:8000/api/v1/auth/refresh-token`, {}, { withCredentials: true })

            if (!data.success) {
                return Promise.reject(data.message)
            }
        } catch {
            const { data } = await axios.post(`http://localhost:8000/api/v1/auth/logout`, {}, { withCredentials: true })

            if (!data.success) {
                return Promise.reject(data.message)
            }
        }
    }
    else if (!accessToken && !refreshToken) {
        const { data } = await axios.post(`http://localhost:8000/api/v1/auth/logout`, {}, { withCredentials: true })

        if (!data.success) {
            return Promise.reject(data.message)
        }
    }

    return request
}, (error) => {
    return Promise.reject(error)
})

export default api