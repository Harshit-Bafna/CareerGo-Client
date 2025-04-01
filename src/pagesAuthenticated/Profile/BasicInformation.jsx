import { useState, useEffect } from 'react'
import { FaEdit, FaSave, FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updateBasicInfo, getBasicInfo } from '../../store/slices/userSlice'

const LanguageExperties = {
    Beginner: 'Beginner',
    Intermediate: 'Intermediate',
    Expert: 'Expert',
}

const SocialPlatform = {
    Github: 'Github',
    Linkedin: 'Linkedin',
    Twitter: 'Twitter',
    Website: 'Website',
}

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
                    value={value || ''}
                    onChange={onChange}
                    className="border p-2 w-full rounded-md"
                    required={required}>
                    <option value="">Select {label}</option>
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
                    value={value || ''}
                    onChange={onChange}
                    className={`border p-2 w-full rounded-md ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                    required={required}
                    disabled={disabled}
                />
            )}
        </div>
    )
}

const UserProfile = () => {
    const dispatch = useDispatch()
    const { name, emailAddress } = useSelector((state) => state.user)

    const [editSection, setEditSection] = useState(null)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        region: '',
    })

    const [languages, setLanguages] = useState([])
    const [newLanguage, setNewLanguage] = useState({
        name: '',
        read: LanguageExperties.Beginner,
        write: LanguageExperties.Beginner,
    })

    const [skillsAndHobbies, setSkillsAndHobbies] = useState([])
    const [newSkillOrHobby, setNewSkillOrHobby] = useState('')

    const [socialLinks, setSocialLinks] = useState({
        [SocialPlatform.Github]: '',
        [SocialPlatform.Linkedin]: '',
        [SocialPlatform.Twitter]: '',
        [SocialPlatform.Website]: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getBasicInfo())

            if (response.payload && response.payload.data) {
                const { basicInfo } = response.payload.data

                const formattedDate = basicInfo.dateOfBirth ? new Date(basicInfo.dateOfBirth).toISOString().split('T')[0] : ''

                setUserData({
                    name: name || '',
                    email: emailAddress || '',
                    phone: basicInfo.phone || '',
                    dateOfBirth: formattedDate,
                    gender: basicInfo.gender || '',
                    region: basicInfo.region || '',
                })

                setLanguages(basicInfo.languages || [])

                setSkillsAndHobbies(basicInfo.skills || [])

                const socialLinksMap = {
                    [SocialPlatform.Github]: '',
                    [SocialPlatform.Linkedin]: '',
                    [SocialPlatform.Twitter]: '',
                    [SocialPlatform.Website]: '',
                }

                if (basicInfo.socialLinks && basicInfo.socialLinks.length > 0) {
                    basicInfo.socialLinks.forEach((link) => {
                        socialLinksMap[link.platform] = link.url
                    })
                }

                setSocialLinks(socialLinksMap)
            }
        }

        fetchData()
    }, [dispatch, name, emailAddress])

    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value })

    const handleEdit = (section) => setEditSection(section)

    const handleSave = () => {
        if (editSection === 'basic') {
            const payload = {
                phone: userData.phone,
                dateOfBirth: userData.dateOfBirth,
                gender: userData.gender,
                region: userData.region,
            }

            dispatch(updateBasicInfo(payload))
        } else if (editSection === 'languages') {
            if (languages.length === 0) {
                alert('At least one language is required.')
                return
            }

            const payload = {
                languages: languages.map((lang) => ({
                    name: lang.name,
                    read: lang.read,
                    write: lang.write,
                })),
            }

            dispatch(updateBasicInfo(payload))
        } else if (editSection === 'skillsAndHobbies') {
            if (skillsAndHobbies.length === 0) {
                alert('At least one skill or hobby is required.')
                return
            }

            const payload = {
                skills: skillsAndHobbies,
            }

            dispatch(updateBasicInfo(payload))
        } else if (editSection === 'social') {
            const socialLinksArray = Object.entries(socialLinks)
                .filter(([_, url]) => url.trim() !== '')
                .map(([platform, url]) => ({
                    platform,
                    url,
                }))

            const payload = {
                socialLinks: socialLinksArray,
            }

            dispatch(updateBasicInfo(payload))
        }

        setEditSection(null)
    }

    const handleAddLanguage = () => {
        if (newLanguage.name.trim()) {
            setLanguages([...languages, newLanguage])
            setNewLanguage({
                name: '',
                read: LanguageExperties.Beginner,
                write: LanguageExperties.Beginner,
            })
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

    const handleSocialLinkChange = (platform, value) => {
        setSocialLinks({
            ...socialLinks,
            [platform]: value,
        })
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
                                    label={key.replace('dateOfBirth', 'Date of Birth')}
                                    type={key === 'dateOfBirth' ? 'date' : key === 'gender' ? 'select' : 'text'}
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
                                        {key.replace('dateOfBirth', 'Date of Birth')}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-gray-800">{userData[key] || 'Not provided'}</p>
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
                {languages.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {languages.map((lang, index) => (
                            <div
                                key={lang.name}
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
                ) : (
                    <p className="text-gray-600">No languages added yet.</p>
                )}
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
                                onChange={(e) =>
                                    setNewLanguage({
                                        ...newLanguage,
                                        read: e.target.value,
                                    })
                                }
                                className="border p-2 rounded-md w-1/2">
                                <option value={LanguageExperties.Beginner}>Read: Beginner</option>
                                <option value={LanguageExperties.Intermediate}>Read: Intermediate</option>
                                <option value={LanguageExperties.Expert}>Read: Expert</option>
                            </select>
                            <select
                                value={newLanguage.write}
                                onChange={(e) =>
                                    setNewLanguage({
                                        ...newLanguage,
                                        write: e.target.value,
                                    })
                                }
                                className="border p-2 rounded-md w-1/2">
                                <option value={LanguageExperties.Beginner}>Write: Beginner</option>
                                <option value={LanguageExperties.Intermediate}>Write: Intermediate</option>
                                <option value={LanguageExperties.Expert}>Write: Expert</option>
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
                {skillsAndHobbies.length > 0 ? (
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
                ) : (
                    <p className="text-gray-600">No skills or hobbies added yet.</p>
                )}
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
                    <div className="flex items-center space-x-2">
                        <FaGithub className="w-6 h-6 text-gray-600" />
                        {editSection === 'social' ? (
                            <input
                                type="text"
                                value={socialLinks[SocialPlatform.Github]}
                                onChange={(e) => handleSocialLinkChange(SocialPlatform.Github, e.target.value)}
                                className="border p-2 w-full rounded-md"
                                placeholder="https://github.com/username"
                            />
                        ) : socialLinks[SocialPlatform.Github] ? (
                            <a
                                href={socialLinks[SocialPlatform.Github]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                {socialLinks[SocialPlatform.Github]}
                            </a>
                        ) : (
                            <span className="text-gray-500">Not provided</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaLinkedin className="w-6 h-6 text-gray-600" />
                        {editSection === 'social' ? (
                            <input
                                type="text"
                                value={socialLinks[SocialPlatform.Linkedin]}
                                onChange={(e) => handleSocialLinkChange(SocialPlatform.Linkedin, e.target.value)}
                                className="border p-2 w-full rounded-md"
                                placeholder="https://linkedin.com/in/username"
                            />
                        ) : socialLinks[SocialPlatform.Linkedin] ? (
                            <a
                                href={socialLinks[SocialPlatform.Linkedin]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                {socialLinks[SocialPlatform.Linkedin]}
                            </a>
                        ) : (
                            <span className="text-gray-500">Not provided</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaTwitter className="w-6 h-6 text-gray-600" />
                        {editSection === 'social' ? (
                            <input
                                type="text"
                                value={socialLinks[SocialPlatform.Twitter]}
                                onChange={(e) => handleSocialLinkChange(SocialPlatform.Twitter, e.target.value)}
                                className="border p-2 w-full rounded-md"
                                placeholder="https://twitter.com/username"
                            />
                        ) : socialLinks[SocialPlatform.Twitter] ? (
                            <a
                                href={socialLinks[SocialPlatform.Twitter]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                {socialLinks[SocialPlatform.Twitter]}
                            </a>
                        ) : (
                            <span className="text-gray-500">Not provided</span>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaGlobe className="w-6 h-6 text-gray-600" />
                        {editSection === 'social' ? (
                            <input
                                type="text"
                                value={socialLinks[SocialPlatform.Website]}
                                onChange={(e) => handleSocialLinkChange(SocialPlatform.Website, e.target.value)}
                                className="border p-2 w-full rounded-md"
                                placeholder="https://yourwebsite.com"
                            />
                        ) : socialLinks[SocialPlatform.Website] ? (
                            <a
                                href={socialLinks[SocialPlatform.Website]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline">
                                {socialLinks[SocialPlatform.Website]}
                            </a>
                        ) : (
                            <span className="text-gray-500">Not provided</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
