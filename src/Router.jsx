import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import SentEmail from './pages/SentEmail'

export const Router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/signin"
                element={<Signin />}
            />
            <Route
                path="/signup"
                element={<Signup />}
            />
            <Route
                path="/forgotPassword"
                element={<ForgotPassword />}
            />
            <Route
                path="/forgotPassword/sentEmail"
                element={<SentEmail message={'forgot pass'} />}
            />
            <Route
                path="/resetPassword/:token"
                element={<ResetPassword />}
            />

            <Route
                path="/"
                element={<RootLayout />}>
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path="about"
                    element={<About />}
                />
                <Route
                    path="contact"
                    element={<Contact />}
                />
                <Route
                    path="*"
                    element={<PageNotFound />}
                />
            </Route>
        </>
    )
)
