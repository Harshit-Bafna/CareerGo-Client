import { useState } from 'react'
import { setError } from '../store/slices/errorSlice'
import { useDispatch } from 'react-redux'
import {validateEmail} from '../utils/helper/syncHelper'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import signin_img from '../assets/signin.svg'
import logo from '../assets/logo.png'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
        } else if (!password) {
            const errorMessage = 'Password is required.'
            dispatch(setError(errorMessage))
            return
        }
    }

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-20 items-center md:mx-0 md:my-0">
            <div className="hidden md:block md:w-1/3 ">
                <img
                    className="h-96"
                    src={signin_img}
                    alt="signin"
                />
            </div>

            <div className="w-full md:w-1/3 max-w-sm">
                <a href="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-5 mx-auto h-9 w-auto"
                    />
                </a>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}>
                    <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight">Sign in to Your Account!</h2>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Email <span className="text-red-700">*</span>
                        </label>
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                            type="text"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Password <span className="text-red-700">*</span>
                        </label>
                        <div className="relative">
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        setShowPassword(!showPassword)
                                    }
                                }}
                                aria-label="Toggle password visibility">
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                    </div>
                    <a
                        className="mt-2 mb-1 block text-right font-semibold text-sm text-deep-blue hover:underline hover:underline-offset-4"
                        href="/">
                        Forgot Password?
                    </a>
                    <div className="text-center md:text-left">
                        <button
                            className="bg-deep-blue hover:bg-navy-blue w-full px-5 py-2 text-sm font-medium text-white rounded"
                            type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don&apos;t have an account?{' '}
                    <a
                        className="text-deep-blue hover:underline hover:underline-offset-4"
                        href="/">
                        Sign up
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Login
