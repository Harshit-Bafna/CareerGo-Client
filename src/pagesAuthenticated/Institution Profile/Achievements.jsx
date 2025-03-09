import { useState } from 'react'
import { FaEdit, FaSave, FaPlus, FaTrash } from 'react-icons/fa'

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
    const [isEditing, setIsEditing] = useState(false)
    const [achievements, setAchievements] = useState([
        {
            id: 1,
            title: 'Hackathon Winner',
            category: 'Academic',
            organization: 'XYZ University',
            date: '2023-05-15',
            description: 'Won first place in a national-level hackathon.',
        },
        {
            id: 2,
            title: 'Best Employee Award',
            category: 'Professional',
            organization: 'ABC Corp',
            date: '2022-11-30',
            description: 'Recognized for outstanding performance and dedication at work.',
        },
    ])
    const categories = ['Academic', 'Professional', 'Extracurricular', 'Sports', 'Arts']

    const [newAchievement, setNewAchievement] = useState({
        id: 0,
        title: '',
        category: '',
        organization: '',
        date: '',
        description: '',
    })

    const toggleEdit = () => setIsEditing(!isEditing)

    const handleChange = (e, id) => {
        const { name, value } = e.target
        setAchievements((prev) => prev.map((ach) => (ach.id === id ? { ...ach, [name]: value } : ach)))
    }

    const handleAddAchievement = (e) => {
        e.preventDefault()
        if (newAchievement.title && newAchievement.category && newAchievement.organization && newAchievement.date && newAchievement.description) {
            setAchievements([...achievements, { ...newAchievement, id: Date.now() }])
            setNewAchievement({ id: 0, title: '', category: '', organization: '', date: '', description: '' })
        }
    }

    const handleRemoveAchievement = (id) => {
        setAchievements((prev) => prev.filter((ach) => ach.id !== id))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Achievements</h2>
                <button
                    onClick={toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition">
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
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
                                    className="text-red-500 hover:text-red-600">
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
                            className="flex items-center text-blue-600 hover:text-blue-800 transition">
                            <FaPlus className="w-4 h-4 mr-2" /> Add Achievement
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Achievements
