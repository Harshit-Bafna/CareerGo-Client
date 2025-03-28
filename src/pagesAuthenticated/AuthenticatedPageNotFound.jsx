import { NavLink } from "react-router-dom"

const AuthenticatedPageNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white p-4">
            <div className="text-center">
                <h1 className="text-7xl font-extrabold text-dark-gray lg:text-9xl">404</h1>
                <p className="text-3xl font-bold text-dark-gray md:text-4xl mt-4">Something is missing.</p>
                <p className="text-lg text-gray-500 mt-2">
                    Sorry, we cannot find that page. You will find lots to explore on the home page.
                </p>
                <NavLink
                    to="/dashboard"
                    className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-deep-blue rounded-lg hover:bg-navy-blue">
                    Back to Dashboard
                </NavLink>
            </div>
        </div>
    )
}

export default AuthenticatedPageNotFound
