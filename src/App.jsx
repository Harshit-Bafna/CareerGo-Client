import './App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from './store/slices/errorSlice'
import Home from './pages/Home'
import Message from './components/Message'
// import Loader from './components/Loader'

function App() {
    const { isError, errorMessage } = useSelector((state) => state.error)
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
            {isError && errorMessage && <Message message={errorMessage} isTypeError={true} />}
            <Home />
        </>
    )
}

export default App
