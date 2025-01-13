import { useState } from 'react'
import '../styles/Auth.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import signin_img from '../assets/login.webp'
import logo_img from '../assets/logoIcon.png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        if (!email) {
            setErrors((prev) => ({ ...prev, email: 'Email cannot be empty' }));
            valid = false;
        } else if (!validateEmail(email)) {
            setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
            valid = false;
        } else {
            setErrors((prev) => ({ ...prev, email: '' }));
        }

        if (!password) {
            setErrors((prev) => ({ ...prev, password: 'Password cannot be empty' }));
            valid = false;
        } else if (!validatePassword(password)) {
            setErrors((prev) => ({
                ...prev,
                password: 'Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character',
            }));
            valid = false;
        } else {
            setErrors((prev) => ({ ...prev, password: '' }));
        }

        if (valid) {
            // console.log('Form Submitted', { email, password });
            // Perform your API call or action here
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="hidden md:block md:w-1/3 max-w-sm">
                <img src={signin_img} alt="signin" />
            </div>

            <div className="md:w-1/3 max-w-sm">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src={logo_img} alt="logo" className="mx-auto h-20 w-auto" />
                    <h2 className="authTxt mb-10 text-center font-bold tracking-tight">
                        Sign in to your account
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    <div className="relative mt-4">
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
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
                                    e.preventDefault();
                                    setShowPassword(!showPassword);
                                }
                            }}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input className="mr-1" type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <a
                            className="forgotPassword hover:underline hover:underline-offset-4"
                            href="/"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="authBtn mt-4 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don&apos;t have an account?{' '}
                    <a
                        className="accountStatus hover:underline hover:underline-offset-4"
                        href="/"
                    >
                        Register
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Login;
