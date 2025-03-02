import { useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { verifyEmail } from '../store/slices/authSlice'
import { setError } from '../store/slices/errorSlice'

const EmailVerification = () => {
    const { token } = useParams()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoggedIn } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard')
        }

        return null
    }, [isLoggedIn, navigate])

    useEffect(() => {
        const verifyUserEmail = async () => {
            if (!token || !code) {
                dispatch(setError('Invalid verification link.'))
                navigate('/signup')
                return
            }

            try {
                const response = await dispatch(verifyEmail({ token, code }))

                if (response.meta.requestStatus === 'fulfilled') {
                    navigate('/signin')
                } else {
                    dispatch(setError('Email verification failed.'))
                    navigate('/signup')
                }
            } catch {
                dispatch(setError('Something went wrong.'))
                navigate('/signup')
            }
        }

        verifyUserEmail()
    }, [token, code, dispatch, navigate])

    return null
}

export default EmailVerification