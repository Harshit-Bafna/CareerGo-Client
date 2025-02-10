import { useState } from 'react'
import { setError } from '../store/slices/errorSlice'
import { useDispatch } from 'react-redux'
import { validateEmail, validatePassword } from '../utils/helper/syncHelper'
import signin_img from '../assets/signup.svg'
import logo from '../assets/logo.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            const errorMessage = 'Name is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!email) {
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
        } else if (!validatePassword(password)) {
            const errorMessage =
                'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.'
            dispatch(setError(errorMessage))
            return
        } else if (!confirmPassword) {
            const errorMessage = 'Confirm password is required.'
            dispatch(setError(errorMessage))
            return
        } else if (password !== confirmPassword) {
            const errorMessage = 'Passwords do not match.'
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
                        className="mb-2 mx-auto h-9 w-auto"
                    />
                </a>
                <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight mb-4">Start Your Journey with Us!</h2>
                <form
                    className="space-y-2"
                    onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Name <span className="text-red-700">*</span>
                        </label>
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Confirm Password <span className="text-red-700">*</span>
                        </label>
                        <div className="relative">
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                }}
                                aria-label="Toggle confirm password visibility">
                                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="mt-5 mb-2"
                        />
                        <label
                            htmlFor="consent"
                            className="text-sm">
                            {' '}
                            Agree to terms and conditions{' '}
                        </label>
                    </div>
                    <div className="text-center md:text-left">
                        <button className="w-full bg-deep-blue text-white py-2 rounded-lg hover:bg-navy-blue transition">Sign Up</button>
                    </div>
                </form>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account?{' '}
                    <a
                        className="text-deep-blue hover:underline hover:underline-offset-4"
                        href="/">
                        Sign in
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Login
