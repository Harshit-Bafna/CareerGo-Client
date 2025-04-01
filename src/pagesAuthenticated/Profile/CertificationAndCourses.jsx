import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import { getCertification, createCertification, updateCertification, deleteCertification } from '../../store/slices/userSlice'

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

const CertificationAndCourses = () => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [certifications, setCertifications] = useState([])
    const [newCertification, setNewCertification] = useState({
        title: '',
        fields: {
            issuedBy: '',
            startDate: '',
            endDate: '',
            expiryDate: '',
        },
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [editingCertification, setEditingCertification] = useState(null)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [certificationToDelete, setCertificationToDelete] = useState(null)

    const loading = useSelector((state) => state.user?.loading) || isLoading
    const apiError = useSelector((state) => state.user?.error)

    useEffect(() => {
        fetchCertifications()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const fetchCertifications = async () => {
        setIsLoading(true)
        try {
            const result = await dispatch(getCertification()).unwrap()
            if (result.success) {
                const formattedCertifications = result.data.certifications.map((cert) => ({
                    id: cert._id,
                    title: cert.title,
                    fields: {
                        issuedBy: cert.issuedBy || '',
                        startDate: cert.startDate ? cert.startDate.substring(0, 10) : '',
                        endDate: cert.endDate ? cert.endDate.substring(0, 10) : '',
                        expiryDate: cert.expiryDate ? cert.expiryDate.substring(0, 10) : '',
                    },
                }))

                setCertifications(formattedCertifications)
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch certification data')
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        setEditingCertification(null)
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target
        setNewCertification((prev) => ({
            ...prev,
            fields: { ...prev.fields, [name]: value },
        }))
        setError('')
    }

    const validateFields = (certification) => {
        const { title, fields } = certification

        if (!title) {
            setError('Title is required')
            return false
        }

        if (!fields.issuedBy) {
            setError('Issuing organization is required')
            return false
        }

        if (!fields.startDate) {
            setError('Start date is required')
            return false
        }

        if (!fields.endDate) {
            setError('End date is required')
            return false
        }

        return true
    }

    const prepareCertificationPayload = (certification) => {
        const { title, fields } = certification

        const payload = {
            title: title,
            issuedBy: fields.issuedBy,
            startDate: fields.startDate,
            endDate: fields.endDate || null,
            expiryDate: fields.expiryDate || null,
        }

        return payload
    }

    const handleAddCertification = async () => {
        if (validateFields(newCertification)) {
            try {
                const payload = prepareCertificationPayload(newCertification)
                const result = await dispatch(createCertification(payload)).unwrap()

                if (result.success) {
                    await fetchCertifications()
                    setNewCertification({
                        title: '',
                        fields: {
                            issuedBy: '',
                            startDate: '',
                            endDate: '',
                            expiryDate: '',
                        },
                    })
                    setError('')
                }
            } catch (err) {
                setError(err.message || 'Failed to add certification')
            }
        }
    }

    const startEditCertification = (certification) => {
        setEditingCertification(certification.id)
        setNewCertification({
            id: certification.id,
            title: certification.title,
            fields: { ...certification.fields },
        })
    }

    const cancelEditCertification = () => {
        setEditingCertification(null)
        setNewCertification({
            title: '',
            fields: {
                issuedBy: '',
                startDate: '',
                endDate: '',
                expiryDate: '',
            },
        })
    }

    const handleUpdateCertification = async () => {
        if (validateFields(newCertification)) {
            try {
                const payload = {
                    ...prepareCertificationPayload(newCertification),
                    certificationId: newCertification.id,
                }

                const result = await dispatch(updateCertification(payload)).unwrap()

                if (result.success) {
                    await fetchCertifications()
                    setEditingCertification(null)
                    setNewCertification({
                        title: '',
                        fields: {
                            issuedBy: '',
                            startDate: '',
                            endDate: '',
                            expiryDate: '',
                        },
                    })
                }
            } catch (err) {
                setError(err.message || 'Failed to update certification')
            }
        }
    }

    const handleRemoveCertification = async () => {
        if (certificationToDelete) {
            try {
                await dispatch(deleteCertification({ certificationId: certificationToDelete })).unwrap()
                await fetchCertifications()
                setConfirmDialogOpen(false)
                setCertificationToDelete(null)
            } catch (err) {
                setError(err.message || 'Failed to delete certification')
            }
        }
    }

    const openDeleteConfirmation = (id) => {
        setCertificationToDelete(id)
        setConfirmDialogOpen(true)
    }

    const renderCertificationForm = (certification, isNew = true) => {
        return (
            <div className="space-y-4">
                <Input
                    label="Title"
                    name="title"
                    value={certification.title}
                    onChange={(e) => {
                        if (isNew) {
                            setNewCertification({ ...certification, title: e.target.value })
                        } else {
                            setNewCertification({ ...certification, title: e.target.value })
                        }
                    }}
                    placeholder="Certification Title"
                />

                <Input
                    label="Issuing Organization"
                    name="issuedBy"
                    value={certification.fields.issuedBy}
                    onChange={handleFieldChange}
                    placeholder="Issuing Organization"
                />

                <Input
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={certification.fields.startDate}
                    onChange={handleFieldChange}
                    placeholder="Start Date"
                />

                <Input
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={certification.fields.endDate}
                    onChange={handleFieldChange}
                    placeholder="End Date"
                    required={true}
                />

                <Input
                    label="Expiry Date"
                    name="expiryDate"
                    type="date"
                    value={certification.fields.expiryDate}
                    onChange={handleFieldChange}
                    placeholder="Expiry Date"
                    required={false}
                />

                {isNew ? (
                    <button
                        onClick={handleAddCertification}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        <FaPlus className="w-4 h-4 mr-2" /> Add Certification
                    </button>
                ) : (
                    <div className="flex space-x-2">
                        <button
                            onClick={handleUpdateCertification}
                            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            <FaSave className="w-4 h-4 mr-2" /> Save Changes
                        </button>
                        <button
                            onClick={cancelEditCertification}
                            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        )
    }

    if (loading && certifications.length === 0) {
        return <div className="bg-white rounded-xl shadow-lg p-6">Loading certification data...</div>
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Certifications & Courses</h2>
                <button
                    onClick={toggleEdit}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition">
                    {isEditing ? <FaSave className="w-4 h-4 mr-2" /> : <FaEdit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Done' : 'Edit'}
                </button>
            </div>

            {(error || apiError) && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error || apiError}</div>}

            {isEditing && !editingCertification && (
                <div className="mt-6 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Certification</h3>
                    {renderCertificationForm(newCertification, true)}
                </div>
            )}

            <div className="space-y-6 mt-6">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="relative pl-6 border-l-2 border-gray-200 pb-4">
                        <div className="absolute -left-2 w-3 h-3 bg-blue-600 rounded-full" />

                        {editingCertification === cert.id ? (
                            <div className="mt-2">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Certification</h3>
                                {renderCertificationForm(newCertification, false)}
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800">{cert.title}</h3>
                                <p className="text-gray-600">Issued by: {cert.fields.issuedBy}</p>
                                <p className="text-gray-600">
                                    Duration: {cert.fields.startDate} to {cert.fields.endDate || 'Present'}
                                </p>
                                {cert.fields.expiryDate && <p className="text-gray-600">Expiry Date: {cert.fields.expiryDate}</p>}

                                {isEditing && (
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => startEditCertification(cert)}
                                            className="text-blue-500 hover:text-blue-600">
                                            <FaEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => openDeleteConfirmation(cert.id)}
                                            className="text-red-500 hover:text-red-600">
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}

                {certifications.length === 0 && !isEditing && (
                    <div className="text-center py-6 text-gray-500">
                        No certification records found. Click Edit to add your certification details.
                    </div>
                )}
            </div>
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleRemoveCertification}
            />
        </div>
    )
}

export default CertificationAndCourses
