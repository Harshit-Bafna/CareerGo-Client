import { FaBookOpen, FaUser, FaLock, FaHeadset } from 'react-icons/fa'
import { BiSolidInstitution } from 'react-icons/bi'
import { MdSpaceDashboard } from 'react-icons/md'

export const InstitutionMenu = [
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
        to: '/dashboard/institutionProfile',
        icon: <BiSolidInstitution className="text-lg" />,
        text: 'Institution Profile',
    },
    {
        type: 'item',
        to: '/dashboard/counselling',
        icon: <FaBookOpen className="text-lg" />,
        text: 'Counselling',
    },
    {
        type: 'item',
        to: '/dashboard/support',
        icon: <FaHeadset className="text-lg" />,
        text: 'Support',
    },
]
