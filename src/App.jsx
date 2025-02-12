import './App.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from './store/slices/errorSlice'
// import Home from './pages/Home'
// import Signup from './pages/signup'
// import Signin from './pages/signin'
// import ForgotPassword from './pages/forgotPassword'
// import Contact from './pages/contact'
// import About from './pages/about'
import PageNotFound from './pages/PageNotFound'     
import Message from './components/Message'
import Loader from './components/Loader'

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
            {isError && errorMessage && <Message message={errorMessage} isTypeError={true} />}
            {isLoading && <Loader />}
            <PageNotFound/>
            {/* <Home /> */}
            {/* <Signup/> */}
            {/* <Signin/> */}
            {/* <ForgotPassword/> */}
            {/* <About/> */}
            {/* <Contact/> */}
        </>
    )
}

export default App
