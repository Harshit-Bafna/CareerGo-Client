import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaSave, FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../../store/slices/userSlice'

const EAchievementCategory = {
    Academic: 'Academic',
    Professional: 'Professional',
    Extracurricular: 'Extracurricular',
    Sports: 'Sports',
    Arts: 'Arts',
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

const TextArea = ({ label, name, value, onChange, placeholder, required = true }) => (
    <div className="mb-2">
        <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
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

const Achievements = () => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [achievements, setAchievements] = useState([])
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        category: '',
        fields: {
            organization: '',
            date: '',
            description: '',
        },
    })
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [editingAchievement, setEditingAchievement] = useState(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [achievementToDelete, setAchievementToDelete] = useState(null)

    const loading = useSelector((state) => state.user?.loading) || isLoading
    const apiError = useSelector((state) => state.user?.error)

    useEffect(() => {
        fetchAchievements()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const fetchAchievements = async () => {
        setIsLoading(true)
        try {
            const result = await dispatch(getAchievements()).unwrap()
            if (result.success) {
                const formattedAchievements = result.data.achievements.map((ach) => ({
                    id: ach._id,
                    title: ach.title,
                    category: ach.type,
                    fields: {
                        organization: ach.awardedBy || '',
                        date: ach.startDate ? ach.startDate.substring(0, 10) : '',
                        description: ach.description || '',
                    },
                }))

                setAchievements(formattedAchievements)
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch achievement data')
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        setEditingAchievement(null)
    }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const handleCategoryChange = (e) => {
        const category = e.target.value
        setNewAchievement({
            ...newAchievement,
            category,
            fields: {
                ...newAchievement.fields,
                organization: '',
                date: '',
                description: '',
            },
        })
        setError('')
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target
        setNewAchievement((prev) => ({
            ...prev,
            fields: { ...prev.fields, [name]: value },
        }))
        setError('')
    }

    const validateFields = (achievement) => {
        const { category, title, fields } = achievement

        if (!category || !title) {
            setError('Title and category are required')
            return false
        }

        if (!fields.organization) {
            setError('Organization is required')
            return false
        }

        if (!fields.date) {
            setError('Date is required')
            return false
        }

        return true
    }

    const prepareAchievementPayload = (achievement) => {
        const { title, category, fields } = achievement

        const payload = {
            title: title,
            type: category,
            awardedBy: fields.organization,
            startDate: fields.date,
            description: fields.description || '',
        }

        return payload
    }

    const handleAddAchievement = async () => {
        if (validateFields(newAchievement)) {
            try {
                const payload = prepareAchievementPayload(newAchievement)
                const result = await dispatch(createAchievement(payload)).unwrap()

                if (result.success) {
                    await fetchAchievements()
                    setNewAchievement({
                        title: '',
                        category: '',
                        fields: {
                            organization: '',
                            date: '',
                            description: '',
                        },
                    })
                    setIsDropdownOpen(false)
                    setError('')
                }
            } catch (err) {
                setError(err.message || 'Failed to add achievement')
            }
        }
    }

    const startEditAchievement = (achievement) => {
        setEditingAchievement(achievement.id)
        setNewAchievement({
            id: achievement.id,
            title: achievement.title,
            category: achievement.category,
            fields: { ...achievement.fields },
        })
    }

    const cancelEditAchievement = () => {
        setEditingAchievement(null)
        setNewAchievement({
            title: '',
            category: '',
            fields: {
                organization: '',
                date: '',
                description: '',
            },
        })
    }

    const handleUpdateAchievement = async () => {
        if (validateFields(newAchievement)) {
            try {
                const payload = {
                    ...prepareAchievementPayload(newAchievement),
                    achievementId: newAchievement.id,
                }

                const result = await dispatch(updateAchievement(payload)).unwrap()

                if (result.success) {
                    await fetchAchievements()
                    setEditingAchievement(null)
                    setNewAchievement({
                        title: '',
                        category: '',
                        fields: {
                            organization: '',
                            date: '',
                            description: '',
                        },
                    })
                }
            } catch (err) {
                setError(err.message || 'Failed to update achievement')
            }
        }
    }

    const handleRemoveAchievement = async () => {
        if (achievementToDelete) {
            try {
                await dispatch(deleteAchievement({ achievementId: achievementToDelete })).unwrap()
                await fetchAchievements()
                setConfirmDialogOpen(false)
                setAchievementToDelete(null)
            } catch (err) {
                setError(err.message || 'Failed to delete achievement')
            }
        }
    }

    const openDeleteConfirmation = (id) => {
        setAchievementToDelete(id)
        setConfirmDialogOpen(true)
    }

    const renderAchievementForm = (achievement, isNew = true) => {
        return (
            <div className="space-y-4">
                <Input
                    label="Title"
                    name="title"
                    value={achievement.title}
                    onChange={(e) => {
                        if (isNew) {
                            setNewAchievement({ ...achievement, title: e.target.value })
                        } else {
                            setNewAchievement({ ...achievement, title: e.target.value })
                        }
                    }}
                    placeholder="Achievement Title"
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
                                {achievement.category || 'Select Category'}
                                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full bg-white border rounded-md mt-1">
                                    {Object.values(EAchievementCategory).map((cat) => (
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

                <Input
                    label="Organization"
                    name="organization"
                    value={achievement.fields.organization}
                    onChange={handleFieldChange}
                    placeholder="Issuing Organization"
                />

                <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={achievement.fields.date}
                    onChange={handleFieldChange}
                    placeholder="Date of Achievement"
                />

                <TextArea
                    label="Description"
                    name="description"
                    value={achievement.fields.description}
                    onChange={handleFieldChange}
                    placeholder="Description"
                    required={false}
                />

                {isNew ? (
                    <button
                        onClick={handleAddAchievement}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        <FaPlus className="w-4 h-4 mr-2" /> Add Achievement
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleUpdateAchievement}
                            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            <FaSave className="w-4 h-4 mr-2" /> Save Changes
                        </button>
                        <button
                            onClick={cancelEditAchievement}
                            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        )
    }

    if (loading && achievements.length === 0) {
        return <div className="bg-white rounded-xl shadow-lg p-6">Loading achievement data...</div>
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Achievements</h2>
                <button
                    onClick={toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition">
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Done' : 'Edit'}
                </button>
            </div>

            {(error || apiError) && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error || apiError}</div>}

            {isEditing && !editingAchievement && (
                <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Achievement</h3>
                    {renderAchievementForm(newAchievement, true)}
                </div>
            )}

            <div className="space-y-6 mt-6">
                {achievements.map((ach) => (
                    <div
                        key={ach.id}
                        className="relative pl-6 border-l-2 border-gray-200 pb-4">
                        <div className="absolute -left-2 w-3 h-3 bg-blue-600 rounded-full" />

                        {editingAchievement === ach.id ? (
                            <div className="mt-2">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Achievement</h3>
                                {renderAchievementForm(newAchievement, false)}
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800">{ach.title}</h3>
                                <p className="text-sm text-gray-500">{ach.category}</p>
                                <p className="text-gray-600">Organization: {ach.fields.organization}</p>
                                <p className="text-gray-600">Date: {ach.fields.date}</p>
                                {ach.fields.description && <p className="text-gray-600">Description: {ach.fields.description}</p>}

                                {isEditing && (
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => startEditAchievement(ach)}
                                            className="text-blue-500 hover:text-blue-600">
                                            <FaEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteConfirmation(ach.id)}
                                            className="text-red-500 hover:text-red-600">
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}

                {achievements.length === 0 && !isEditing && (
                    <div className="text-center py-6 text-gray-500">No achievement records found. Click Edit to add your achievement details.</div>
                )}
            </div>
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleRemoveAchievement}
            />
        </div>
    )
}

export default Achievements
