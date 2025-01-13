import '../styles/login.css'
import signin_img from "../assets/login.webp";
import logo_img from "../assets/logoIcon.png";

const Login = () => {
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="hidden md:block md:w-1/3 max-w-sm">
                <img src={signin_img} alt="signin" />
            </div>

            <div className="md:w-1/3 max-w-sm">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src={logo_img} alt="logo" className="mx-auto h-20 w-auto"/>
                    <h2 className="signInTxt mb-10 text-center font-bold tracking-tight">
                        Sign in to your account
                    </h2>
                </div>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    placeholder="Password"
                />
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input
                            className="mr-1"
                            type="checkbox"
                        />
                        <span>Remember Me</span>
                    </label>
                    <a
                        className="forgotPassword hover:underline hover:underline-offset-4"
                        href="/">
                        Forgot Password?
                    </a>
                </div>
                <div className="text-center md:text-left">
                    <button
                        className="signinBtn mt-4 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit">
                        Sign In
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don&apos;t have an account?{' '}
                    <a
                        className="register hover:underline hover:underline-offset-4"
                        href="/">
                        Register
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Login
