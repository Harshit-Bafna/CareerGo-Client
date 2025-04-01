import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaSave, FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { getEducation, createEducation, updateEducation, deleteEducation } from '../../store/slices/userSlice'

const EEducationCategory = {
    Below_10th: '10th and below',
    Above_10th_And_Below_12th: '11th & 12th',
    Graduation_And_Above: 'Graduation and above',
}

const EGradeType = {
    CGPA: 'CGPA',
    PERCENTAGE: 'Percentage',
}

const Input = ({ label, name, value, onChange, placeholder, type = 'text', required = true }) => (
    <div className="mb-2">
        <label
            htmlFor="gradeType"
            className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border rounded-md"
            required={required}
        />
    </div>
)

const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Deletion',
    message = 'Are you sure you want to delete? This action cannot be undone.',
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center gap-3 text-red-500 mb-4">
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line
                            x1="12"
                            y1="9"
                            x2="12"
                            y2="13"></line>
                        <line
                            x1="12"
                            y1="17"
                            x2="12.01"
                            y2="17"></line>
                    </svg>
                    <h2 className="text-xl font-bold text-red-500">{title}</h2>
                </div>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

const Education = () => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [educations, setEducations] = useState([])
    const [newEducation, setNewEducation] = useState({
        institution: '',
        category: '',
        fields: {
            gradeType: EGradeType.PERCENTAGE,
            gradeValue: '',
            startDate: '',
            endDate: '',
        },
    })
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isGradeDropdownOpen, setIsGradeDropdownOpen] = useState(false)
    const [editingEducation, setEditingEducation] = useState(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [educationToDelete, setEducationToDelete] = useState(null)

    const loading = useSelector((state) => state.user?.loading) || isLoading
    const apiError = useSelector((state) => state.user?.error)

    useEffect(() => {
        fetchEducation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const fetchEducation = async () => {
        setIsLoading(true)
        try {
            const result = await dispatch(getEducation()).unwrap()
            if (result.success) {
                const formattedEducation = result.data.education.map((edu) => ({
                    id: edu._id,
                    institution: edu.institutionName,
                    category: edu.category,
                    fields: {
                        standard: edu.standard || '',
                        board: edu.board || '',
                        mediumOfInstruction: edu.mediumOfInstruction || '',
                        stream: edu.stream || '',
                        major: edu.major || '',
                        specialization: edu.specialization || '',
                        startDate: edu.startDate ? edu.startDate.substring(0, 7) : '',
                        endDate: edu.endDate ? edu.endDate.substring(0, 7) : '',
                        gradeType: edu.grade.type,
                        gradeValue: edu.grade.value,
                    },
                }))

                setEducations(formattedEducation)
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch education data')
        } finally {
            setIsLoading(false)
        }
    }

    const formatGradeForDisplay = (gradeType, gradeValue) => {
        if (gradeType === EGradeType.CGPA) {
            return `${gradeValue} CGPA`
        } else {
            return `${gradeValue}%`
        }
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        setEditingEducation(null)
    }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
    const toggleGradeDropdown = () => setIsGradeDropdownOpen(!isGradeDropdownOpen)

    const handleCategoryChange = (e) => {
        const category = e.target.value
        setNewEducation({
            ...newEducation,
            category,
            fields: {
                ...newEducation.fields,
                gradeType: EGradeType.PERCENTAGE,
                gradeValue: '',
                startDate: '',
                endDate: '',
            },
        })
        setError('')
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target
        setNewEducation((prev) => ({
            ...prev,
            fields: { ...prev.fields, [name]: value },
        }))
        setError('')
    }

    const handleGradeTypeChange = (type) => {
        setNewEducation((prev) => ({
            ...prev,
            fields: { ...prev.fields, gradeType: type },
        }))
        setIsGradeDropdownOpen(false)
    }

    const validateFields = (education) => {
        const { category, institution, fields } = education

        if (!category || !institution) {
            setError('Institution name and category are required')
            return false
        }

        if (!fields.gradeType || !fields.gradeValue) {
            setError('Grade type and value are required')
            return false
        }

        if (!fields.startDate) {
            setError('Start date is required')
            return false
        }

        if (category === EEducationCategory.Below_10th || category === EEducationCategory.Above_10th_And_Below_12th) {
            if (!fields.standard) {
                setError('Standard is required')
                return false
            }
            if (!fields.board) {
                setError('Board is required')
                return false
            }
        }

        if (category === EEducationCategory.Graduation_And_Above) {
            if (!fields.stream) {
                setError('Stream/Course is required')
                return false
            }
            if (!fields.major) {
                setError('Major is required')
                return false
            }
        }

        return true
    }

    const prepareEducationPayload = (education) => {
        const { institution, category, fields } = education

        const payload = {
            institutionName: institution,
            category: category,
            grade: {
                type: fields.gradeType,
                value: Number(fields.gradeValue),
            },
            startDate: fields.startDate ? `${fields.startDate}-01` : '',
            endDate: fields.endDate ? `${fields.endDate}-01` : null,
        }

        if (category === EEducationCategory.Below_10th || category === EEducationCategory.Above_10th_And_Below_12th) {
            payload.standard = fields.standard || null
            payload.board = fields.board || null
            payload.mediumOfInstruction = fields.mediumOfInstruction || null
        }

        if (category === EEducationCategory.Graduation_And_Above) {
            payload.stream = fields.stream || null
            payload.major = fields.major || null
            payload.specialization = fields.specialization || null
        }

        return payload
    }

    const handleAddEducation = async () => {
        if (validateFields(newEducation)) {
            try {
                const payload = prepareEducationPayload(newEducation)
                const result = await dispatch(createEducation(payload)).unwrap()

                if (result.success) {
                    await fetchEducation()
                    setNewEducation({
                        institution: '',
                        category: '',
                        fields: {
                            gradeType: EGradeType.PERCENTAGE,
                            gradeValue: '',
                            startDate: '',
                            endDate: '',
                        },
                    })
                    setIsDropdownOpen(false)
                    setError('')
                }
            } catch (err) {
                setError(err.message || 'Failed to add education')
            }
        }
    }

    const startEditEducation = (education) => {
        setEditingEducation(education.id)
        setNewEducation({
            id: education.id,
            institution: education.institution,
            category: education.category,
            fields: { ...education.fields },
        })
    }

    const cancelEditEducation = () => {
        setEditingEducation(null)
        setNewEducation({
            institution: '',
            category: '',
            fields: {
                gradeType: EGradeType.PERCENTAGE,
                gradeValue: '',
                startDate: '',
                endDate: '',
            },
        })
    }

    const handleUpdateEducation = async () => {
        if (validateFields(newEducation)) {
            try {
                const payload = {
                    ...prepareEducationPayload(newEducation),
                    educationId: newEducation.id,
                }

                const result = await dispatch(updateEducation(payload)).unwrap()

                if (result.success) {
                    await fetchEducation()
                    setEditingEducation(null)
                    setNewEducation({
                        institution: '',
                        category: '',
                        fields: {
                            gradeType: EGradeType.PERCENTAGE,
                            gradeValue: '',
                            startDate: '',
                            endDate: '',
                        },
                    })
                }
            } catch (err) {
                setError(err.message || 'Failed to update education')
            }
        }
    }

    const handleRemoveEducation = async () => {
        if (educationToDelete) {
            try {
                await dispatch(deleteEducation({ educationId: educationToDelete })).unwrap()
                await fetchEducation()
                setConfirmDialogOpen(false)
                setEducationToDelete(null)
            } catch (err) {
                setError(err.message || 'Failed to delete education')
            }
        }
    }

    const openDeleteConfirmation = (id) => {
        setEducationToDelete(id)
        setConfirmDialogOpen(true)
    }

    const renderEducationForm = (education, isNew = true) => {
        const { category, fields } = education

        const commonFields = (
            <>
                <Input
                    label="Institution Name"
                    name="institution"
                    value={education.institution}
                    onChange={(e) => {
                        if (isNew) {
                            setNewEducation({ ...education, institution: e.target.value })
                        } else {
                            setNewEducation({ ...education, institution: e.target.value })
                        }
                    }}
                    placeholder="Institution Name"
                />

                {isNew && (
                    <div className="mb-2">
                        <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <button
                                id="category"
                                onClick={toggleDropdown}
                                className="w-full p-2 border rounded-md text-left flex justify-between items-center">
                                {education.category || 'Select Category'}
                                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full bg-white border rounded-md mt-1">
                                    {Object.values(EEducationCategory).map((cat) => (
                                        <button
                                            key={cat}
                                            className="w-full p-2 text-left hover:bg-gray-100"
                                            onClick={() => {
                                                handleCategoryChange({ target: { value: cat } })
                                                setIsDropdownOpen(false)
                                            }}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="mb-2">
                    <label
                        htmlFor="gradeType"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Grade Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <button
                            onClick={toggleGradeDropdown}
                            className="w-full p-2 border rounded-md text-left flex justify-between items-center">
                            {fields.gradeType || EGradeType.PERCENTAGE}
                            {isGradeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {isGradeDropdownOpen && (
                            <div className="absolute z-10 w-full bg-white border rounded-md mt-1">
                                {Object.values(EGradeType).map((type) => (
                                    <button
                                        key={type}
                                        className="w-full p-2 text-left hover:bg-gray-100"
                                        onClick={() => handleGradeTypeChange(type)}>
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Input
                    label="Grade Value"
                    name="gradeValue"
                    type="number"
                    value={fields.gradeValue}
                    onChange={handleFieldChange}
                    placeholder={fields.gradeType === EGradeType.CGPA ? 'Enter CGPA (e.g., 9.5)' : 'Enter Percentage (e.g., 95)'}
                />

                <Input
                    label="Start Date"
                    name="startDate"
                    type="month"
                    value={fields.startDate}
                    onChange={handleFieldChange}
                    placeholder="Start Date"
                />

                <Input
                    label="End Date"
                    name="endDate"
                    type="month"
                    value={fields.endDate}
                    onChange={handleFieldChange}
                    placeholder="End Date"
                    required={false}
                />
            </>
        )

        let categoryFields = null

        if (category === EEducationCategory.Below_10th || category === EEducationCategory.Above_10th_And_Below_12th) {
            categoryFields = (
                <>
                    <Input
                        label="Standard"
                        name="standard"
                        value={fields.standard}
                        onChange={handleFieldChange}
                        placeholder="Standard"
                    />

                    <Input
                        label="Board"
                        name="board"
                        value={fields.board}
                        onChange={handleFieldChange}
                        placeholder="Board/University"
                    />

                    <Input
                        label="Medium of Instruction"
                        name="mediumOfInstruction"
                        value={fields.mediumOfInstruction}
                        onChange={handleFieldChange}
                        placeholder="Medium of Instruction"
                        required={false}
                    />
                </>
            )
        } else if (category === EEducationCategory.Graduation_And_Above) {
            categoryFields = (
                <>
                    <Input
                        label="Stream/Course"
                        name="stream"
                        value={fields.stream}
                        onChange={handleFieldChange}
                        placeholder="Stream/Course"
                    />

                    <Input
                        label="Major"
                        name="major"
                        value={fields.major}
                        onChange={handleFieldChange}
                        placeholder="Major/Field of Study"
                    />

                    <Input
                        label="Specialization"
                        name="specialization"
                        value={fields.specialization}
                        onChange={handleFieldChange}
                        placeholder="Specialization"
                        required={false}
                    />
                </>
            )
        }

        return (
            <div className="space-y-4">
                {commonFields}
                {category && categoryFields}

                {isNew ? (
                    <button
                        onClick={handleAddEducation}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        <FaPlus className="w-4 h-4 mr-2" /> Add Education
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleUpdateEducation}
                            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            <FaSave className="w-4 h-4 mr-2" /> Save Changes
                        </button>
                        <button
                            onClick={cancelEditEducation}
                            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        )
    }

    if (loading && educations.length === 0) {
        return <div className="bg-white rounded-xl shadow-lg p-6">Loading education data...</div>
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
                <button
                    onClick={toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition">
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Done' : 'Edit'}
                </button>
            </div>

            {(error || apiError) && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error || apiError}</div>}

            {isEditing && !editingEducation && (
                <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Education</h3>
                    {renderEducationForm(newEducation, true)}
                </div>
            )}

            <div className="space-y-6 mt-6">
                {educations.map((edu) => (
                    <div
                        key={edu.id}
                        className="relative pl-6 border-l-2 border-gray-200 pb-4">
                        <div className="absolute -left-2 w-3 h-3 bg-blue-600 rounded-full" />

                        {editingEducation === edu.id ? (
                            <div className="mt-2">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Education</h3>
                                {renderEducationForm(newEducation, false)}
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800">{edu.institution}</h3>
                                <p className="text-sm text-gray-500">{edu.category}</p>

                                {edu.category === EEducationCategory.Below_10th || edu.category === EEducationCategory.Above_10th_And_Below_12th ? (
                                    <>
                                        {edu.fields.standard && <p className="text-gray-600">Standard: {edu.fields.standard}</p>}
                                        {edu.fields.board && <p className="text-gray-600">Board: {edu.fields.board}</p>}
                                        {edu.fields.mediumOfInstruction && <p className="text-gray-600">Medium: {edu.fields.mediumOfInstruction}</p>}
                                    </>
                                ) : (
                                    <>
                                        {edu.fields.stream && <p className="text-gray-600">Stream/Course: {edu.fields.stream}</p>}
                                        {edu.fields.major && <p className="text-gray-600">Major: {edu.fields.major}</p>}
                                        {edu.fields.specialization && <p className="text-gray-600">Specialization: {edu.fields.specialization}</p>}
                                    </>
                                )}

                                <p className="text-gray-600">Grade: {formatGradeForDisplay(edu.fields.gradeType, edu.fields.gradeValue)}</p>

                                {edu.fields.startDate && (
                                    <p className="text-gray-600">
                                        Duration: {edu.fields.startDate} to {edu.fields.endDate || 'Present'}
                                    </p>
                                )}

                                {isEditing && (
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => startEditEducation(edu)}
                                            className="text-blue-500 hover:text-blue-600">
                                            <FaEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteConfirmation(edu.id)}
                                            className="text-red-500 hover:text-red-600">
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}

                {educations.length === 0 && !isEditing && (
                    <div className="text-center py-6 text-gray-500">No education records found. Click Edit to add your education details.</div>
                )}
            </div>
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleRemoveEducation}
            />
        </div>
    )
}

export default Education
