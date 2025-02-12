import './App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from './store/slices/errorSlice'
import Message from './components/Message'
import Loader from './components/Loader'
import { Router } from './Router'
import { RouterProvider } from 'react-router-dom'

function App() {
    const { isError, errorMessage } = useSelector((state) => state.error)
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

    return (
        <>
            {isError && errorMessage && (
                <Message
                    message={errorMessage}
                    isTypeError={true}
                />
            )}
            {isLoading && <Loader />}

            <RouterProvider router={Router} />
        </>
    )
}

export default App
