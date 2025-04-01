import { FaBookOpen, FaUser, FaUniversity, FaLightbulb, FaLock, FaHeadset } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'

export const UserMenu = [
    {
        type: 'item',
        to: '/dashboard',
        icon: <MdSpaceDashboard className="text-lg" />,
        text: 'Dashboard',
    },
    {
        type: 'dropdown',
        id: 'profile',
        icon: <FaUser className="text-lg" />,
        text: 'User Profile',
        items: [
            { to: '/dashboard/userProfile', icon: <FaUser />, text: 'Profile' },
            { to: '/dashboard/changePassword', icon: <FaLock />, text: 'Change Password' },
        ],
    },
    {
        type: 'item',
        to: '/dashboard/institutions',
        icon: <FaUniversity className="text-lg" />,
        text: 'Institutions',
    },
    {
        type: 'item',
        to: '/dashboard/recommendations',
        icon: <FaLightbulb className="text-lg" />,
        text: 'Recommendations',
    },
    {
        type: 'dropdown',
        id: 'counselling',
        icon: <FaBookOpen className="text-lg" />,
        text: 'Counselling',
        items: [
            { to: '/dashboard/bookCounselling', icon: <FaBookOpen />, text: 'Book Counselling' },
            { to: '/dashboard/counselling', icon: <FaLock />, text: 'View Counselling' },
        ],
    },
    {
        type: 'item',
        to: '/dashboard/support',
        icon: <FaHeadset className="text-lg" />,
        text: 'Support',
    },
]
