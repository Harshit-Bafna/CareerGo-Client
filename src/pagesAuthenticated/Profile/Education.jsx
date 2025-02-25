import { useState } from 'react'
import { FaEdit, FaSave, FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Input = ({ label, name, value, onChange, placeholder, type = 'text', required = true }) => (
    <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-2 border rounded-md"
            required={required}
        />
    </div>
)

const Education = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [educations, setEducations] = useState([
        {
            id: 1,
            institution: 'VIT Bhopal',
            category: 'Graduation and above',
            fields: {
                course: 'B.Tech in CSE',
                major: 'Computer Science',
                specialization: '',
                startDate: '2020-09',
                endDate: '2024-05',
                grade: '8.72 CGPA',
                projects: '',
            },
        },
        {
            id: 2,
            institution: 'XYZ School',
            category: '11th & 12th',
            fields: {
                standard: '11th',
                board: 'CBSE',
                year: '2020',
                stream: 'Science',
                grade: '92%',
            },
        },
    ])
    const [newEducation, setNewEducation] = useState({ institution: '', category: '', fields: {} })
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [error, setError] = useState('')

    const toggleEdit = () => setIsEditing(!isEditing)
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

    const handleCategoryChange = (e) => {
        const category = e.target.value
        setNewEducation({ ...newEducation, category, fields: {} })
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

    const validateFields = () => {
        const { category, institution, fields } = newEducation
        if (!category || !institution) return false

        const requiredFields = {
            '10th and below': ['standard', 'board', 'year', 'grade'],
            '11th & 12th': ['standard', 'board', 'year', 'stream', 'grade'],
            'Graduation and above': ['course', 'major', 'startDate', 'endDate', 'grade'],
        }

        return requiredFields[category].every((field) => fields[field] && fields[field].trim() !== '')
    }

    const handleAddEducation = () => {
        if (validateFields()) {
            setEducations([...educations, { ...newEducation, id: Date.now() }])
            setNewEducation({ institution: '', category: '', fields: {} })
            setIsDropdownOpen(false)
            setError('')
        } else {
            setError('Please fill in all mandatory fields.')
        }
    }

    const handleRemoveEducation = (id) => {
        if (isEditing) {
            setEducations((prev) => prev.filter((edu) => edu.id !== id))
        }
    }

    const renderFields = () => {
        switch (newEducation.category) {
            case '10th and below':
                return (
                    <>
                        <Input
                            label="Standard"
                            name="standard"
                            value={newEducation.fields.standard || ''}
                            onChange={handleFieldChange}
                            placeholder="Standard"
                        />
                        <Input
                            label="Board/University"
                            name="board"
                            value={newEducation.fields.board || ''}
                            onChange={handleFieldChange}
                            placeholder="Board/University"
                        />
                        <Input
                            label="Year of Passing"
                            name="year"
                            type="number"
                            value={newEducation.fields.year || ''}
                            onChange={handleFieldChange}
                            placeholder="Year of Passing"
                        />
                        <Input
                            label="Percentage/Grade"
                            name="grade"
                            value={newEducation.fields.grade || ''}
                            onChange={handleFieldChange}
                            placeholder="Percentage/Grade"
                        />
                        <Input
                            label="Medium of Instruction"
                            name="medium"
                            value={newEducation.fields.medium || ''}
                            onChange={handleFieldChange}
                            placeholder="Medium of Instruction"
                            required={false}
                        />
                    </>
                )
            case '11th & 12th':
                return (
                    <>
                        <Input
                            label="Standard"
                            name="standard"
                            value={newEducation.fields.standard || ''}
                            onChange={handleFieldChange}
                            placeholder="Standard"
                        />
                        <Input
                            label="Board/University"
                            name="board"
                            value={newEducation.fields.board || ''}
                            onChange={handleFieldChange}
                            placeholder="Board/University"
                        />
                        <Input
                            label="Year of Passing"
                            name="year"
                            type="number"
                            value={newEducation.fields.year || ''}
                            onChange={handleFieldChange}
                            placeholder="Year of Passing"
                        />
                        <Input
                            label="Stream/Group"
                            name="stream"
                            value={newEducation.fields.stream || ''}
                            onChange={handleFieldChange}
                            placeholder="Stream/Group"
                        />
                        <Input
                            label="Percentage/Grade/CGPA"
                            name="grade"
                            value={newEducation.fields.grade || ''}
                            onChange={handleFieldChange}
                            placeholder="Percentage/Grade/CGPA"
                        />
                    </>
                )
            case 'Graduation and above':
                return (
                    <>
                        <Input
                            label="Course/Degree"
                            name="course"
                            value={newEducation.fields.course || ''}
                            onChange={handleFieldChange}
                            placeholder="Course/Degree"
                        />
                        <Input
                            label="Major/Field of Study"
                            name="major"
                            value={newEducation.fields.major || ''}
                            onChange={handleFieldChange}
                            placeholder="Major/Field of Study"
                        />
                        <Input
                            label="Specialization"
                            name="specialization"
                            value={newEducation.fields.specialization || ''}
                            onChange={handleFieldChange}
                            placeholder="Specialization"
                            required={false}
                        />
                        <Input
                            label="Start Date"
                            name="startDate"
                            type="month"
                            value={newEducation.fields.startDate || ''}
                            onChange={handleFieldChange}
                            placeholder="Start Date"
                        />
                        <Input
                            label="End Date"
                            name="endDate"
                            type="month"
                            value={newEducation.fields.endDate || ''}
                            onChange={handleFieldChange}
                            placeholder="End Date"
                        />
                        <Input
                            label="Percentage/Grade/CGPA"
                            name="grade"
                            value={newEducation.fields.grade || ''}
                            onChange={handleFieldChange}
                            placeholder="Percentage/Grade/CGPA"
                        />
                        <Input
                            label="Relevant Projects/Internships"
                            name="projects"
                            value={newEducation.fields.projects || ''}
                            onChange={handleFieldChange}
                            placeholder="Relevant Projects/Internships"
                            required={false}
                        />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
                <button
                    onClick={toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition">
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            {isEditing && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Education</h3>
                    <Input
                        label="Institution Name"
                        name="institution"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        placeholder="Institution Name"
                    />
                    <div className="mb-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <button
                                id="category"
                                onClick={toggleDropdown}
                                className="w-full p-2 border rounded-md text-left flex justify-between items-center">
                                {newEducation.category || 'Select Category'}
                                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full bg-white border rounded-md mt-1">
                                    {['10th and below', '11th & 12th', 'Graduation and above'].map((category) => (
                                        <button
                                            key={category}
                                            className="w-full p-2 text-left hover:bg-gray-100"
                                            onClick={() => {
                                                handleCategoryChange({ target: { value: category } })
                                                setIsDropdownOpen(false)
                                            }}>
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {renderFields()}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <button
                        onClick={handleAddEducation}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition mt-4">
                        <FaPlus className="w-4 h-4 mr-2" /> Add Education
                    </button>
                </div>
            )}
            <div className="space-y-6 mt-6">
                {educations.map((edu) => (
                    <div
                        key={edu.id}
                        className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-2 w-3 h-3 bg-blue-600 rounded-full" />
                        <h3 className="text-lg font-semibold text-gray-800">{edu.institution}</h3>
                        <p className="text-sm text-gray-500">{edu.category}</p>
                        {Object.entries(edu.fields).map(
                            ([key, value]) =>
                                value && (
                                    <p
                                        key={key}
                                        className="text-gray-600">
                                        {key}: {value}
                                    </p>
                                )
                        )}
                        {isEditing && (
                            <button
                                onClick={() => handleRemoveEducation(edu.id)}
                                className="text-red-500 hover:text-red-600 mt-2">
                                <FaTrash className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Education