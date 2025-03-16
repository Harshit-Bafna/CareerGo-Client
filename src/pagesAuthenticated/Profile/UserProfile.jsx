import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { FaUser, FaCertificate, FaGraduationCap, FaTrophy } from 'react-icons/fa'
import { LuLoaderCircle } from 'react-icons/lu'
import BasicInformation from './BasicInformation'
import { useDispatch, useSelector } from 'react-redux'
import { uploadToAWS } from '../../store/slices/awsSlice'
import { updateProfileImage } from '../../store/slices/userSlice'

const UserProfile = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const { name, emailAddress, profileImage } = useSelector((state) => state.user)

    const [userData, setUserData] = useState({
        name: '',
        email: '',
    })

    const [profileLoading, setProfileLoading] = useState(false)

    useEffect(() => {
        if (name && emailAddress) {
            setUserData({ name, email: emailAddress })
        }
    }, [name, emailAddress])

    const [hover, setHover] = useState(false)

    const tabs = [
        { id: '', label: 'Basic Info', icon: FaUser, path: '' },
        {
            id: 'certificationAndCourses',
            label: 'Certification And Courses',
            icon: FaCertificate,
            path: '/dashboard/userProfile/certificationAndCourses',
        },
        { id: 'education', label: 'Education', icon: FaGraduationCap, path: '/dashboard/userProfile/education' },
        { id: 'achievements', label: 'Achievements', icon: FaTrophy, path: '/dashboard/userProfile/achievements' },
    ]

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('fileName', `${name}_profileImage_${Date.now()}`)
            formData.append('folderName', 'profileImages')

            const payload = {
                fileDetails: formData,
                setLoading: setProfileLoading,
            }

            const response = await dispatch(uploadToAWS(payload)).unwrap()

            dispatch(updateProfileImage({ profileImage: response.data.fileUrl }))

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 font-poppins">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col items-center md:flex-row md:justify-between">
                        <div className="flex flex-col items-center md:flex-row">
                            <div
                                className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-blue-500 bg-gray-200 overflow-hidden cursor-pointer"
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}>
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="w-16 h-16 text-gray-600" />
                                )}
                                <div
                                    className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm transition-opacity ${
                                        hover ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    Click to Upload
                                </div>
                                {profileLoading && (
                                    <div
                                        className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-sm transition-opacity ${
                                            hover ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        <LuLoaderCircle className="text-white" />
                                    </div>
                                )}
                                <input
                                    accept="image/*"
                                    type="file"
                                    placeholder="Logo"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <div className="text-center md:text-left ml-4">
                                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                                <p className="text-gray-600">{userData.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4">
                    <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
                        {tabs.map((tab) => (
                            <li key={tab.id}>
                                <NavLink
                                    to={tab.path}
                                    end={tab.id === ''}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                            isActive ? 'text-blue-500 bg-blue-50' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                        }`
                                    }>
                                    <tab.icon className="w-4 h-4 mr-2" />
                                    {tab.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">{location.pathname === '/dashboard/userProfile' ? <BasicInformation /> : <Outlet />}</main>
        </div>
    )
}

export default UserProfile
