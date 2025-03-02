import { useState } from 'react'
import { FaVideo, FaCalendarAlt, FaClock, FaUniversity, FaRegCalendarCheck, FaRegCalendarAlt, FaRegCalendarTimes, FaRegClock } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { useBtnNavigation } from '../../utils/helper/syncHelper'

const ViewCounselling = () => {
    const [activeTab, setActiveTab] = useState('Upcoming')
    const [hoveredTab, setHoveredTab] = useState(null)
    const [sessions, setSessions] = useState({
        Upcoming: [
            {
                id: 1,
                institution: 'VIT Bhopal',
                purpose: 'Purpose',
                date: '2025-02-14',
                time: '11:57',
                status: 'Pending',
                meetingLink: 'https://www.jiosaavn.com/me',
            },
            { id: 2, institution: 'VIT Bhopal', purpose: 'Purpose', date: '2025-02-14', time: '11:57', status: 'Upcoming' },
            { id: 3, institution: 'VIT Bhopal', purpose: 'Purpose', date: '2025-02-14', time: '11:57', status: 'Pending' },
        ],
        Cancelled: [],
        Rejected: [{ id: 4, institution: 'VIT Bhopal', purpose: 'Purpose', date: '2025-02-14', time: '11:57', status: 'Rejected' }],
        Completed: [],
    })

    const icons = {
        Upcoming: <FaRegCalendarAlt />,
        Cancelled: <FaRegCalendarTimes />,
        Rejected: <MdCancel />,
        Completed: <FaRegCalendarCheck />,
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Upcoming':
                return 'text-green-600'
            case 'Pending':
                return 'text-gold'
            case 'Rejected':
                return 'text-red-600'
            case 'Cancelled':
                return 'text-red-600'
            default:
                return 'text-dark-gray'
        }
    }


    const handleReschedule = () => {
        //reschedule logic
    }

    const handleCancel = (sessionId) => {
        setSessions((prev) => {
            const updatedUpcoming = prev.Upcoming.filter((session) => session.id !== sessionId)
            const cancelledSession = prev.Upcoming.find((session) => session.id === sessionId)
            if (cancelledSession) cancelledSession.status = 'Cancelled'
            return {
                ...prev,
                Upcoming: updatedUpcoming,
                Cancelled: cancelledSession ? [...prev.Cancelled, cancelledSession] : prev.Cancelled,
            }
        })
    }

    return (
        <div className="bg-background-light py-8 min-h-screen">
            <div className="max-w-5xl mx-auto px-6">
                <button
                    onClick={useBtnNavigation('/dashboard/bookCounselling')}
                    className="bg-deep-blue text-white px-6 py-2 rounded-md hover:bg-navy-blue transition-colors duration-200">
                    Book New Session
                </button>

                <div className="hidden md:flex border-b border-border-light my-6">
                    {Object.keys(sessions).map((tab) => (
                        <button
                            key={tab}
                            className={`flex items-center space-x-2 px-6 py-4 ${activeTab === tab ? 'border-b-2 border-deep-blue text-deep-blue' : 'text-dark-gray'}`}
                            onClick={() => setActiveTab(tab)}>
                            {icons[tab]}
                            <span>{tab.toUpperCase()}</span>
                        </button>
                    ))}
                </div>

                <div className="flex justify-center md:hidden border-b border-border-light my-6 space-x-6">
                    {Object.keys(sessions).map((tab) => (
                        <div
                            key={tab}
                            className="relative group"
                            onMouseEnter={() => setHoveredTab(tab)}
                            onMouseLeave={() => setHoveredTab(null)}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center space-x-2 px-6 py-4 ${activeTab === tab ? 'text-deep-blue bg-gray-200' : 'text-dark-gray'}`}>
                                {icons[tab]}
                            </button>

                            {hoveredTab === tab && (
                                <div className="absolute left-1/2 -translate-x-1/2 -top-5 bg-black opacity-40 text-white text-xs px-3 py-1 rounded-md shadow-md">
                                    {tab.toUpperCase()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {sessions[activeTab].length > 0 ? (
                    sessions[activeTab].map((session) => (
                        <div
                            key={session.id}
                            className="bg-white p-6 rounded-lg shadow-input-shadow my-4">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 bg-light-gray rounded-full">
                                        <FaUniversity className="text-2xl text-navy-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-navy-blue">{session.institution}</h3>
                                        <p className="text-sm text-dark-gray">{session.purpose}</p>
                                    </div>
                                </div>
                                <span className={`capitalize font-medium ${getStatusColor(session.status)}`}>{session.status}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center items-start sm:justify-start justify-center gap-4 mb-4">
                                <div className="flex items-center space-x-2 text-dark-gray">
                                    <FaCalendarAlt />
                                    <span>{session.date}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-dark-gray">
                                    <FaClock />
                                    <span>{session.time}</span>
                                </div>
                            </div>

                            {session.meetingLink && (
                                <div className="flex items-center space-x-2 text-deep-blue mb-4">
                                    <FaVideo />
                                    <a
                                        href={session.meetingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline">
                                        Join Meeting
                                    </a>
                                </div>
                            )}

                            <div className="flex space-x-4">
                                {['Pending', 'Upcoming'].includes(session.status) && (
                                    <>
                                        <button
                                            onClick={() => handleReschedule()}
                                            className="px-4 py-2 text-sm border border-deep-blue text-deep-blue rounded hover:bg-deep-blue hover:text-white transition-colors duration-200">
                                            Reschedule
                                        </button>
                                        <button
                                            onClick={() => handleCancel(session.id)}
                                            className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200">
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <FaRegClock className="mx-auto text-6xl text-gray-200 mb-4" />
                        <h3 className="text-xl font-medium text-dark-gray mb-2">Looks empty, you have no {activeTab} bookings</h3>
                        <p className="text-gray-400">When you book a counseling session, you will see your schedule here.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewCounselling
