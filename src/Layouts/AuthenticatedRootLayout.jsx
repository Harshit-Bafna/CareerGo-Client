import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Topbar from '../components/ui/Topbar'
import Sidebar from '../components/ui/Sidebar'

const RootLayout = () => {
    const navigate = useNavigate()

    const { isLoggedIn } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }

    }, [isLoggedIn, navigate])

    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [isTopbarDropdownOpen, setTopbarDropdownOpen] = useState(false)

    if (!isLoggedIn) return null

    return (
        <div className="flex">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <Topbar
                isTopbarDropdownOpen={isTopbarDropdownOpen}
                setTopbarDropdownOpen={setTopbarDropdownOpen}
            />
            <div className={`flex-1 flex flex-col pt-16 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default RootLayout
