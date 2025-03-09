import { useState } from 'react'
import { FaEdit, FaSave, FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaTimes } from 'react-icons/fa'

const InputField = ({ label, type = 'text', name, value, options, onChange, required = false, disabled = false }) => {
    return (
        <div>
            <label className="block text-gray-600 font-medium capitalize">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            {type === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="border p-2 w-full rounded-md"
                    required={required}>
                    {options.map((option) => (
                        <option
                            key={option}
                            value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`border p-2 w-full rounded-md  ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                    required={required}
                    disabled={disabled}
                />
            )}
        </div>
    )
}

const UserProfile = () => {
    const [editSection, setEditSection] = useState(null)
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        dob: '2000-01-01',
        gender: 'Male',
        region: 'USA',
    })
    const [languages, setLanguages] = useState([
        { name: 'English', read: 'Expert', write: 'Intermediate' },
        { name: 'Hindi', read: 'Intermediate', write: 'Beginner' },
    ])
    const [newLanguage, setNewLanguage] = useState({ name: '', read: 'Beginner', write: 'Beginner' })
    const [skillsAndHobbies, setSkillsAndHobbies] = useState(['React', 'Tailwind CSS', 'JavaScript'])
    const [newSkillOrHobby, setNewSkillOrHobby] = useState('')
    const [socialLinks, setSocialLinks] = useState({
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: 'https://twitter.com/johndoe',
        website: 'https://johndoe.com',
    })

    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value })

    const handleEdit = (section) => setEditSection(section)

    const handleSave = () => {
        if (editSection === 'basic' && Object.values(userData).some((value) => !value)) {
            alert('All fields in Basic Information are mandatory. Please fill them all.')
            return
        }
        if (editSection === 'languages' && languages.length === 0) {
            alert('At least one language is required.')
            return
        }
        if (editSection === 'skillsAndHobbies' && skillsAndHobbies.length === 0) {
            alert('At least one skill or hobby is required.')
            return
        }
        setEditSection(null)
    }

    const handleAddLanguage = () => {
        if (newLanguage.name.trim()) {
            setLanguages([...languages, newLanguage])
            setNewLanguage({ name: '', read: 'Beginner', write: 'Beginner' })
        }
    }

    const handleRemoveLanguage = (index) => {
        setLanguages(languages.filter((_, i) => i !== index))
    }

    const handleAddSkill = () => {
        if (newSkillOrHobby.trim() && !skillsAndHobbies.includes(newSkillOrHobby)) {
            setSkillsAndHobbies([...skillsAndHobbies, newSkillOrHobby.trim()])
            setNewSkillOrHobby('')
        }
    }

    const handleRemoveSkill = (skill) => {
        setSkillsAndHobbies(skillsAndHobbies.filter((s) => s !== skill))
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                    {editSection !== 'basic' ? (
                        <button
                            onClick={() => handleEdit('basic')}
                            className="text-blue-500 hover:underline flex items-center">
                            <FaEdit className="w-4 h-4 mr-1" /> Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="text-green-500 hover:underline flex items-center">
                            <FaSave className="w-4 h-4 mr-1" /> Save
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(userData).map((key) => (
                        <div key={key}>
                            {editSection === 'basic' ? (
                                <InputField
                                    label={key.replace('dob', 'Date of Birth')}
                                    type={key === 'dob' ? 'date' : key === 'gender' ? 'select' : 'text'}
                                    name={key}
                                    value={userData[key]}
                                    options={key === 'gender' ? ['Male', 'Female', 'Other', "Don't want to say"] : []}
                                    onChange={handleChange}
                                    required={true}
                                    disabled={key === 'name' || key === 'email'}
                                />
                            ) : (
                                <>
                                    <label className="block text-gray-600 font-medium capitalize">
                                        {key.replace('dob', 'Date of Birth')}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-gray-800">{userData[key]}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Languages <span className="text-red-500">*</span>
                    </h2>
                    {editSection !== 'languages' ? (
                        <button
                            onClick={() => handleEdit('languages')}
                            className="text-blue-500 hover:underline flex items-center">
                            <FaEdit className="w-4 h-4 mr-1" /> Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="text-green-500 hover:underline flex items-center">
                            <FaSave className="w-4 h-4 mr-1" /> Save
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {languages.map((lang, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-md flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-gray-700">{lang.name}</h3>
                                <p className="text-gray-600">Read: {lang.read}</p>
                                <p className="text-gray-600">Write: {lang.write}</p>
                            </div>
                            {editSection === 'languages' && (
                                <button
                                    onClick={() => handleRemoveLanguage(index)}
                                    className="text-red-500">
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                {editSection === 'languages' && (
                    <div className="mt-4 space-y-2">
                        <input
                            type="text"
                            placeholder="Language Name"
                            value={newLanguage.name}
                            onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                            className="border p-2 w-full rounded-md"
                        />
                        <div className="flex gap-2">
                            <select
                                value={newLanguage.read}
                                onChange={(e) => setNewLanguage({ ...newLanguage, read: e.target.value })}
                                className="border p-2 rounded-md w-1/2">
                                <option value="Beginner">Read: Beginner</option>
                                <option value="Intermediate">Read: Intermediate</option>
                                <option value="Expert">Read: Expert</option>
                            </select>
                            <select
                                value={newLanguage.write}
                                onChange={(e) => setNewLanguage({ ...newLanguage, write: e.target.value })}
                                className="border p-2 rounded-md w-1/2">
                                <option value="Beginner">Write: Beginner</option>
                                <option value="Intermediate">Write: Intermediate</option>
                                <option value="Expert">Write: Expert</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAddLanguage}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                            Add Language
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Skills & Hobbies <span className="text-red-500">*</span>
                    </h2>
                    {editSection !== 'skillsAndHobbies' ? (
                        <button
                            onClick={() => handleEdit('skillsAndHobbies')}
                            className="text-blue-500 hover:underline flex items-center">
                            <FaEdit className="w-4 h-4 mr-1" /> Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="text-green-500 hover:underline flex items-center">
                            <FaSave className="w-4 h-4 mr-1" /> Save
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {skillsAndHobbies.map((skill) => (
                        <span
                            key={skill}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center">
                            {skill}
                            {editSection === 'skillsAndHobbies' && (
                                <button
                                    onClick={() => handleRemoveSkill(skill)}
                                    className="ml-2 text-red-500">
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            )}
                        </span>
                    ))}
                </div>
                {editSection === 'skillsAndHobbies' && (
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={newSkillOrHobby}
                            onChange={(e) => setNewSkillOrHobby(e.target.value)}
                            className="border p-2 w-full rounded-md"
                            placeholder="Add a new skill or hobby"
                        />
                        <button
                            onClick={handleAddSkill}
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                            Add
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Social Links</h2>
                    {editSection !== 'social' ? (
                        <button
                            onClick={() => handleEdit('social')}
                            className="text-blue-500 hover:underline flex items-center">
                            <FaEdit className="w-4 h-4 mr-1" /> Edit
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="text-green-500 hover:underline flex items-center">
                            <FaSave className="w-4 h-4 mr-1" /> Save
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(socialLinks).map(([key, url]) => (
                        <div
                            key={key}
                            className="flex items-center space-x-2">
                            {key === 'github' && <FaGithub className="w-6 h-6 text-gray-600" />}
                            {key === 'linkedin' && <FaLinkedin className="w-6 h-6 text-gray-600" />}
                            {key === 'twitter' && <FaTwitter className="w-6 h-6 text-gray-600" />}
                            {key === 'website' && <FaGlobe className="w-6 h-6 text-gray-600" />}
                            {editSection === 'social' ? (
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                                    className="border p-2 w-full rounded-md"
                                />
                            ) : (
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline">
                                    {url}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
