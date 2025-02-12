import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Layouts/RootLayout'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

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
