import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RootLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard')
        }
    }, [isLoggedIn, navigate])

    if (isLoggedIn) return null

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default RootLayout
