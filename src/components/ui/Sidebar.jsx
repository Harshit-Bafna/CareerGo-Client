import { useState } from 'react'
import { FaSignOutAlt, FaHome, FaBookOpen, FaUser, FaLightbulb, FaLock } from 'react-icons/fa'
import { LuListCollapse } from 'react-icons/lu'
import { IoIosArrowDown } from 'react-icons/io'
import logoWhite from '../../assets/logo-white.png'
import logoIconWhite from '../../assets/logoIcon-white.png'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isCounsellingOpen, setIsCounsellingOpen] = useState(false)

    return (
        <div
            className={`fixed z-50 bg-deep-indigo text-white ${isSidebarOpen ? 'w-64' : 'w-20'} px-4 py-6 flex flex-col justify-between transition-all duration-300 h-screen`}>
            <div>
                <img
                    src={isSidebarOpen ? logoWhite : logoIconWhite}
                    alt="logo"
                    className="h-7 w-auto"
                />

                <nav className="mt-5 space-y-2">
                    <SidebarItem
                        to="/dashboard"
                        icon={<FaHome />}
                        text="Dashboard"
                        isSidebarOpen={isSidebarOpen}
                    />

                    <div
                        className="relative group"
                        onMouseEnter={() => setIsProfileOpen(true)}
                        onMouseLeave={() => setIsProfileOpen(false)}>
                        <button
                            className="flex items-center p-3 w-full rounded cursor-pointer transition-all duration-200 hover:bg-gray-700"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}>
                            <FaUser />
                            <span className={`ml-3 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>User Profile</span>
                            <IoIosArrowDown className={`ml-auto transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isProfileOpen && (
                            <div className="ml-10 space-y-1 transition-all duration-300">
                                <SidebarItem
                                    to="/dashboard/userProfile"
                                    icon={<FaUser />}
                                    text="Profile"
                                    isSidebarOpen={isSidebarOpen}
                                />
                                <SidebarItem
                                    to="/dashboard/changePassword"
                                    icon={<FaLock />}
                                    text="Change Password"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </div>
                        )}
                    </div>

                    <SidebarItem
                        to="/dashboard/recommendations"
                        icon={<FaLightbulb />}
                        text="Recommendations"
                        isSidebarOpen={isSidebarOpen}
                    />

                    <div
                        className="relative group"
                        onMouseEnter={() => setIsCounsellingOpen(true)}
                        onMouseLeave={() => setIsCounsellingOpen(false)}>
                        <button
                            className="flex items-center p-3 w-full rounded cursor-pointer transition-all duration-200 hover:bg-gray-700"
                            onClick={() => setIsCounsellingOpen(!isCounsellingOpen)}>
                            <FaBookOpen />
                            <span className={`ml-3 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>Counselling</span>
                            <IoIosArrowDown className={`ml-auto transition-transform duration-200 ${isCounsellingOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isCounsellingOpen && (
                            <div className="ml-10 space-y-1 transition-all duration-300">
                                <SidebarItem
                                    to="/dashboard/bookCounselling"
                                    icon={<FaBookOpen />}
                                    text="Book Counselling"
                                    isSidebarOpen={isSidebarOpen}
                                />
                                <SidebarItem
                                    to="/dashboard/counselling"
                                    icon={<FaLock />}
                                    text="View Counselling"
                                    isSidebarOpen={isSidebarOpen}
                                />
                            </div>
                        )}
                    </div>
                    
                    <SidebarItem
                        to="/logout"
                        icon={<FaSignOutAlt />}
                        text="Logout"
                        isSidebarOpen={isSidebarOpen}
                    />
                </nav>
            </div>

            <button
                className="px-3 cursor-pointer w-full flex items-center focus:outline-none"
                onClick={() => setSidebarOpen(!isSidebarOpen)}>
                <LuListCollapse className={`text-xl duration-200 ${isSidebarOpen && 'rotate-180'}`} />
                <span className={`ml-3 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>Collapsed View</span>
            </button>
        </div>
    )
}

const SidebarItem = ({ to, icon, text, isSidebarOpen }) => (
    <NavLink
        to={to}
        className={'flex items-center p-3 rounded cursor-pointer transition-all duration-200 hover:bg-gray-700'}>
        {icon}
        <span className={`ml-3 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'}`}>{text}</span>
    </NavLink>
)