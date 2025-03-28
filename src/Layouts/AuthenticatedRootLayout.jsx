import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Topbar from '../components/ui/Topbar'
import Sidebar from '../components/ui/Sidebar/Sidebar'

const RootLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth)
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [isTopbarDropdownOpen, setTopbarDropdownOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto'
            } else {
                document.body.style.overflow = 'auto'
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            document.body.style.overflow = 'auto'
            window.removeEventListener('resize', handleResize)
        }
    }, [isSidebarOpen])

    if (!isLoggedIn) return null

    return (
        <div className="flex relative">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {isSidebarOpen && window.innerWidth < 768 && (
                <button
                    className="fixed inset-0 bg-gray-900/70 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}></button>
            )}

            <Topbar
                isTopbarDropdownOpen={isTopbarDropdownOpen}
                setTopbarDropdownOpen={setTopbarDropdownOpen}
            />

            <div
                className={`flex-1 flex flex-col pt-16 ${isSidebarOpen ? 'pl-20 md:pl-64' : 'pl-20'} ${
                    isSidebarOpen ? 'overflow-hidden md:overflow-auto' : 'overflow-auto'
                }`}>
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default RootLayout
