import { FaUserCircle, FaUser, FaSignOutAlt, FaHeadset } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Topbar({ isTopbarDropdownOpen, setTopbarDropdownOpen }) {
    const { name, emailAddress, profileImage } = useSelector((state) => state.user)

    return (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-end items-center z-[49]">
            <div
                className="relative"
                onMouseEnter={() => setTopbarDropdownOpen(true)}
                onMouseLeave={() => setTopbarDropdownOpen(false)}>
                {profileImage ? (
                    <button onClick={() => setTopbarDropdownOpen(!isTopbarDropdownOpen)}>
                        <img
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                            src={profileImage}
                            alt={name}
                        />
                    </button>
                ) : (
                    <FaUserCircle
                        className="text-3xl cursor-pointer text-deep-indigo"
                        onClick={() => setTopbarDropdownOpen(!isTopbarDropdownOpen)}
                    />
                )}

                <div
                    className={`absolute right-0 mt-2 bg-white shadow-lg rounded-md w-64 overflow-hidden transition-all duration-200 ease-in-out ${
                        isTopbarDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}>
                    <div className="p-4 flex items-center border-b">
                        {profileImage ? (
                            <img
                                className="w-10 h-10 mr-2 rounded-full object-cover cursor-pointer"
                                src={profileImage}
                                alt={name}
                            />
                        ) : (
                            <FaUserCircle className="text-3xl mr-3" />
                        )}
                        <div>
                            <p className="text-sm font-semibold">{name}</p>
                            <p className="text-xs text-gray-600">{emailAddress}</p>
                        </div>
                    </div>
                    <DropdownItem
                        icon={<FaUser />}
                        text="Profile"
                        to="/dashboard/userProfile"
                    />
                    <DropdownItem
                        icon={<FaHeadset />}
                        text="Support"
                        to="/dashboard/support"
                    />
                    <DropdownItem
                        icon={<FaSignOutAlt className="text-red-500" />}
                        text={<span className="text-red-500">Logout</span>}
                        to="/logout"
                    />
                </div>
            </div>
        </div>
    )
}

const DropdownItem = ({ icon, text, to }) => (
    <NavLink
        to={to}
        className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
        {icon}
        <span className="ml-3">{text}</span>
    </NavLink>
)
