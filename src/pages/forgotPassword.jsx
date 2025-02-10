import { useState } from 'react'
import { setError } from '../store/slices/errorSlice'
import { useDispatch } from 'react-redux'
import { validateEmail } from '../utils/helper/syncHelper'
import logo from '../assets/logo.png'
import forgotPasswordImg from '../assets/forgotPassword.svg'

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            const errorMessage = 'Email is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!validateEmail(email)) {
            const errorMessage = 'Invalid email format.'
            dispatch(setError(errorMessage))
            return
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center p-6 md:p-0">
            <div className="hidden md:flex md:w-1/2 justify-center items-center pr-10">
                <img
                    src={forgotPasswordImg}
                    alt="Forgot Password"
                    className="max-w-xs md:max-w-md ml-auto"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center px-6 md:px-16">
                <a href="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-5 mx-auto h-9 w-auto"
                    />
                </a>
                <h2 className="text-2xl md:text-4xl font-bold text-dark-gray mb-3">Forgot your password?</h2>
                <p className="text-gray-600 text-center mb-6 max-w-sm">
                    Do not worry, happens to all of us. Enter your registered email below to recover your password.
                </p>

                <form
                    form
                    className="space-y-4 w-full max-w-sm"
                    onSubmit={handleSubmit}>
                    <label
                        htmlFor="email"
                        className="block text-dark-gray font-medium mb-1">
                        Email <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button className="mt-4 w-full bg-deep-blue text-white py-2 rounded-lg hover:bg-navy-blue transition">Continue</button>

                    <div className="mt-4 text-center">
                        <a href="/" className="text-dark-gray font-medium hover:underline">&lt; Back to Login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
