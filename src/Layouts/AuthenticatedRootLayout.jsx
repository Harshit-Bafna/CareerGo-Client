import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/ui/Topbar'
import Sidebar from '../components/ui/Sidebar'

const RootLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [isTopbarDropdownOpen, setTopbarDropdownOpen] = useState(false)

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
