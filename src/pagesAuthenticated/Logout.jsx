import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogout } from '../store/slices/authSlice'
import { setError } from '../store/slices/errorSlice'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await dispatch(userLogout())

                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/signin')
                }
            } catch {
                dispatch(setError('Something went wrong.'))
                navigate('/signup')
            }
        }

        logout()
    }, [dispatch, navigate])

    return null
}

export default Logout
