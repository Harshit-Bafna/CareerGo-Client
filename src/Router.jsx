import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'
import AuthenticatedRootLayout from './Layouts/AuthenticatedRootLayout'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SignupInstitution from './pages/SignupInstitution'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import SentEmail from './pages/SentEmail'
import EmailVerification from './pages/EmailVerification'
import Dashboard from './pagesAuthenticated/Dashboard'
import UserProfile from './pagesAuthenticated/Profile/UserProfile'
import ChangePassword from './pagesAuthenticated/Profile/ChangePassword'
import Education from './pagesAuthenticated/Profile/Education'
import CertificationAndCourses from './pagesAuthenticated/Profile/CertificationAndCourses'
import Achievements from './pagesAuthenticated/Profile/Achievements'
import Recommendations from './pagesAuthenticated/Recommendations'
import BookCounselling from './pagesAuthenticated/Counselling/BookCounselling'
import ViewCounselling from './pagesAuthenticated/Counselling/ViewCounselling'
import Logout from './pagesAuthenticated/Logout'
import InstitutionProfile from './pagesAuthenticated/Institution Profile/InstitutionProfile'
import Support from './pagesAuthenticated/Support' 

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
                path="/signupInstitution"
                element={<SignupInstitution />}
            />
            <Route
                path="/forgotPassword"
                element={<ForgotPassword />}
            />
            <Route
                path="/sentEmail"
                element={<SentEmail />}
            />
            <Route
                path="/resetPassword/:token"
                element={<ResetPassword />}
            />
            <Route
                path="/confirmation/:token"
                element={<EmailVerification />}
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

            <Route
                path="/dashboard"
                element={<AuthenticatedRootLayout />}>
                <Route
                    index
                    element={<Dashboard />}
                />
                <Route
                    path="userProfile"
                    element={<UserProfile />}>
                    <Route
                        path="certificationAndCourses"
                        element={<CertificationAndCourses />}
                    />
                    <Route
                        path="education"
                        element={<Education />}
                    />
                    <Route
                        path="achievements"
                        element={<Achievements />}
                    />
                </Route>
                <Route
                    path="institutionProfile"
                    element={<InstitutionProfile />}
                />
                <Route
                    path="changePassword"
                    element={<ChangePassword />}
                />
                <Route
                    path="recommendations"
                    element={<Recommendations />}
                />
                <Route
                    path="bookCounselling"
                    element={<BookCounselling />}
                />
                <Route
                    path="counselling"
                    element={<ViewCounselling />}
                />
                <Route
                    path="support"
                    element={<Support />}
                />
            </Route>
            <Route
                path="/logout"
                element={<Logout />}
            />
        </>
    )
)
