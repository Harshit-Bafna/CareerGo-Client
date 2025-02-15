import { useLocation } from 'react-router-dom'

export default function SentEmail() {
    const location = useLocation()
    const SentEmailMessage = location.state?.SentEmailMessage

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-semibold mt-4">Check Your Email</h1>
                <p className="text-gray-600 mt-2">
                    We have sent you an email. Please check your inbox and follow the instructions {SentEmailMessage}.
                </p>
                <p className="text-gray-500 text-sm mt-2">Didn’t receive the email? Check your spam folder or resend it below.</p>
                <button className="mt-4 mx-auto flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Resend Email
                </button>
            </div>
        </div>
    )
}
