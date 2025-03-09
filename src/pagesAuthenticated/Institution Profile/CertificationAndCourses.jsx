import { useState } from 'react'
import { FaEdit, FaSave, FaPlus, FaTrash } from 'react-icons/fa'

const Input = ({ name, value, onChange, placeholder, type = 'text', required = false, label }) => (
    <div className="flex flex-col space-y-1">
        <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 flex items-center">
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={name}
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

const CertificationAndCourses = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [certifications, setCertifications] = useState([
        {
            id: 1,
            title: 'AWS Certified Developer',
            issuedBy: 'Amazon',
            startDate: '2022-01-10',
            endDate: '2022-06-10',
            expiryDate: '2025-01-10',
        },
        {
            id: 2,
            title: 'Google Cloud Associate',
            issuedBy: 'Google',
            startDate: '2023-03-05',
            endDate: '2023-08-20',
            expiryDate: '',
        },
    ])

    const [newCertification, setNewCertification] = useState({
        id: 0,
        title: '',
        issuedBy: '',
        startDate: '',
        endDate: '',
        expiryDate: '',
    })

    const toggleEdit = () => setIsEditing(!isEditing)

    const handleChange = (e, id) => {
        const { name, value } = e.target
        setCertifications((prev) => prev.map((cert) => (cert.id === id ? { ...cert, [name]: value } : cert)))
    }

    const handleAddCertification = (e) => {
        e.preventDefault()
        if (newCertification.title && newCertification.issuedBy && newCertification.startDate && newCertification.endDate) {
            setCertifications([...certifications, { ...newCertification, id: Date.now() }])
            setNewCertification({ id: 0, title: '', issuedBy: '', startDate: '', endDate: '', expiryDate: '' })
        }
    }

    const handleRemoveCertification = (id) => {
        setCertifications((prev) => prev.filter((cert) => cert.id !== id))
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Certifications & Courses</h2>
                <button
                    onClick={toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition">
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
            <div className="space-y-6">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="relative pl-6 border-l-2 border-gray-200">
                        <div className="absolute -left-2 w-3 h-3 bg-blue-600 rounded-full" />
                        {isEditing ? (
                            <div className="space-y-2">
                                <Input
                                    name="title"
                                    value={cert.title}
                                    onChange={(e) => handleChange(e, cert.id)}
                                    placeholder="Title"
                                    required
                                    label="Title"
                                />
                                <Input
                                    name="issuedBy"
                                    value={cert.issuedBy}
                                    onChange={(e) => handleChange(e, cert.id)}
                                    placeholder="Issued By"
                                    required
                                    label="Issued By"
                                />
                                <Input
                                    name="startDate"
                                    type="date"
                                    value={cert.startDate}
                                    onChange={(e) => handleChange(e, cert.id)}
                                    placeholder="Start Date"
                                    required
                                    label="Start Date"
                                />
                                <Input
                                    name="endDate"
                                    type="date"
                                    value={cert.endDate}
                                    onChange={(e) => handleChange(e, cert.id)}
                                    placeholder="End Date"
                                    required
                                    label="End Date"
                                />
                                <Input
                                    name="expiryDate"
                                    type="date"
                                    value={cert.expiryDate}
                                    onChange={(e) => handleChange(e, cert.id)}
                                    placeholder="Expiry Date (Optional)"
                                    label="Expiry Date"
                                />
                                <button
                                    onClick={() => handleRemoveCertification(cert.id)}
                                    className="text-red-500 hover:text-red-600">
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800">{cert.title}</h3>
                                <p className="text-gray-600">Issued by: {cert.issuedBy}</p>
                                <p className="text-sm text-gray-500">
                                    Duration: {cert.startDate} - {cert.endDate}
                                </p>
                                {cert.expiryDate && <p className="text-sm text-gray-600">Expiry Date: {cert.expiryDate}</p>}
                            </>
                        )}
                    </div>
                ))}
            </div>
            {isEditing && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Certification</h3>
                    <div className="space-y-2">
                        <Input
                            name="title"
                            value={newCertification.title}
                            onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                            placeholder="Title"
                            required
                            label="Title"
                        />
                        <Input
                            name="issuedBy"
                            value={newCertification.issuedBy}
                            onChange={(e) => setNewCertification({ ...newCertification, issuedBy: e.target.value })}
                            placeholder="Issued By"
                            required
                            label="Issued By"
                        />
                        <Input
                            name="startDate"
                            type="date"
                            value={newCertification.startDate}
                            onChange={(e) => setNewCertification({ ...newCertification, startDate: e.target.value })}
                            placeholder="Start Date"
                            required
                            label="Start Date"
                        />
                        <Input
                            name="endDate"
                            type="date"
                            value={newCertification.endDate}
                            onChange={(e) => setNewCertification({ ...newCertification, endDate: e.target.value })}
                            placeholder="End Date"
                            required
                            label="End Date"
                        />
                        <Input
                            name="expiryDate"
                            type="date"
                            value={newCertification.expiryDate}
                            onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })}
                            placeholder="Expiry Date (Optional)"
                            label="Expiry Date"
                        />
                        <button
                            onClick={handleAddCertification}
                            className="flex items-center text-blue-600 hover:text-blue-800 transition">
                            <FaPlus className="w-4 h-4 mr-2" /> Add Certification
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CertificationAndCourses
