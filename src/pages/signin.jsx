import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setError } from '../store/slices/errorSlice'
import { userLogin } from '../store/slices/authSlice'
import { validateEmail } from '../utils/helper/syncHelper'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import signin_img from '../assets/signin.svg'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'

const Signin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async(e) => {
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

        const payload = {
            emailAddress: email,
            password,
        }

        const response = await dispatch(userLogin(payload))

        if (response.meta.requestStatus === 'fulfilled') {
            navigate('/')
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
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-5 mx-auto h-9 w-auto"
                    />
                </NavLink>
                <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight mb-4">Sign in to Your Account!</h2>
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}>
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
                    <NavLink
                        className="mt-2 mb-1 block text-right font-semibold text-sm text-deep-blue hover:underline hover:underline-offset-4"
                        to="/forgotPassword">
                        Forgot Password?
                    </NavLink>
                    <div className="text-center md:text-left">
                        <button className="w-full bg-deep-blue text-white py-2 rounded-lg hover:bg-navy-blue transition">Sign In</button>
                    </div>
                </form>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don&apos;t have an account?{' '}
                    <NavLink
                        className="text-deep-blue hover:underline hover:underline-offset-4"
                        to="/signup">
                        Sign up
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default Signin
