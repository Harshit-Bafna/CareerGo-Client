import { useState } from 'react'
import { FaUniversity, FaCalendarAlt, FaClock } from 'react-icons/fa'

const BookCounselling = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        institution: initialData.institution || '',
        date: initialData.date || '',
        time: initialData.time || '',
        purpose: initialData.purpose || '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            ...formData,
            id: initialData.id || Math.random().toString(36).substr(2, 9),
            status: initialData.status || 'pending',
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-navy-blue mb-6">
                {initialData.id ? 'Reschedule Counseling Session' : 'Schedule Counseling Session'}
            </h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-6">
                <div className="space-y-2">
                    <label
                        htmlFor="institution"
                        className="block text-sm font-medium text-gray-700">
                        Institution <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                        <select
                            required
                            value={formData.institution}
                            disabled={!!initialData.id}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
                            <option value="">Select Institution</option>
                            <option value="VIT Bhopal">VIT Bhopal</option>
                            <option value="VIT Vellore">VIT Vellore</option>
                            <option value="VIT Chennai">VIT Chennai</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="time"
                            className="block text-sm font-medium text-gray-700">
                            Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FaClock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="purpose"
                        className="block text-sm font-medium text-gray-700">
                        Purpose of Meeting <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        required
                        value={formData.purpose}
                        disabled={!!initialData.id}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        rows={4}
                        placeholder="Please describe the purpose of your counseling session..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-deep-blue text-white py-3 px-6 rounded-md hover:bg-navy-blue transition-colors duration-200">
                    {initialData.id ? 'Reschedule Session' : 'Schedule Session'}
                </button>
            </form>
        </div>
    )
}

export default BookCounselling
