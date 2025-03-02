import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUniversity } from 'react-icons/fa'
import { indianStates } from '../utils/constants/constants'
import sampleCollegeLogo from '../assets/about.avif'

export default function RecommendationPage() {
    const [showForm, setShowForm] = useState(true)
    const [formData, setFormData] = useState({
        locations: ['PAN India'],
        consideration: '',
        fees: '',
        hostelRequired: '',
    })

    const [recommendations] = useState([
        {
            id: 1,
            name: 'Delhi University',
            institutionLogo: sampleCollegeLogo,
            hostel: 'Yes',
            location: 'Delhi',
        },
        {
            id: 2,
            name: 'IIT Bombay',
            institutionLogo: '',
            hostel: 'Yes',
            location: 'Mumbai',
        },
        {
            id: 3,
            name: 'Christ University',
            institutionLogo: '/placeholder.svg?height=60&width=60',
            hostel: 'No',
            location: 'Bangalore',
        },
        {
            id: 4,
            name: 'Manipal University',
            institutionLogo: '/placeholder.svg?height=60&width=60',
            hostel: 'Yes',
            location: 'Manipal',
        },
        {
            id: 5,
            name: 'BITS Pilani',
            institutionLogo: '/placeholder.svg?height=60&width=60',
            hostel: 'Yes',
            location: 'Pilani',
        },
    ])

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

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowForm(false)
    }

    return (
        <div className="min-h-screen bg-background-light p-4 md:p-8">
            {showForm ? (
                <form
                    onSubmit={handleSubmit}
                    className="max-w-2xl mx-auto bg-background-white p-6 rounded-lg shadow-input-shadow">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="consideration-type"
                                className="block text-text-primary font-medium mb-2">
                                Location Preferences <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                                htmlFor="hostel-required"
                                className="block text-text-primary font-medium mb-2">
                                Select Consideration Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="consideration-type"
                                required
                                value={formData.consideration}
                                onChange={(e) => setFormData((prev) => ({ ...prev, consideration: e.target.value }))}
                                className="w-full p-2 border border-border-light rounded-md">
                                <option value="">Select type</option>
                                <option value="personal">Personal (Sports, Arts, etc.)</option>
                                <option value="professional">Professional (Academics, Internships)</option>
                                <option value="both">Both</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="maximum-budget"
                                className="block text-text-primary font-medium mb-2">
                                Maximum Budget (₹) <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="maximum-budget"
                                type="number"
                                required
                                value={formData.fees}
                                onChange={(e) => setFormData((prev) => ({ ...prev, fees: e.target.value }))}
                                className="w-full p-2 border border-border-light rounded-md"
                                placeholder="Enter maximum budget"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="hostel-required"
                                className="block text-text-primary font-medium mb-2">
                                Hostel Required <span className="text-red-500">*</span>
                            </label>
                            <div className="space-x-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        required
                                        name="hostel"
                                        value="yes"
                                        checked={formData.hostelRequired === 'yes'}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, hostelRequired: e.target.value }))}
                                        className="mr-2"
                                    />
                                    Yes
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        required
                                        name="hostel"
                                        value="no"
                                        checked={formData.hostelRequired === 'no'}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, hostelRequired: e.target.value }))}
                                        className="mr-2"
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-deep-blue text-white py-2 px-4 rounded-md hover:bg-navy-blue transition-colors">
                        Submit
                    </button>
                </form>
            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap gap-4 justify-center md:justify-end mb-6">
                        <NavLink
                            to="/dashboard/userProfile"
                            className="bg-navy-blue text-white py-2 px-4 rounded-md hover:bg-deep-blue transition-colors">
                            Update Profile
                        </NavLink>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-gold text-white py-2 px-4 rounded-md hover:bg-deep-indigo transition-colors">
                            Update Recommendation Form
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {recommendations.map((institution) => (
                            <div
                                key={institution.id}
                                className="bg-background-white p-4 rounded-lg shadow-input-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        {institution.institutionLogo ? (
                                            <img
                                                src={institution.institutionLogo}
                                                alt={`${institution.name} logo`}
                                                className="w-12 h-12 rounded-full"
                                            />
                                        ) : (
                                            <FaUniversity className="w-8 h-8 text-blue-500" />
                                        )}
                                        <div>
                                            <h3 className="font-medium text-text-primary">{institution.name}</h3>
                                            <p className="text-sm text-text-secondary">{institution.location}</p>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <button className="p-1 hover:bg-background-light rounded-full">
                                            <BsThreeDotsVertical className="text-text-secondary" />
                                        </button>
                                        <div className="hidden group-hover:block absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-light">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <span className="font-medium">Hostel:</span>
                                    <span>{institution.hostel}</span>
                                </div>
                            </div>
                        ))}
                        {/* {recommendations.map((institution) => (
                            <div
                                key={institution.id}
                                className="bg-background-white p-4 rounded-lg shadow-input-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={institution.institutionLogo || '/placeholder.svg'}
                                            alt={`${institution.name} Logo`}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-medium text-text-primary">{institution.name}</h3>
                                            <p className="text-sm text-text-secondary">{institution.location}</p>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <button className="p-1 hover:bg-background-light rounded-full">
                                            <BsThreeDotsVertical className="text-text-secondary" />
                                        </button>
                                        <div className="hidden group-hover:block absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-light">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                    <span className="font-medium">Hostel:</span>
                                    <span>{institution.hostel}</span>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            )}
        </div>
    )
}
