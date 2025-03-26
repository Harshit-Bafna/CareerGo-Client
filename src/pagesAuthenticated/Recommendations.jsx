import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdSchool, MdAttachMoney, MdHome, MdEmail, MdPhone, MdLanguage } from 'react-icons/md'
import { indianStates } from '../utils/constants/constants'
import { InstitutionsRecommendation } from '../store/slices/recommendationsSlice'

export default function RecommendationPage() {
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showInstitutions, setShowInstitutions] = useState(false)
    const [formData, setFormData] = useState({
        locations: ['PAN India'],
        educationLevel: '',
        degreeCategory: '',
        consideration: '',
        budget: '',
        hostelRequired: '',
        entranceExams: [],
    })

    const [institutions, setInstitutions] = useState([])

    const handleLocationChange = (state) => {
        setFormData((prev) => {
            let newLocations

            if (state === 'PAN India') {
                return { ...prev, locations: ['PAN India'] }
            }

            if (prev.locations.includes(state)) {
                newLocations = prev.locations.filter((loc) => loc !== state)
            } else {
                newLocations = [...prev.locations.filter((loc) => loc !== 'PAN India'), state]
            }

            if (newLocations.length === 0) {
                newLocations = ['PAN India']
            }

            return { ...prev, locations: newLocations }
        })
    }

    const handleEducationLevelChange = (level) => {
        setFormData((prev) => {
            const updatedData = {
                ...prev,
                educationLevel: level,
                degreeCategory: '',
                entranceExams: [],
            }
            return updatedData
        })
    }

    const handleDegreeCategoryChange = (category) => {
        setFormData((prev) => {
            const updatedData = {
                ...prev,
                degreeCategory: category,
            }

            const exams = []
            if (category === 'Engineering & Technology' && prev.educationLevel === 'ug') {
                exams.push(...['JEE Mains', 'JEE Advance', 'VITEEE', 'BITSAT'])
            } else if (category === 'Medical & Pharmacy') {
                exams.push(...['NEET'])
            } else if (category === 'Engineering & Technology' && prev.educationLevel === 'pg') {
                exams.push(...['GATE'])
            } else if (category === 'Science & Research' && prev.educationLevel === 'pg') {
                exams.push(...['IIT-JAM'])
            }

            updatedData.entranceExams = exams.map((exam) => ({
                name: exam,
                taken: false,
                rank: '',
            }))

            return updatedData
        })
    }

    const handleExamChange = (examIndex, field, value) => {
        setFormData((prev) => {
            const updatedExams = [...prev.entranceExams]

            if (field === 'taken') {
                updatedExams[examIndex] = {
                    ...updatedExams[examIndex],
                    taken: value,
                    rank: value ? updatedExams[examIndex].rank : '',
                }
            } else {
                updatedExams[examIndex] = {
                    ...updatedExams[examIndex],
                    [field]: value,
                }
            }

            return {
                ...prev,
                entranceExams: updatedExams,
            }
        })
    }

    const mapEducationLevel = (level) => {
        const educationLevelMap = {
            ug: 'Undergraduate',
            pg: 'Postgraduate',
        }
        return educationLevelMap[level] || level
    }

    const mapConsideration = (consideration) => {
        const considerationMap = {
            personal: 'Personal',
            professional: 'Professional',
            both: 'Both Professional And Personal',
        }
        return considerationMap[consideration] || consideration
    }

    const preparePayload = () => {
        const examDetails = formData.entranceExams
            .filter((exam) => exam.taken)
            .map((exam) => {
                const examNameMap = {
                    'JEE Mains': 'JEE_MAINS',
                    'JEE Advance': 'JEE_ADVANCE',
                    VITEEE: 'VITEEE',
                    BITSAT: 'BITSAT',
                    NEET: 'NEET',
                    GATE: 'GATE',
                    'IIT-JAM': 'IIT_JAM',
                }

                return {
                    examName: examNameMap[exam.name],
                    isTaken: exam.taken,
                    rank: exam.rank ? Number.parseInt(exam.rank) : undefined,
                }
            })

        return {
            locations: formData.locations,
            educationLevel: mapEducationLevel(formData.educationLevel),
            degreeCategory: formData.degreeCategory,
            consideration: mapConsideration(formData.consideration),
            budget: formData.budget ? Number.parseInt(formData.budget) : undefined,
            hostel: formData.hostelRequired === 'yes',
            examDetails: examDetails.length > 0 ? examDetails : undefined,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = preparePayload()
            const result = await dispatch(InstitutionsRecommendation(payload)).unwrap()

            if (result && result.data && result.data.recommendations) {
                const transformedInstitutions = result.data.recommendations.map((inst) => ({
                    logo: inst.logo,
                    abbreviatedName: inst.registrationNumber || inst.institutionName.substring(0, 4).toUpperCase(),
                    fees: 0,
                    hostel: inst.admission,
                    name: inst.institutionName,
                    course: formData.degreeCategory,
                    duration: formData.educationLevel === 'ug' ? 4 : 2,
                    contactDetails: {
                        email: inst.emailAddress,
                        phone: '',
                        website: inst.website || '#',
                    },
                }))

                setInstitutions(transformedInstitutions)
                setShowForm(false)
                setShowInstitutions(true)
            }
        } finally {
            setLoading(false)
        }
    }

    const toggleDropdown = (id) => {
        setInstitutions((prev) =>
            prev.map((inst) => ({
                ...inst,
                showDropdown: inst.abbreviatedName === id ? !inst.showDropdown : false,
            }))
        )
    }

    return (
        <div className="min-h-screen bg-background-light p-4 md:p-8">
            {showForm && (
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-heading text-text-primary text-center mb-6">Find Your Ideal Institution</h1>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-background-white p-6 rounded-lg shadow-input-shadow">
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="locations"
                                    className="block text-text-primary font-medium mb-2">
                                    Location Preferences <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-border-light rounded-md">
                                    {['PAN India', ...indianStates].map((state) => (
                                        <div
                                            key={state}
                                            className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={state}
                                                checked={formData.locations.includes(state)}
                                                onChange={() => handleLocationChange(state)}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor={state}
                                                className="text-sm">
                                                {state}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="degreeCategory"
                                    className="block text-text-primary font-medium mb-2">
                                    Education Level <span className="text-red-500">*</span>
                                </label>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="educationLevel"
                                            value="ug"
                                            checked={formData.educationLevel === 'ug'}
                                            onChange={() => handleEducationLevelChange('ug')}
                                            required
                                            className="mr-2"
                                        />
                                        Undergraduate (UG)
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="educationLevel"
                                            value="pg"
                                            checked={formData.educationLevel === 'pg'}
                                            onChange={() => handleEducationLevelChange('pg')}
                                            required
                                            className="mr-2"
                                        />
                                        Postgraduate (PG)
                                    </label>
                                </div>
                            </div>

                            {formData.educationLevel && (
                                <div>
                                    <label
                                        htmlFor="degreeCategory"
                                        className="block text-text-primary font-medium mb-2">
                                        Degree Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.degreeCategory}
                                        onChange={(e) => handleDegreeCategoryChange(e.target.value)}
                                        required
                                        className="w-full p-2 border border-border-light rounded-md">
                                        <option value="">Select Degree Category</option>
                                        <option value="Engineering & Technology">Engineering & Technology</option>
                                        <option value="Management & Business">Management & Business</option>
                                        <option value="Medical & Pharmacy">Medical & Pharmacy</option>
                                        {formData.educationLevel === 'pg' && <option value="Science & Research">Science & Research</option>}
                                        {formData.educationLevel === 'ug' && <option value="Architecture & Design">Architecture & Design</option>}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label
                                    htmlFor="institutionConsideration"
                                    className="block text-text-primary font-medium mb-2">
                                    Institution Consideration <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="institutionConsideration"
                                    value={formData.consideration}
                                    onChange={(e) => setFormData({ ...formData, consideration: e.target.value })}
                                    required
                                    className="w-full p-2 border border-border-light rounded-md">
                                    <option value="">Select Consideration Type</option>
                                    <option value="personal">Personal (Sports, Arts, etc.)</option>
                                    <option value="professional">Professional (Academics)</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="budget"
                                        className="block text-text-primary font-medium mb-2">
                                        Budget (₹) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="budget"
                                        type="number"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        required
                                        min="0"
                                        placeholder="Enter your budget"
                                        className="w-full p-2 border border-border-light rounded-md"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="hostelRequirement"
                                        className="block text-text-primary font-medium mb-2">
                                        Hostel Requirement <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="hostelRequirement"
                                        value={formData.hostelRequired}
                                        onChange={(e) => setFormData({ ...formData, hostelRequired: e.target.value })}
                                        required
                                        className="w-full p-2 border border-border-light rounded-md">
                                        <option value="">Select Option</option>
                                        <option value="yes">Required</option>
                                        <option value="no">Not Required</option>
                                    </select>
                                </div>
                            </div>

                            {formData.degreeCategory && (
                                <div>
                                    <label
                                        htmlFor="entranceExaminations"
                                        className="block text-text-primary font-medium mb-2">
                                        Entrance Examinations
                                    </label>
                                    <div className="space-y-4 border border-border-light rounded-md p-4">
                                        {formData.entranceExams.length > 0 ? (
                                            formData.entranceExams.map((exam, index) => (
                                                <div
                                                    key={exam.name}
                                                    className="space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`exam-${index}`}
                                                            checked={exam.taken}
                                                            onChange={(e) => handleExamChange(index, 'taken', e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        <label
                                                            htmlFor={`exam-${index}`}
                                                            className="font-medium capitalize">
                                                            {exam.name}
                                                        </label>
                                                    </div>

                                                    {exam.taken && (
                                                        <div className="ml-6">
                                                            <label
                                                                htmlFor={`rank-${index}`}
                                                                className="block text-sm mb-1">
                                                                Your Rank
                                                            </label>
                                                            <input
                                                                id={`rank-${index}`}
                                                                type="number"
                                                                value={exam.rank}
                                                                onChange={(e) => handleExamChange(index, 'rank', e.target.value)}
                                                                placeholder="Enter your rank"
                                                                className="w-full p-2 border border-border-light rounded-md"
                                                                required
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-text-secondary italic">No entrance exams available for the selected category</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full bg-deep-blue text-white py-3 px-4 rounded-md hover:bg-navy-blue transition-colors disabled:bg-dark-gray disabled:cursor-not-allowed">
                            {loading ? 'Processing...' : 'Find Institutions'}
                        </button>
                    </form>
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-blue mx-auto mb-4"></div>
                        <p className="text-lg font-medium">Finding the best institutions for you...</p>
                    </div>
                </div>
            )}

            {showInstitutions && (
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                        <h2 className="text-2xl font-heading text-text-primary">Recommended Institutions</h2>
                        <div className="flex gap-3">
                            <NavLink
                                to="/dashboard/userProfile"
                                className="bg-navy-blue text-white py-2 px-4 rounded-md hover:bg-deep-blue transition-colors flex items-center gap-2">
                                <MdSchool /> Update Profile
                            </NavLink>
                            <button
                                onClick={() => {
                                    setShowInstitutions(false)
                                    setShowForm(true)
                                }}
                                className="bg-gold text-white py-2 px-4 rounded-md hover:bg-deep-indigo transition-colors">
                                Modify Search
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {institutions.length > 0 ? (
                            institutions.map((institution) => (
                                <div
                                    key={institution.abbreviatedName}
                                    className="bg-background-white p-5 rounded-lg shadow-input-shadow transition-all hover:shadow-lg">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                        <div className="flex items-center gap-4">
                                            {institution.logo ? (
                                                <img
                                                    src={institution.logo || '/placeholder.svg'}
                                                    alt={`${institution.name} logo`}
                                                    className="w-16 h-16 object-contain"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-navy-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                                                    {institution.abbreviatedName}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-medium text-lg text-text-primary">{institution.name}</h3>
                                                <div className="flex items-center gap-1 text-text-secondary">
                                                    <MdSchool className="text-deep-blue" />
                                                    <span>{institution.course}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>
                                                        {institution.duration} {institution.duration > 1 ? 'years' : 'year'}
                                                    </span>
                                                </div>
                                                {institution.fees > 0 && (
                                                    <div className="flex items-center gap-1 text-text-secondary mt-1">
                                                        <MdAttachMoney className="text-deep-blue" />
                                                        <span>₹{institution.fees.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-text-secondary">
                                                <MdHome className="text-deep-blue" />
                                                <span>{institution.hostel ? 'Hostel Available' : 'No Hostel'}</span>
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleDropdown(institution.abbreviatedName)}
                                                    className="p-2 hover:bg-background-light rounded-full">
                                                    <BsThreeDotsVertical className="text-text-secondary" />
                                                </button>
                                                {institution.showDropdown && (
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
                                                                {institution.contactDetails.phone && (
                                                                    <div className="flex items-center gap-2">
                                                                        <MdPhone className="text-deep-blue" />
                                                                        <a
                                                                            href={`tel:${institution.contactDetails.phone}`}
                                                                            className="hover:underline">
                                                                            {institution.contactDetails.phone}
                                                                        </a>
                                                                    </div>
                                                                )}
                                                                {institution.contactDetails.website && institution.contactDetails.website !== '#' && (
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
                                                                )}
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
                            ))
                        ) : (
                            <div className="bg-background-white p-5 rounded-lg shadow-input-shadow text-center">
                                <p className="text-lg text-text-secondary">No institutions found matching your criteria.</p>
                                <button
                                    onClick={() => {
                                        setShowInstitutions(false)
                                        setShowForm(true)
                                    }}
                                    className="mt-4 bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-navy-blue transition-colors">
                                    Modify Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
