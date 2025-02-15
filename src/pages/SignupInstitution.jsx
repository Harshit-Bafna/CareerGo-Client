import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setError } from '../store/slices/errorSlice'
import { registerInstitution } from '../store/slices/authSlice'
import { uploadToAWS } from '../store/slices/awsSlice'
import { validateEmail, validatePassword, useBtnNavigation } from '../utils/helper/syncHelper'
import signin_img from '../assets/signupInstitution.svg'
import logo from '../assets/logo.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { LuLoaderCircle } from 'react-icons/lu'
import { FaArrowRight } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'

const SignupInstitution = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [institutionName, setInstitutionName] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [institutionLogo, setInstitutionLogo] = useState('')
    const [logoLoading, setLogoLoading] = useState(false)
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [adminName, setAdminName] = useState('')
    const [adminEmail, setAdminEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [conscent, setConscent] = useState(false)

    const handleNext = () => {
        if (!institutionName || !registrationNumber) {
            dispatch(setError('Please fill in all required fields before proceeding.'))
            return
        }
        setStep(2)
    }

    const handleLogoUpload = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('fileName', file.name)
            formData.append('folderName', 'Institution_logo')

            const awsPayload = {
                fileDetails: formData,
                setLoading: setLogoLoading,
            }

            const response = await dispatch(uploadToAWS(awsPayload))

            setInstitutionLogo(response.data.key)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!institutionName) {
            const errorMessage = 'Institution Name is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!registrationNumber) {
            const errorMessage = 'Registration Number is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!adminName) {
            const errorMessage = 'Admin Name is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!adminEmail) {
            const errorMessage = 'Admin Email is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!validateEmail(adminEmail)) {
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
        } else if (!conscent) {
            const errorMessage = 'Please agree to terms and conditions'
            dispatch(setError(errorMessage))
            return
        }

        const payload = {
            adminName: adminName,
            institutionName: institutionName,
            logo: institutionLogo,
            website: websiteUrl,
            registrationNumber: registrationNumber,
            emailAddress: adminEmail,
            password: password,
            conscent: conscent,
        }

        const response = await dispatch(registerInstitution(payload))

        if (response.meta.requestStatus === 'rejected') {
            dispatch(setError('Registration failed. Please try again.'))
        }

        if (response.meta.requestStatus === 'fulfilled') {
            navigate('/sentEmail', { state: { SentEmailMessage: 'to verify the email' } })
        }
    }

    return (
        <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-20 items-center md:mx-0 md:my-3">
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
                        className="mb-2 mx-auto h-9 w-auto"
                    />
                </NavLink>
                <h2 className="text-gray-900 text-xl md:text-2xl font-bold tracking-tight mb-4">Start Your Journey with Us!</h2>
                <form onSubmit={handleSubmit}>
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="institutionName"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Institution Name <span className="text-red-700">*</span>
                                </label>
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                    type="text"
                                    placeholder="Institution Name"
                                    value={institutionName}
                                    onChange={(e) => setInstitutionName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="registrationNumber"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Registration Number<span className="text-red-700">*</span>
                                </label>
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                    type="text"
                                    placeholder="Registration Number (eg. REG123456)"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <label
                                    htmlFor="logo"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Logo
                                </label>
                                <div className="relative w-full">
                                    <input
                                        className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded pr-10"
                                        type="file"
                                        placeholder="Logo"
                                        onChange={handleLogoUpload}
                                    />
                                    {logoLoading && (
                                        <LuLoaderCircle
                                            className="absolute top-3 right-3 animate-spin text-gray-500 "
                                            size={20}
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="url"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Website URL
                                </label>
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                    type="text"
                                    placeholder="Website URL"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={handleNext}
                                className="inline-flex justify-center items-center w-full bg-deep-blue text-white py-2 rounded-lg hover:bg-navy-blue transition">
                                Next <FaArrowRight className="ml-1 text-xs" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="adminName"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Admin Name <span className="text-red-700">*</span>
                                </label>
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                    type="text"
                                    placeholder="Admin Name"
                                    value={adminName}
                                    onChange={(e) => setAdminName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="adminEmail"
                                    className="block mb-2 text-sm font-medium text-gray-900">
                                    Admin Email <span className="text-red-700">*</span>
                                </label>
                                <input
                                    className="text-sm w-full px-4 py-2 border border-solid bg-gray-50 border-gray-300 rounded"
                                    type="text"
                                    placeholder="Admin Email Address"
                                    value={adminEmail}
                                    onChange={(e) => setAdminEmail(e.target.value)}
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
                                    checked={conscent}
                                    onChange={(e) => setConscent(e.target.checked)}
                                />
                                <label
                                    htmlFor="conscent"
                                    className="text-sm">
                                    {' '}
                                    Agree to terms and conditions{' '}
                                </label>
                            </div>

                            <div className="text-center md:text-left">
                                <button className="w-full bg-deep-blue text-white py-2 rounded-lg hover:bg-navy-blue transition">
                                    Sign Up as an institution
                                </button>
                            </div>
                        </div>
                    )}
                </form>
                <div className="mt-1 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account?{' '}
                    <NavLink
                        className="text-deep-blue hover:underline hover:underline-offset-4"
                        to="/signin">
                        Sign in
                    </NavLink>
                </div>
                <div className="flex justify-center items-center font-inter my-5 text-dark-gray">
                    <hr className="w-8 border-dark-gray mr-2" />
                    or as an individual
                    <hr className="w-8 border-dark-gray ml-2" />
                </div>
                <div className="text-center md:text-left mb-3">
                    <button
                        onClick={useBtnNavigation('/signup')}
                        className="w-full border border-deep-blue text-deep-blue py-2 rounded-lg hover:bg-deep-blue hover:text-white transition">
                        Sign Up as an individual
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SignupInstitution
