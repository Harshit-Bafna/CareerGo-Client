import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { FaUser, FaCertificate, FaLink } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import CoursesOffered from './CoursesOffered'
import { getInstitutionDetails, updateInstitutionDetails, updateInstitutionLogo } from '../../store/slices/institutionSlice'
import { uploadToAWS } from '../../store/slices/awsSlice'

const InputField = ({ name, value, onChange, className = '', disabled = false }) => {
    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`border border-gray-300 rounded-md p-2 w-full ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''} ${className}`}
        />
    )
}

const InstitutionProfile = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [institutionData, setInstitutionData] = useState({
        institutionName: '',
        adminName: '',
        admissionStatus: false,
        website: '',
    })
    const [institutionLogo, setInstitutionLogo] = useState(null)
    const [hover, setHover] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)

    const tabs = [{ id: '', label: 'Courses Offered', icon: FaCertificate, path: '' }]

    const { institutionId } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchInstitutionDetails = async () => {
            const response = await dispatch(getInstitutionDetails({ institutionId })).unwrap()

            if (response.success) {
                const { institution } = response.data
                setInstitutionData({
                    institutionName: institution.name,
                    adminName: institution.adminName,
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

    const handleEdit = () => setIsEditing(true)

    const handleSave = async () => {
        const payload = {
            website: institutionData.website,
            admission: institutionData.admissionStatus === 'Open',
        }

        await dispatch(
            updateInstitutionDetails({
                institutionId,
                Payload: payload,
            })
        ).unwrap()

        const response = await dispatch(getInstitutionDetails({ institutionId })).unwrap()

        if (response.success) {
            const { institution } = response.data
            setInstitutionData({
                institutionName: institution.name,
                adminName: institution.adminName,
                admissionStatus: institution.admission ? 'Open' : 'Closed',
                website: institution.url || '',
            })
        }

        setIsEditing(false)
    }

    const handleChange = (e) => setInstitutionData({ ...institutionData, [e.target.name]: e.target.value })

    const handleImageChange = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            try {
                setProfileLoading(true)

                const formData = new FormData()
                formData.append('file', file)
                formData.append('fileName', `institution_logo_${Date.now()}`)
                formData.append('folderName', 'institutionLogo')

                const uploadResponse = await dispatch(
                    uploadToAWS({
                        fileDetails: formData,
                        setLoading: setProfileLoading,
                    })
                ).unwrap()

                if (uploadResponse.success) {
                    const logoUrl = uploadResponse.data.fileUrl

                    await dispatch(
                        updateInstitutionLogo({
                            institutionId,
                            logo: logoUrl,
                        })
                    ).unwrap()

                    setInstitutionLogo(logoUrl)

                    await dispatch(getInstitutionDetails({ institutionId })).unwrap()
                }
            } finally {
                setProfileLoading(false)
            }
        }
    }

    const updateAdmissionStatus = (status) => {
        setInstitutionData((prevData) => ({
            ...prevData,
            admissionStatus: status,
        }))
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
                                {profileLoading ? (
                                    <div className="flex items-center justify-center">
                                        <span className="text-sm">Uploading...</span>
                                    </div>
                                ) : institutionLogo ? (
                                    <img
                                        src={institutionLogo || '/placeholder.svg'}
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
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    disabled={profileLoading}
                                />
                            </div>
                            <div className="text-center md:text-left ml-4">
                                {isEditing ? (
                                    <div className="space-y-2">
                                        <InputField
                                            name="institutionName"
                                            value={institutionData.institutionName}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                        <InputField
                                            name="adminName"
                                            value={institutionData.adminName}
                                            onChange={handleChange}
                                            disabled={true}
                                        />
                                        <InputField
                                            name="website"
                                            value={institutionData.website}
                                            onChange={handleChange}
                                        />
                                        <div className="mt-2">
                                            <label
                                                htmlFor="admissionStatus"
                                                className="block text-gray-700 font-medium">
                                                Admission Status
                                            </label>
                                            <div
                                                id="admissionStatus"
                                                className="flex space-x-2 mt-1">
                                                <button
                                                    className={`px-3 py-1 rounded-md text-sm ${
                                                        institutionData.admissionStatus === 'Open'
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-700'
                                                    }`}
                                                    onClick={() => updateAdmissionStatus('Open')}>
                                                    Open
                                                </button>
                                                <button
                                                    className={`px-3 py-1 rounded-md text-sm ${
                                                        institutionData.admissionStatus === 'Closed'
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-gray-200 text-gray-700'
                                                    }`}
                                                    onClick={() => updateAdmissionStatus('Closed')}>
                                                    Closed
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
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
                                        <p className="text-gray-600">{institutionData.adminName}</p>
                                        <p
                                            className={`rounded-md px-2 py-1 mt-2 text-sm inline-block ${
                                                institutionData.admissionStatus === 'Open' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                            }`}>
                                            Admissions {institutionData.admissionStatus}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0">
                            {isEditing ? (
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                                    Edit
                                </button>
                            )}
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
                {location.pathname === '/dashboard/institutionProfile' ? <CoursesOffered /> : <Outlet />}
            </main>
        </div>
    )
}

export default InstitutionProfile
