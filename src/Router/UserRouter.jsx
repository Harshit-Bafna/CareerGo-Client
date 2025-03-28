import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AuthenticatedRootLayout from '../Layouts/AuthenticatedRootLayout'
import { Route } from 'react-router-dom'
import Dashboard from '../pagesAuthenticated/Dashboard'
import UserProfile from '../pagesAuthenticated/Profile/UserProfile'
import ChangePassword from '../pagesAuthenticated/Profile/ChangePassword'
import Education from '../pagesAuthenticated/Profile/Education'
import CertificationAndCourses from '../pagesAuthenticated/Profile/CertificationAndCourses'
import Achievements from '../pagesAuthenticated/Profile/Achievements'
import Recommendations from '../pagesAuthenticated/Recommendations'
import BookCounselling from '../pagesAuthenticated/Counselling/BookCounselling'
import ViewCounselling from '../pagesAuthenticated/Counselling/ViewCounselling'
import Logout from '../pagesAuthenticated/Logout'
import Support from '../pagesAuthenticated/Support'
import AuthenticatedPageNotFound from '../pagesAuthenticated/AuthenticatedPageNotFound'

export const UserRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
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
            <Route
                path="*"
                element={<AuthenticatedPageNotFound /> }
            />
        </>
    )
)
