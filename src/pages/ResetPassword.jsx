import { useState } from 'react'
import logo from '../assets/logo.png'
import resetPasswordImg from '../assets/resetPassword.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { validatePassword } from '../utils/helper/syncHelper'
import { setError } from '../store/slices/errorSlice'
import { resetPassword } from '../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!password) {
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

        const Payload = {
            token: token,
            newPassword: password,
        }

        const response = await dispatch(resetPassword(Payload))

        if (response.meta.requestStatus === 'fulfilled') {
            navigate('/logout')
        }
    }

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center p-6 md:p-0">
            <div className="hidden md:flex md:w-1/2 justify-center items-center pr-10">
                <img
                    src={resetPasswordImg}
                    alt="Reset Password"
                    className="max-w-xs md:max-w-md ml-auto"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center px-6 md:px-16">
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="mb-5 mx-auto h-9 w-auto"
                    />
                </NavLink>
                <h2 className="text-2xl md:text-4xl font-bold text-dark-gray mb-3">Reset your password now!</h2>
                <p className="text-gray-600 text-center mb-6 max-w-sm">
                    Do not worry, happens to all of us. Enter your new password below to continue.
                </p>

                <form
                    className="space-y-4 w-full max-w-sm"
                    onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            New Password <span className="text-red-700">*</span>
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

                    <button className="mt-4 w-full bg-deep-blue text-white py-2 rounded-lg hover:bg-navy-blue transition">Continue</button>

                    <div className="mt-4 text-center">
                        <NavLink
                            to="/signin"
                            className="text-dark-gray font-medium hover:underline">
                            &lt; Back to Login
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
