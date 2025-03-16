import { useState, useEffect } from 'react'
import { FaEdit, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { createAchievement, deleteAchievement, getAchievements, updateAchievement } from '../../store/slices/userSlice'
const Input = ({ label, name, value, onChange, placeholder, type = 'text', required = true }) => (
    <div className="flex flex-col mb-2">
        <label className="mb-1 text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full p-2 border rounded-md"
        />
    </div>
)

const TextArea = ({ label, name, value, onChange, placeholder, required = true }) => (
    <div className="flex flex-col mb-2">
        <label className="mb-1 text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full p-2 border rounded-md"
        />
    </div>
)

const Select = ({ label, name, value, onChange, options, required = true }) => (
    <div className="flex flex-col mb-2">
        <label className="mb-1 text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full p-2 border rounded-md">
            <option
                value=""
                disabled>
                Select Category
            </option>
            {options.map((option) => (
                <option
                    key={option}
                    value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
)

const Achievements = () => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user || {})

    const [isEditing, setIsEditing] = useState(false)
    const [achievements, setAchievements] = useState([])
    const categories = ['Academic', 'Professional', 'Extracurricular', 'Sports', 'Arts']

    const [newAchievement, setNewAchievement] = useState({
        title: '',
        category: '',
        organization: '',
        date: '',
        description: '',
    })

    useEffect(() => {
        fetchAchievements()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchAchievements = async () => {
        const resultAction = await dispatch(getAchievements())
        if (getAchievements.fulfilled.match(resultAction)) {
            const mappedAchievements = resultAction.payload.data.achievements.map((ach) => ({
                id: ach._id,
                title: ach.title,
                category: ach.type,
                organization: ach.awardedBy,
                date: ach.startDate,
                description: ach.description || '',
            }))
            setAchievements(mappedAchievements)
        }
    }

    const toggleEdit = async () => {
        if (isEditing) {
            await fetchAchievements()
        }
        setIsEditing(!isEditing)
    }

    const handleChange = (e, id) => {
        const { name, value } = e.target
        setAchievements((prev) => prev.map((ach) => (ach.id === id ? { ...ach, [name]: value } : ach)))
    }

    const handleAddAchievement = async (e) => {
        e.preventDefault()
        if (newAchievement.title && newAchievement.category && newAchievement.organization && newAchievement.date) {
            const payload = {
                title: newAchievement.title,
                type: newAchievement.category,
                awardedBy: newAchievement.organization,
                startDate: newAchievement.date,
                description: newAchievement.description,
            }

            const resultAction = await dispatch(createAchievement(payload))
            if (createAchievement.fulfilled.match(resultAction)) {
                await fetchAchievements()
                setNewAchievement({ title: '', category: '', organization: '', date: '', description: '' })
            }
        }
    }

    const handleUpdateAchievement = async (id) => {
        const achievement = achievements.find((ach) => ach.id === id)
        if (!achievement) return

        const payload = {
            achievementId: id,
            title: achievement.title,
            type: achievement.category,
            awardedBy: achievement.organization,
            startDate: achievement.date,
            description: achievement.description,
        }

        await dispatch(updateAchievement(payload))
    }

    const handleRemoveAchievement = async (id) => {
        const payload = { achievementId: id }
        const resultAction = await dispatch(deleteAchievement(payload))
        if (deleteAchievement.fulfilled.match(resultAction)) {
            setAchievements((prev) => prev.filter((ach) => ach.id !== id))
        }
    }

    const handleSaveAll = async () => {
        for (const achievement of achievements) {
            await handleUpdateAchievement(achievement.id)
        }
        toggleEdit()
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Achievements</h2>
                <button
                    onClick={isEditing ? handleSaveAll : toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition"
                    disabled={loading}>
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading && <div className="text-blue-500 mb-4">Loading...</div>}

            <div className="space-y-6">
                {achievements.map((ach) => (
                    <div
                        key={ach.id}
                        className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-2 w-3 h-3 bg-blue-600 rounded-full" />
                        {isEditing ? (
                            <div className="space-y-2">
                                <Input
                                    label="Title"
                                    name="title"
                                    value={ach.title}
                                    onChange={(e) => handleChange(e, ach.id)}
                                    placeholder="Title"
                                />
                                <Select
                                    label="Category"
                                    name="category"
                                    value={ach.category}
                                    onChange={(e) => handleChange(e, ach.id)}
                                    options={categories}
                                />
                                <Input
                                    label="Issuing Organization"
                                    name="organization"
                                    value={ach.organization}
                                    onChange={(e) => handleChange(e, ach.id)}
                                    placeholder="Issuing Organization"
                                />
                                <Input
                                    label="Date of Achievement"
                                    name="date"
                                    type="date"
                                    value={ach.date}
                                    onChange={(e) => handleChange(e, ach.id)}
                                    placeholder="Date"
                                />
                                <TextArea
                                    label="Description"
                                    name="description"
                                    value={ach.description}
                                    onChange={(e) => handleChange(e, ach.id)}
                                    placeholder="Description"
                                />
                                <button
                                    onClick={() => handleRemoveAchievement(ach.id)}
                                    className="text-red-500 hover:text-red-600"
                                    disabled={loading}>
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800">{ach.title}</h3>
                                <p className="text-gray-600">
                                    {ach.category} - {ach.organization}
                                </p>
                                <p className="text-sm text-gray-500">{ach.date}</p>
                                <p className="text-sm text-gray-600">{ach.description}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {isEditing && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Achievement</h3>
                    <form
                        onSubmit={handleAddAchievement}
                        className="space-y-2">
                        <Input
                            label="Title"
                            name="title"
                            value={newAchievement.title}
                            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                            placeholder="Title"
                        />
                        <Select
                            label="Category"
                            name="category"
                            value={newAchievement.category}
                            onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                            options={categories}
                        />
                        <Input
                            label="Issuing Organization"
                            name="organization"
                            value={newAchievement.organization}
                            onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                            placeholder="Issuing Organization"
                        />
                        <Input
                            label="Date of Achievement"
                            name="date"
                            type="date"
                            value={newAchievement.date}
                            onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                            placeholder="Date"
                        />
                        <TextArea
                            label="Description"
                            name="description"
                            value={newAchievement.description}
                            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                            placeholder="Description"
                        />
                        <button
                            type="submit"
                            className="flex items-center text-blue-600 hover:text-blue-800 transition"
                            disabled={loading}>
                            <FaPlus className="w-4 h-4 mr-2" /> Add Achievement
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Achievements
