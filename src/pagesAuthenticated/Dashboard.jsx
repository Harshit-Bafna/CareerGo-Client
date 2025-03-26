import { useState, useEffect } from 'react'
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaVenusMars,
    FaHeadset,
    FaChevronRight,
    FaVideo,
    FaCalendarAlt,
    FaClock,
    FaUniversity,
    FaRegCalendarCheck,
    FaArrowRight,
    FaArrowLeft,
} from 'react-icons/fa'
import { MdSchool, MdAttachMoney, MdHome, MdEmail, MdPhone, MdLanguage } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import counsellingDashboard from '../assets/counsellingDashboard.svg'
import { useBtnNavigation } from '../utils/helper/syncHelper'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicInfo } from '../store/slices/userSlice'
import { GetSessionsForDashboard } from '../store/slices/counsellingSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [setScrollPosition] = useState(0)
    const [upcomingSessions, setUpcomingSessions] = useState([])
    const [completedSessions, setCompletedSessions] = useState([])

    const { name, emailAddress, profileImage, userProfileProgress } = useSelector((state) => state.user)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
    })

    useEffect(() => {
        if (name && emailAddress) {
            setUserData({ name, email: emailAddress })
        }
    }, [name, emailAddress])

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getBasicInfo())

            if (response.payload && response.payload.data) {
                const { basicInfo } = response.payload.data

                setUserData({
                    name: name || '',
                    email: emailAddress || '',
                    phone: basicInfo.phone || '',
                    gender: basicInfo.gender || '',
                })
            }
        }

        fetchData()
    }, [dispatch, name, emailAddress])

    useEffect(() => {
        const fetchSessions = async () => {
            const response = await dispatch(GetSessionsForDashboard())

            if (response.payload && response.payload.data) {
                const { upcomingSessions, completedSessions } = response.payload.data

                const formattedUpcomingSessions = upcomingSessions.map((session) => ({
                    id: session._id,
                    institution: session.institutionId.institutionName,
                    purpose: session.purpose,
                    date: new Date(session.date).toISOString().split('T')[0],
                    time: session.time,
                    status: session.status === 'Approved' ? 'Upcoming' : session.status,
                }))

                const formattedCompletedSessions = completedSessions.map((session) => ({
                    id: session._id,
                    institution: session.institutionId.institutionName,
                    purpose: session.purpose,
                    date: new Date(session.date).toISOString().split('T')[0],
                    time: session.time,
                    status: session.status,
                }))

                setUpcomingSessions(formattedUpcomingSessions)
                setCompletedSessions(formattedCompletedSessions)
            }
        }

        fetchSessions()
    }, [dispatch])

    const recommendedInstitutions = [
        {
            logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
            abbreviatedName: 'IITB',
            fees: 200000,
            hostel: true,
            name: 'Indian Institute of Technology, Bombay',
            course: 'B.Tech',
            duration: 4,
            contactDetails: {
                email: 'admin@iitb.ac.in',
                phone: '9876543210',
                website: 'https://www.iitb.ac.in/',
            },
        },
        {
            logo: null,
            abbreviatedName: 'IITD',
            fees: 210000,
            hostel: true,
            name: 'Indian Institute of Technology, Delhi',
            course: 'B.Tech + M.Tech',
            duration: 5,
            contactDetails: {
                email: 'admin@iitd.ac.in',
                phone: '9876543220',
                website: 'https://www.iitd.ac.in/',
            },
        },
        {
            logo: null,
            abbreviatedName: 'IIMA',
            fees: 2500000,
            hostel: true,
            name: 'Indian Institute of Management, Ahmedabad',
            course: 'MBA',
            duration: 2,
            contactDetails: {
                email: 'admin@iima.ac.in',
                phone: '9876543230',
                website: 'https://www.iima.ac.in/',
            },
        },
        {
            logo: null,
            abbreviatedName: 'NLSIU',
            fees: 180000,
            hostel: true,
            name: 'National Law School of India University, Bangalore',
            course: 'LL.M',
            duration: 1,
            contactDetails: {
                email: 'admin@nlsiu.ac.in',
                phone: '9876543240',
                website: 'https://www.nls.ac.in/',
            },
        },
        {
            logo: null,
            abbreviatedName: 'AIIMS-D',
            fees: 150000,
            hostel: true,
            name: 'All India Institute of Medical Sciences, Delhi',
            course: 'M.B.B.S',
            duration: 5,
            contactDetails: {
                email: 'admin@aiims.ac.in',
                phone: '9876543250',
                website: 'https://www.aiims.edu/',
            },
        },
    ]

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'Approval Pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'Completed':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'Rejected':
                return 'bg-red-600'
            case 'Cancelled':
                return 'bg-red-600'
            default:
                return 'bg-dark-gray'
        }
    }

    const [institutionDropdown, setInstitutionDropdown] = useState(null)

    const toggleDropdown = (id) => {
        setInstitutionDropdown(institutionDropdown === id ? null : id)
    }

    const scrollLeft = (containerId) => {
        const container = document.getElementById(containerId)
        if (container) {
            container.scrollBy({ left: -300, behavior: 'smooth' })
            setScrollPosition(container.scrollLeft - 300)
        }
    }

    const scrollRight = (containerId) => {
        const container = document.getElementById(containerId)
        if (container) {
            container.scrollBy({ left: 300, behavior: 'smooth' })
            setScrollPosition(container.scrollLeft + 300)
        }
    }

    return (
        <div className="min-h-screen bg-background-light p-4 md:p-8">
            <div className="bg-background-white rounded-lg shadow-input-shadow p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <h1 className="text-2xl md:text-3xl font-heading text-deep-blue mb-2">Welcome to CareerGo</h1>
                        <p className="text-text-secondary">
                            Your personalized career guidance platform. Explore top institutions, schedule counselling sessions, and make informed
                            decisions about your future.
                        </p>
                        <div className="mt-4">
                            <NavLink
                                to="/dashboard/bookCounselling"
                                className="bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-navy-blue transition-colors inline-flex items-center">
                                Book a Counselling Session <FaChevronRight className="ml-2" />
                            </NavLink>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={counsellingDashboard || '/placeholder.svg'}
                            alt="Career Counselling"
                            className="max-w-full h-auto max-h-48"
                        />
                    </div>
                </div>
            </div>

            <div className="lg:hidden space-y-6 mb-6">
                <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                            {profileImage ? (
                                <img
                                    src={profileImage || '/placeholder.svg'}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-deep-blue"
                                />
                            ) : (
                                <FaUser className="w-16 h-16 p-2 text-gray-600 rounded-full object-cover border-4 border-deep-blue" />
                            )}
                        </div>
                        <h2 className="text-xl font-medium text-text-primary">{userData.name}</h2>

                        <div className="w-full mt-6 space-y-3">
                            <div className="flex items-center text-text-secondary">
                                <FaEnvelope className="text-deep-blue mr-3" />
                                <span>{userData.email}</span>
                            </div>
                            <div className="flex items-center text-text-secondary">
                                <FaPhone className="text-deep-blue mr-3" />
                                <span>{userData.phone ? userData.phone : 'Not Provided'}</span>
                            </div>
                            <div className="flex items-center text-text-secondary">
                                <FaVenusMars className="text-deep-blue mr-3" />
                                <span>{userData.gender ? userData.gender : 'Not Provided'}</span>
                            </div>
                        </div>

                        <NavLink
                            to="/dashboard/userProfile"
                            className="mt-6 w-full bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-navy-blue transition-colors flex items-center justify-center">
                            Edit Profile
                        </NavLink>
                    </div>
                </div>

                <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                    <h3 className="text-lg font-medium text-text-primary mb-4">Profile Completion</h3>
                    <div className="w-full bg-light-gray rounded-full h-4">
                        <div
                            className="bg-deep-blue h-4 rounded-full"
                            style={{ width: `${userProfileProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-text-secondary">{userProfileProgress}% Completed</span>
                        <NavLink
                            to="/dashboard/userProfile"
                            className="text-sm text-deep-blue hover:underline">
                            Complete Now
                        </NavLink>
                    </div>
                </div>

                <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-light-gray rounded-full mr-4">
                            <FaHeadset className="text-2xl text-deep-blue" />
                        </div>
                        <h3 className="text-lg font-medium text-text-primary">Need Help?</h3>
                    </div>
                    <p className="text-text-secondary mb-4">Our support team is available 24/7 to assist you with any questions or concerns.</p>
                    <button
                        className="w-full bg-gold text-white py-2 px-4 rounded-md hover:bg-deep-indigo transition-colors"
                        onClick={useBtnNavigation('/dashboard/support')}>
                        Contact Support
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-text-primary">Counselling Sessions</h3>
                            <NavLink
                                to="/dashboard/counselling"
                                className="text-deep-blue hover:underline flex items-center">
                                View All <FaChevronRight className="ml-1 text-sm" />
                            </NavLink>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-md font-medium text-text-secondary flex items-center">
                                    <FaCalendarAlt className="mr-2" /> Upcoming Sessions
                                </h4>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => scrollLeft('upcoming-sessions')}
                                        className="p-1 bg-light-gray rounded-full hover:bg-gray-200">
                                        <FaArrowLeft className="text-deep-blue" />
                                    </button>
                                    <button
                                        onClick={() => scrollRight('upcoming-sessions')}
                                        className="p-1 bg-light-gray rounded-full hover:bg-gray-200">
                                        <FaArrowRight className="text-deep-blue" />
                                    </button>
                                </div>
                            </div>

                            {upcomingSessions.length > 0 ? (
                                <div
                                    id="upcoming-sessions"
                                    className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {upcomingSessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className="border border-border-light rounded-lg p-4 min-w-[280px] flex-shrink-0">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 bg-light-gray rounded-full">
                                                        <FaUniversity className="text-xl text-navy-blue" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium text-navy-blue">{session.institution}</h5>
                                                        <p className="text-sm text-dark-gray">{session.purpose}</p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`capitalize text-sm font-medium py-0.5 rounded-full px-2 ml-3  ${getStatusColor(session.status)}`}>
                                                    {session.status === 'Approval Pending' ? 'Pending' : session.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 mb-3">
                                                <div className="flex items-center space-x-2 text-dark-gray text-sm">
                                                    <FaCalendarAlt />
                                                    <span>{session.date}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-dark-gray text-sm">
                                                    <FaClock />
                                                    <span>{session.time}</span>
                                                </div>
                                            </div>

                                            {session.meetingLink && (
                                                <div className="flex items-center space-x-2 text-deep-blue text-sm">
                                                    <FaVideo />
                                                    <a
                                                        href={session.meetingLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline">
                                                        Join Meeting
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 border border-border-light rounded-lg">
                                    <p className="text-text-secondary">No upcoming sessions</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="text-md font-medium text-text-secondary flex items-center">
                                    <FaRegCalendarCheck className="mr-2" /> Completed Sessions
                                </h4>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => scrollLeft('completed-sessions')}
                                        className="p-1 bg-light-gray rounded-full hover:bg-gray-200">
                                        <FaArrowLeft className="text-deep-blue" />
                                    </button>
                                    <button
                                        onClick={() => scrollRight('completed-sessions')}
                                        className="p-1 bg-light-gray rounded-full hover:bg-gray-200">
                                        <FaArrowRight className="text-deep-blue" />
                                    </button>
                                </div>
                            </div>

                            {completedSessions.length > 0 ? (
                                <div
                                    id="completed-sessions"
                                    className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {completedSessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className="border border-border-light rounded-lg p-4 min-w-[280px] flex-shrink-0">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 bg-light-gray rounded-full">
                                                        <FaUniversity className="text-xl text-navy-blue" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium text-navy-blue">{session.institution}</h5>
                                                        <p className="text-sm text-dark-gray">{session.purpose}</p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`capitalize text-sm font-medium py-0.5 rounded-full px-2 ml-3 ${getStatusColor(session.status)}`}>
                                                    {session.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="flex items-center space-x-2 text-dark-gray text-sm">
                                                    <FaCalendarAlt />
                                                    <span>{session.date}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-dark-gray text-sm">
                                                    <FaClock />
                                                    <span>{session.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 border border-border-light rounded-lg">
                                    <p className="text-text-secondary">No completed sessions</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                        <h3 className="text-lg font-medium text-text-primary mb-6">Recommended Institutions</h3>

                        <div className="space-y-4">
                            {recommendedInstitutions.slice(0, 5).map((institution) => (
                                <div
                                    key={institution.abbreviatedName}
                                    className="border border-border-light rounded-lg p-4 transition-all hover:shadow-md">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                        <div className="flex items-center gap-4">
                                            {institution.logo ? (
                                                <img
                                                    src={institution.logo || '/placeholder.svg'}
                                                    alt={`${institution.name} logo`}
                                                    className="w-12 h-12 object-contain"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-navy-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                    {institution.abbreviatedName}
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="font-medium text-text-primary">{institution.name}</h4>
                                                <div className="flex items-center gap-1 text-text-secondary text-sm">
                                                    <MdSchool className="text-deep-blue" />
                                                    <span>{institution.course}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>
                                                        {institution.duration} {institution.duration > 1 ? 'years' : 'year'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 text-text-secondary text-sm mt-1">
                                                    <MdAttachMoney className="text-deep-blue" />
                                                    <span>₹{institution.fees.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-text-secondary text-sm">
                                                <MdHome className="text-deep-blue" />
                                                <span>{institution.hostel ? 'Hostel Available' : 'No Hostel'}</span>
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleDropdown(institution.abbreviatedName)}
                                                    className="p-2 hover:bg-background-light rounded-full">
                                                    <BsThreeDotsVertical className="text-text-secondary" />
                                                </button>
                                                {institutionDropdown === institution.abbreviatedName && (
                                                    <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                        <div className="px-4 py-3 border-b border-border-light">
                                                            <h4 className="font-medium">Contact Details</h4>
                                                            <div className="mt-2 space-y-1 text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <MdEmail className="text-deep-blue" />
                                                                    <a
                                                                        href={`mailto:${institution.contactDetails.email}`}
                                                                        className="hover:underline">
                                                                        {institution.contactDetails.email}
                                                                    </a>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <MdPhone className="text-deep-blue" />
                                                                    <a
                                                                        href={`tel:${institution.contactDetails.phone}`}
                                                                        className="hover:underline">
                                                                        {institution.contactDetails.phone}
                                                                    </a>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <MdLanguage className="text-deep-blue" />
                                                                    <a
                                                                        href={institution.contactDetails.website}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="hover:underline">
                                                                        Website
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-light">
                                                            View Full Details
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block space-y-6">
                    <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                {profileImage ? (
                                    <img
                                        src={profileImage || '/placeholder.svg'}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-deep-blue"
                                    />
                                ) : (
                                    <FaUser className="w-16 h-16 p-2 text-gray-600 rounded-full object-cover border-4 border-deep-blue" />
                                )}
                            </div>
                            <h2 className="text-xl font-medium text-text-primary">{userData.name}</h2>

                            <div className="w-full mt-6 space-y-3">
                                <div className="flex items-center text-text-secondary">
                                    <FaEnvelope className="text-deep-blue mr-3" />
                                    <span>{userData.email}</span>
                                </div>
                                <div className="flex items-center text-text-secondary">
                                    <FaPhone className="text-deep-blue mr-3" />
                                    <span>{userData.phone ? userData.phone : 'Not Provided'}</span>
                                </div>
                                <div className="flex items-center text-text-secondary">
                                    <FaVenusMars className="text-deep-blue mr-3" />
                                    <span>{userData.gender ? userData.gender : 'Not Provided'}</span>
                                </div>
                            </div>

                            <NavLink
                                to="/dashboard/userProfile"
                                className="mt-6 w-full bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-navy-blue transition-colors flex items-center justify-center">
                                Edit Profile
                            </NavLink>
                        </div>
                    </div>

                    <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                        <h3 className="text-lg font-medium text-text-primary mb-4">Profile Completion</h3>
                        <div className="w-full bg-light-gray rounded-full h-4">
                            <div
                                className="bg-deep-blue h-4 rounded-full"
                                style={{ width: `${userProfileProgress}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-sm text-text-secondary">{userProfileProgress}% Completed</span>
                            <NavLink
                                to="/dashboard/userProfile"
                                className="text-sm text-deep-blue hover:underline">
                                Complete Now
                            </NavLink>
                        </div>
                    </div>

                    <div className="bg-background-white rounded-lg shadow-input-shadow p-6">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-light-gray rounded-full mr-4">
                                <FaHeadset className="text-2xl text-deep-blue" />
                            </div>
                            <h3 className="text-lg font-medium text-text-primary">Need Help?</h3>
                        </div>
                        <p className="text-text-secondary mb-4">Our support team is available 24/7 to assist you with any questions or concerns.</p>
                        <button
                            className="w-full bg-gold text-white py-2 px-4 rounded-md hover:bg-deep-indigo transition-colors"
                            onClick={useBtnNavigation('/dashboard/support')}>
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
