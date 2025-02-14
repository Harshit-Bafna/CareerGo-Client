import './App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from './store/slices/errorSlice'
import { clearSuccess } from './store/slices/messageSlice'
import Message from './components/Message'
import Loader from './components/Loader'
import { Router } from './Router'
import { RouterProvider } from 'react-router-dom'

function App() {
    const { isError, errorMessage } = useSelector((state) => state.error)
    const { isSuccess, successMessage } = useSelector((state) => state.success)
    const { isLoading } = useSelector((state) => state.loader)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                dispatch(clearError())
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isError, dispatch])

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                dispatch(clearSuccess())
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [isSuccess, dispatch])

    return (
        <>
            {isError && errorMessage && (
                <Message
                    message={errorMessage}
                    isTypeError={true}
                />
            )}
            {isSuccess && successMessage && (
                <Message
                    message={successMessage}
                    isTypeError={false}
                />
            )}
            {isLoading && <Loader />}

            <RouterProvider router={Router} />
        </>
    )
}

export default App
