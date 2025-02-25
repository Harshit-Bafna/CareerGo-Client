import { useState } from 'react'
import { setError } from '../../store/slices/errorSlice'
import { changePassword } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { validatePassword } from '../../utils/helper/syncHelper'
import changePasswordImg from '../../assets/changePassword.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ChangePassword = () => {
    const dispatch = useDispatch()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!oldPassword) {
            const errorMessage = 'Old Password is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!validatePassword(oldPassword)) {
            const errorMessage =
                'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.'
            dispatch(setError(errorMessage))
            return
        } else if (!newPassword) {
            const errorMessage = 'New Password is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!validatePassword(newPassword)) {
            const errorMessage =
                'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.'
            dispatch(setError(errorMessage))
            return
        } else if (!confirmPassword) {
            const errorMessage = 'Confirm password is required.'
            dispatch(setError(errorMessage))
            return
        } else if (newPassword !== confirmPassword) {
            const errorMessage = 'Passwords do not match.'
            dispatch(setError(errorMessage))
            return
        }

        const payload = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        }

        dispatch(changePassword(payload))
    }

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center lg:p-0">
            <div className="hidden lg:flex lg:w-1/2 justify-center items-center pr-10">
                <img
                    src={changePasswordImg}
                    alt="Forgot Password"
                    className="max-w-xs lg:max-w-md ml-auto"
                />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center px-6 lg:px-16">
                <h2 className="text-2xl lg:text-4xl font-bold text-dark-gray mb-3">Change your password</h2>
                <p className="text-gray-600 text-center mb-6 max-w-sm">Enter your current passowrd and new password </p>

                <form
                    form
                    className="space-y-4 w-full max-w-sm"
                    onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Old Password <span className="text-red-700">*</span>
                        </label>
                        <div className="relative">
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
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
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            New Password <span className="text-red-700">*</span>
                        </label>
                        <div className="relative">
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
