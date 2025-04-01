import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { FaCertificate, FaLink, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import CourseDetail from './CourseDetail'
import { getInstitutionDetails } from '../../store/slices/institutionSlice'

const InstitutionDetails = () => {
    const { institutionId } = useParams()
    const dispatch = useDispatch()
    const [institutionData, setInstitutionData] = useState({
        institutionName: '',
        admissionStatus: false,
        website: '',
    })
    const [institutionLogo, setInstitutionLogo] = useState(null)

    const tabs = [{ id: '', label: 'Courses Offered', icon: FaCertificate, path: '' }]

    useEffect(() => {
        const fetchInstitutionDetails = async () => {
            const response = await dispatch(getInstitutionDetails({ institutionId })).unwrap()

            if (response.success) {
                const { institution } = response.data
                setInstitutionData({
                    institutionName: institution.name,
                    admissionStatus: institution.admission ? 'Open' : 'Closed',
                    website: institution.url || '',
                })

                if (institution.logo) {
                    setInstitutionLogo(institution.logo)
                }
            }
        }

        fetchInstitutionDetails()
    }, [dispatch, institutionId])

    return (
        <div className="min-h-screen bg-gray-100 font-poppins">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col items-center md:flex-row md:justify-between">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-4 border-blue-500 bg-gray-200 overflow-hidden">
                                {institutionLogo ? (
                                    <img
                                        src={institutionLogo || '/placeholder.svg'}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <FaUser className="w-16 h-16 text-gray-600" />
                                )}
                            </div>
                            <div className="text-center md:text-left ml-4">
                                <h1 className="flex items-center text-2xl font-bold text-gray-800">
                                    {institutionData.institutionName}
                                    {institutionData.website && (
                                        <a
                                            href={institutionData.website}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <FaLink className="w-4 h-4 ml-2" />
                                        </a>
                                    )}
                                </h1>
                                <p
                                    className={`rounded-md px-2 py-1 mt-2 text-sm inline-block ${
                                        institutionData.admissionStatus === 'Open' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                    }`}>
                                    Admissions {institutionData.admissionStatus}
                                </p>
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

            <main className="container mx-auto px-4 py-8">
                <CourseDetail institutionId={institutionId} />
            </main>
        </div>
    )
}

export default InstitutionDetails
