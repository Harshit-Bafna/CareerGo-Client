import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaUniversity, FaCalendarAlt, FaClock, FaSearch, FaInfoCircle, FaArrowLeft, FaSpinner, FaExclamationCircle } from 'react-icons/fa'
import { BookNewCounsellingSession } from '../../store/slices/counsellingSlice'
import { getAllInstitutionsList } from '../../store/slices/institutionSlice'
import { GetBookedDates } from '../../store/slices/counsellingSlice'

const BookCounselling = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const rescheduleData = location.state?.rescheduleData

    const [formData, setFormData] = useState({
        institutionId: rescheduleData?.institutionId || '',
        date: rescheduleData?.date ? new Date(rescheduleData.date).toISOString().split('T')[0] : '',
        time: rescheduleData?.time || '',
        purpose: rescheduleData?.purpose || '',
    })

    const [institutions, setInstitutions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false)
    const [errors, setErrors] = useState({})
    const [bookedDates, setBookedDates] = useState([])
    const [dateError, setDateError] = useState('')

    const observer = useRef()
    const institutionDropdownRef = useRef(null)

    useEffect(() => {
        setPage(1)
        setInstitutions([])
        setHasMore(true)
        fetchInstitutions(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    useEffect(() => {
        fetchBookedDates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (institutionDropdownRef.current && !institutionDropdownRef.current.contains(event.target)) {
                setShowInstitutionDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const fetchBookedDates = async () => {
        const response = await dispatch(GetBookedDates()).unwrap()
        if (response.success) {
            setBookedDates(response.data)
        }
    }

    const isDateBooked = (dateStr) => {
        if (!dateStr || !bookedDates.length) return false

        const selectedDate = new Date(dateStr)
        selectedDate.setHours(0, 0, 0, 0)

        return bookedDates.some((bookedDate) => {
            const bookedDateTime = new Date(bookedDate.date)
            bookedDateTime.setHours(0, 0, 0, 0)
            return selectedDate.getTime() === bookedDateTime.getTime()
        })
    }

    const fetchInstitutions = async (pageNum) => {
        if (isLoading) return

        setIsLoading(true)
        try {
            const response = await dispatch(
                getAllInstitutionsList({
                    search: searchTerm,
                    page: pageNum,
                    limit: 10,
                })
            ).unwrap()

            if (response.success) {
                if (pageNum === 1) {
                    setInstitutions(response.data.institutionList)
                } else {
                    setInstitutions((prev) => [...prev, ...response.data.institutionList])
                }

                setHasMore(response.data.institutionList.length > 0 && response.data.page * response.data.limit < response.data.total)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const lastInstitutionElementRef = useCallback(
        (node) => {
            if (isLoading) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    const nextPage = page + 1
                    setPage(nextPage)
                    fetchInstitutions(nextPage)
                }
            })

            if (node) observer.current.observe(node)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isLoading, hasMore, page]
    )

    const handleInstitutionSelect = (institution) => {
        setFormData((prev) => ({ ...prev, institutionId: institution._id }))
        setShowInstitutionDropdown(false)
        setErrors((prev) => ({ ...prev, institutionId: '' }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.institutionId) newErrors.institutionId = 'Institution is required'
        if (!formData.date) newErrors.date = 'Date is required'
        if (!formData.time) newErrors.time = 'Time is required'
        if (!formData.purpose) newErrors.purpose = 'Purpose is required'

        if (formData.date) {
            const selectedDate = new Date(formData.date)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (selectedDate < today) {
                newErrors.date = 'Date must be in the future'
            }

            if (isDateBooked(formData.date)) {
                newErrors.date = 'A session is already booked on this date'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value

        setDateError('')

        if (isDateBooked(selectedDate)) {
            setDateError('A session is already booked on this date')
        }

        setFormData({ ...formData, date: selectedDate })
        setErrors((prev) => ({ ...prev, date: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            const payload = {
                institutionId: formData.institutionId,
                date: formData.date,
                time: formData.time,
                purpose: formData.purpose,
            }

            const response = await dispatch(BookNewCounsellingSession(payload)).unwrap()

            if (response.success) {
                navigate('/dashboard/counselling')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const getSelectedInstitutionName = () => {
        const selected = institutions.find((inst) => inst._id === formData.institutionId)
        return selected ? selected.institutionName : rescheduleData?.institution || 'Select Institution'
    }

    return (
        <div className="bg-background-light py-8 min-h-screen">
            <div className="max-w-2xl mx-auto px-4">
                <button
                    onClick={() => navigate('/dashboard/counselling')}
                    className="flex items-center text-deep-blue mb-6 hover:underline">
                    <FaArrowLeft className="mr-2" /> Back to Sessions
                </button>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-navy-blue mb-6 flex items-center">
                        {rescheduleData ? 'Reschedule Counseling Session' : 'Schedule Counseling Session'}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="institution"
                                className="block text-sm font-medium text-gray-700">
                                Institution <span className="text-red-500">*</span>
                            </label>
                            <div
                                className="relative"
                                ref={institutionDropdownRef}>
                                <button
                                    className={`relative flex items-center w-full px-4 py-3 border rounded-md cursor-pointer ${
                                        errors.institutionId ? 'border-red-500' : 'border-gray-300'
                                    } ${rescheduleData ? 'bg-gray-100' : ''}`}
                                    onClick={() => !rescheduleData && setShowInstitutionDropdown(!showInstitutionDropdown)}>
                                    <FaUniversity className="text-gray-400 mr-3" />
                                    <span className={`flex-grow truncate ${formData.institutionId ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {getSelectedInstitutionName()}
                                    </span>
                                    {!rescheduleData && <FaSearch className="text-gray-400" />}
                                </button>

                                {errors.institutionId && <p className="mt-1 text-sm text-red-600">{errors.institutionId}</p>}

                                {showInstitutionDropdown && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        <div className="sticky top-0 bg-white p-2 border-b">
                                            <div className="relative">
                                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    placeholder="Search institutions..."
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        {institutions.length > 0 ? (
                                            <div>
                                                {institutions.map((institution, index) => (
                                                    <button
                                                        key={institution._id}
                                                        ref={index === institutions.length - 1 ? lastInstitutionElementRef : null}
                                                        onClick={() => handleInstitutionSelect(institution)}
                                                        className={`p-3 hover:bg-gray-100 cursor-pointer ${
                                                            formData.institutionId === institution._id ? 'bg-blue-50' : ''
                                                        }`}>
                                                        {institution.institutionName}
                                                    </button>
                                                ))}
                                                {isLoading && (
                                                    <div className="p-3 text-center text-gray-500">
                                                        <FaSpinner className="animate-spin inline mr-2" />
                                                        Loading more...
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-3 text-center text-gray-500">
                                                {isLoading ? <FaSpinner className="animate-spin inline mr-2" /> : 'No institutions found'}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="date"
                                    className="block text-sm font-medium text-gray-700">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleDateChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.date || dateError ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                                    {!errors.date && dateError && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <FaExclamationCircle className="mr-1" /> {dateError}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="time"
                                    className="block text-sm font-medium text-gray-700">
                                    Time <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <FaClock className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="time"
                                        id="time"
                                        value={formData.time}
                                        onChange={(e) => {
                                            setFormData({ ...formData, time: e.target.value })
                                            setErrors((prev) => ({ ...prev, time: '' }))
                                        }}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.time ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="purpose"
                                className="block text-sm font-medium text-gray-700">
                                Purpose of Meeting <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="purpose"
                                value={formData.purpose}
                                onChange={(e) => {
                                    setFormData({ ...formData, purpose: e.target.value })
                                    setErrors((prev) => ({ ...prev, purpose: '' }))
                                }}
                                disabled={!!rescheduleData}
                                className={`w-full p-4 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.purpose ? 'border-red-500' : 'border-gray-300'
                                } ${rescheduleData ? 'bg-gray-100' : ''}`}
                                rows={4}
                                placeholder="Please describe the purpose of your counseling session..."
                            />
                            {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>}
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-blue-700 rounded mb-4">
                            <div className="flex">
                                <FaInfoCircle className="flex-shrink-0 mt-0.5 mr-2" />
                                <div>
                                    <p className="font-medium mb-1">Important Information</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Counseling sessions are subject to approval by the institution</li>
                                        <li>You will receive a confirmation email once your request is approved</li>
                                        <li>You can reschedule or cancel your session up to 24 hours before the appointment</li>
                                        <li>You can schedule only one counselling session per day</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-deep-blue text-white py-3 px-6 rounded-md hover:bg-navy-blue transition-colors duration-200 flex items-center justify-center">
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    {rescheduleData ? 'Rescheduling...' : 'Scheduling...'}
                                </>
                            ) : rescheduleData ? (
                                'Reschedule Session'
                            ) : (
                                'Schedule Session'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookCounselling
