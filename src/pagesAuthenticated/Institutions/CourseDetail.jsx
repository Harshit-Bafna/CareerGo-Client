import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { FaFilter, FaDownload, FaEnvelope, FaPhone, FaGlobe, FaAward, FaTimes, FaCheck } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { MdOutlineCastForEducation, MdOutlineAttachMoney } from 'react-icons/md'
import { BsBook, BsCalendarCheck } from 'react-icons/bs'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { getCourseCategory, getAllCourse, getCourseDetails } from '../../store/slices/institutionSlice'

const CourseDetail = ({ institutionId }) => {
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCourses, setFilteredCourses] = useState([])
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [activeFilters, setActiveFilters] = useState([])

    useEffect(() => {
        const fetchCourseCategories = async () => {
            const response = await dispatch(getCourseCategory({ institutionId })).unwrap()

            if (response.success && response.data.courseCategory) {
                const fetchedCategories = response.data.courseCategory.courseCategory || []
                setCategories(fetchedCategories)
            }
        }

        fetchCourseCategories()
    }, [dispatch, institutionId])

    useEffect(() => {
        const fetchCourses = async () => {
            const categoryParam = selectedCategories.length > 0 ? selectedCategories.join(',') : ''
            const searchParam = searchTerm || ''

            const response = await dispatch(
                getAllCourse({
                    institutionId,
                    category: categoryParam,
                    search: searchParam,
                })
            ).unwrap()

            if (response.success && response.data.courses) {
                setFilteredCourses(response.data.courses)

                // Update active filters
                const activeFiltersList = []
                if (selectedCategories.length > 0) {
                    activeFiltersList.push(`Categories: ${selectedCategories.join(', ')}`)
                }
                if (searchTerm) {
                    activeFiltersList.push(`Search: "${searchTerm}"`)
                }
                setActiveFilters(activeFiltersList)
            }
        }

        fetchCourses()
    }, [dispatch, institutionId, selectedCategories, searchTerm])

    const handleCourseSelect = async (course) => {
        const response = await dispatch(
            getCourseDetails({
                institutionId,
                courseId: course._id,
            })
        ).unwrap()

        if (response.success && response.data.course) {
            setSelectedCourse(response.data.course)
            setShowModal(true)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    const toggleCategorySelection = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }

    const resetFilters = () => {
        setSelectedCategories([])
        setSearchTerm('')
    }

    return (
        <div className="bg-background-white min-h-screen p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy-blue">Courses Offered</h1>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-heading font-semibold text-deep-blue flex items-center">
                        <HiOutlineAcademicCap className="mr-2" /> Course Categories
                    </h2>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border border-border-light">
                    {categories.length > 0 ? (
                        <ul className="space-y-2">
                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className="rounded">
                                    <div className="flex items-center justify-between">
                                        <button
                                            className={`flex-1 p-2 rounded transition-colors flex items-center justify-between text-left cursor-pointer ${
                                                selectedCategories.includes(category) ? 'bg-navy-blue text-white' : 'hover:bg-background-light'
                                            }`}
                                            onClick={() => toggleCategorySelection(category)}>
                                            <div className="flex items-center">
                                                <div className="w-1 h-6 bg-gold mr-2"></div>
                                                {category}
                                            </div>
                                            {selectedCategories.includes(category) && <FaCheck className="text-gold" />}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-dark-gray py-4">No categories available.</p>
                    )}
                </div>
            </div>

            <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <h2 className="text-xl md:text-2xl font-heading font-semibold text-deep-blue flex items-center">
                        <BsBook className="mr-2" /> Detailed Course List
                    </h2>

                    <button
                        className="md:hidden flex items-center bg-navy-blue text-white px-4 py-2 rounded-md"
                        onClick={toggleFilters}>
                        <FaFilter className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    <div className={`w-full md:w-auto flex flex-col md:flex-row gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="border border-border-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-deep-blue"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button
                            className="bg-deep-blue text-white px-4 py-2 rounded-md hover:bg-navy-blue transition-colors"
                            onClick={resetFilters}>
                            Reset Filters
                        </button>
                    </div>
                </div>

                {activeFilters.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {activeFilters.map((filter, index) => (
                            <div
                                key={index}
                                className="bg-navy-blue text-white px-3 py-1 rounded-full text-sm flex items-center">
                                {filter}
                                <button
                                    className="ml-2 hover:text-gold"
                                    onClick={resetFilters}>
                                    <FaTimes size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light hover:shadow-lg transition-shadow">
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-heading font-semibold text-navy-blue">{course.courseName}</h3>
                                    </div>

                                    <p className="text-sm text-dark-gray mb-3">{course.category}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm">
                                            <IoMdTime className="mr-2 text-deep-blue" />
                                            <span>Duration: {course.duration} months</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <FaAward className="mr-2 text-deep-blue" />
                                            <span>Eligibility: {course.eligibility}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <MdOutlineCastForEducation className="mr-2 text-deep-blue" />
                                            <span>Mode: {course.mode}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="w-full bg-navy-blue text-white py-2 rounded-md hover:bg-deep-blue transition-colors"
                                        onClick={() => handleCourseSelect(course)}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-background-light p-6 rounded-lg text-center">
                        <p className="text-lg text-dark-gray">No courses found matching your criteria. Please adjust your filters.</p>
                    </div>
                )}
            </div>

            {showModal && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-navy-blue text-white p-4 flex justify-between items-center">
                            <h3 className="text-xl font-heading font-semibold">{selectedCourse.courseName}</h3>
                            <button
                                className="text-white hover:text-gold transition-colors"
                                onClick={handleCloseModal}>
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-background-light p-4 rounded-lg">
                                    <h4 className="font-heading font-semibold text-navy-blue mb-2 flex items-center">
                                        <IoMdTime className="mr-2" /> Duration
                                    </h4>
                                    <p>{selectedCourse.duration} months</p>
                                </div>

                                <div className="bg-background-light p-4 rounded-lg">
                                    <h4 className="font-heading font-semibold text-navy-blue mb-2 flex items-center">
                                        <FaAward className="mr-2" /> Eligibility
                                    </h4>
                                    <p>{selectedCourse.eligibility}</p>
                                </div>

                                <div className="bg-background-light p-4 rounded-lg">
                                    <h4 className="font-heading font-semibold text-navy-blue mb-2 flex items-center">
                                        <MdOutlineCastForEducation className="mr-2" /> Mode
                                    </h4>
                                    <p>{selectedCourse.mode}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-heading font-semibold text-navy-blue mb-3 flex items-center">
                                    <BsBook className="mr-2" /> Course Syllabus / Curriculum
                                </h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    {selectedCourse.syllabus && selectedCourse.syllabus.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-heading font-semibold text-navy-blue mb-3 flex items-center">
                                    <MdOutlineAttachMoney className="mr-2" /> Fee Structure
                                </h4>
                                <p>₹{selectedCourse.fees}</p>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-heading font-semibold text-navy-blue mb-3 flex items-center">
                                    <BsCalendarCheck className="mr-2" /> Admission Process
                                </h4>
                                <p>{selectedCourse.admissionProcess}</p>
                            </div>

                            <div className="bg-background-light p-4 rounded-lg mb-6">
                                <h4 className="font-heading font-semibold text-navy-blue mb-3">Contact Information</h4>
                                <div className="space-y-2">
                                    <p className="flex items-center">
                                        <FaEnvelope className="mr-2 text-deep-blue" />
                                        {selectedCourse.email}
                                    </p>
                                    <p className="flex items-center">
                                        <FaPhone className="mr-2 text-deep-blue" />
                                        {selectedCourse.phone}
                                    </p>
                                    <p className="flex items-center">
                                        <FaGlobe className="mr-2 text-deep-blue" />
                                        {selectedCourse.website}
                                    </p>
                                </div>
                            </div>

                            {selectedCourse.brochure && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={selectedCourse.brochure}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-deep-blue text-white py-3 rounded-md text-center hover:bg-navy-blue transition-colors flex items-center justify-center"
                                        download={`${selectedCourse.courseName.replace(/\s+/g, '-').toLowerCase()}-brochure.pdf`}>
                                        <FaDownload className="mr-2" /> Download Brochure
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseDetail
