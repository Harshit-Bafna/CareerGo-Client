import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    FaVideo,
    FaCalendarAlt,
    FaClock,
    FaUniversity,
    FaRegCalendarCheck,
    FaRegCalendarAlt,
    FaRegCalendarTimes,
    FaRegClock,
    FaExternalLinkAlt,
    FaCheck,
    FaTimes,
    FaSpinner,
} from 'react-icons/fa'
import { MdCancel, MdDoneAll } from 'react-icons/md'
import {
    GetCounsellingSessions,
    RescheduleCounsellingSession,
    ApproveOrRejectCounsellingSession,
    CancelCounsellingSession,
    CompleteCounsellingSession,
} from '../../store/slices/counsellingSlice'
import { useNavigate } from 'react-router-dom'

const ViewCounselling = () => {
    const EUserRole = {
        MASTER_ADMIN: 'Master Admin',
        MANAGER: 'Manager',
        ADMIN: 'Admin',
        USER: 'User',
        Institution_ADMIN: 'Organisation Admin',
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Upcoming')
    const [hoveredTab, setHoveredTab] = useState(null)
    const { role, userId, institutionId } = useSelector((state) => state.user)
    const [sessions, setSessions] = useState({
        Upcoming: [],
        Cancelled: [],
        Rejected: [],
        Completed: [],
    })
    const [isLoading, setIsLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(null)
    const [showApprovalModal, setShowApprovalModal] = useState(false)
    const [approvalData, setApprovalData] = useState({
        counsellingId: null,
        approval: true,
        disapprovalReason: '',
    })
    const [showRescheduleModal, setShowRescheduleModal] = useState(false)
    const [rescheduleData, setRescheduleData] = useState({
        counsellingId: null,
        newDate: '',
        newTime: '',
    })
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        type: null,
        sessionId: null,
        title: '',
        message: '',
    })

    const statusMapping = {
        'Approval Pending': 'Upcoming',
        Approved: 'Upcoming',
        Scheduled: 'Upcoming',
        Rejected: 'Rejected',
        Cancelled: 'Cancelled',
        Completed: 'Completed',
    }

    const fetchSessions = async (tabStatus = '') => {
        setIsLoading(true)
        try {
            const params = { status: tabStatus || '' }

            if (role === EUserRole.Institution_ADMIN) {
                params.institutionId = institutionId
                params.userId = ''
            } else {
                params.userId = userId
                params.institutionId = ''
            }

            const response = await dispatch(GetCounsellingSessions(params)).unwrap()

            if (response.success) {
                const categorizedSessions = {
                    Upcoming: [],
                    Cancelled: [],
                    Rejected: [],
                    Completed: [],
                }

                response.data.forEach((session) => {
                    const category = statusMapping[session.status] || 'Upcoming'
                    categorizedSessions[category].push({
                        id: session._id,
                        userId: session.userId?._id,
                        userName: session.userId?.name,
                        institution: session.institutionId?.institutionName,
                        institutionId: session.institutionId?._id,
                        purpose: session.purpose,
                        date: session.date,
                        formattedDate: new Date(session.date).toLocaleDateString(),
                        time: session.time,
                        status: session.status,
                        meetingLink: session.meetingURL,
                        isApproved: session.isApproved,
                        diApprovalReason: session.diApprovalReason,
                        createdAt: session.createdAt,
                        updatedAt: session.updatedAt,
                    })
                })

                setSessions(categorizedSessions)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSessions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userId, institutionId, role])

    const icons = {
        Upcoming: <FaRegCalendarAlt className="text-lg" />,
        Cancelled: <FaRegCalendarTimes className="text-lg" />,
        Rejected: <MdCancel className="text-lg" />,
        Completed: <FaRegCalendarCheck className="text-lg" />,
    }

    const getStatusBadge = (status) => {
        const colors = {
            Approved: 'bg-green-100 text-green-800 border-green-200',
            Scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
            'Approval Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            Rejected: 'bg-red-100 text-red-800 border-red-200',
            Cancelled: 'bg-red-100 text-red-800 border-red-200',
            Completed: 'bg-blue-100 text-blue-800 border-blue-200',
        }

        return `${colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'} px-3 py-1 rounded-full text-xs font-medium border`
    }

    const handleRescheduleClick = (session) => {
        if (showRescheduleModal) return

        setRescheduleData({
            counsellingId: session.id,
            newDate: new Date(session.date).toISOString().split('T')[0],
            newTime: session.time,
        })
        setShowRescheduleModal(true)
    }

    const handleRescheduleSubmit = async (e) => {
        e.preventDefault()

        if (!rescheduleData.newDate || !rescheduleData.newTime) return

        setActionLoading('reschedule')
        try {
            const payload = {
                counsellingId: rescheduleData.counsellingId,
                Payload: {
                    newDate: rescheduleData.newDate,
                    newTime: rescheduleData.newTime,
                },
            }

            const response = await dispatch(RescheduleCounsellingSession(payload)).unwrap()

            if (response.success) {
                setShowRescheduleModal(false)
                fetchSessions()
            }
        } finally {
            setActionLoading(null)
        }
    }

    const handleApproveRejectClick = (session, initialApproval = true) => {
        if (showApprovalModal) return

        setApprovalData({
            counsellingId: session.id,
            approval: initialApproval,
            disapprovalReason: '',
        })
        setShowApprovalModal(true)
    }

    const handleApproveRejectSubmit = async (e) => {
        e.preventDefault()

        if (!approvalData.approval && !approvalData.disapprovalReason.trim()) {
            return
        }

        setActionLoading('approval')
        try {
            const payload = {
                counsellingId: approvalData.counsellingId,
                Payload: {
                    approval: approvalData.approval,
                    disapprovalReason: approvalData.disapprovalReason,
                },
            }

            const response = await dispatch(ApproveOrRejectCounsellingSession(payload)).unwrap()

            if (response.success) {
                setShowApprovalModal(false)
                fetchSessions()
            }
        } finally {
            setActionLoading(null)
        }
    }

    const handleCancelClick = (session) => {
        setConfirmModal({
            show: true,
            type: 'cancel',
            sessionId: session.id,
            title: 'Cancel Counselling Session',
            message: 'Are you sure you want to cancel this counselling session? This action cannot be undone.',
        })
    }

    const handleCompleteClick = (session) => {
        setConfirmModal({
            show: true,
            type: 'complete',
            sessionId: session.id,
            title: 'Complete Counselling Session',
            message: 'Are you sure you want to mark this session as completed? This action cannot be undone.',
        })
    }

    const handleConfirmAction = async () => {
        setActionLoading(confirmModal.type)
        try {
            let response

            if (confirmModal.type === 'cancel') {
                response = await dispatch(CancelCounsellingSession({ counsellingId: confirmModal.sessionId })).unwrap()
            } else if (confirmModal.type === 'complete') {
                response = await dispatch(CompleteCounsellingSession({ counsellingId: confirmModal.sessionId })).unwrap()
            }

            if (response?.success) {
                setConfirmModal({ show: false, type: null, sessionId: null, title: '', message: '' })
                fetchSessions()
            }
        } finally {
            setActionLoading(null)
        }
    }

    const formatDate = (dateString) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleBookNewSession = () => {
        navigate('/dashboard/bookCounselling')
    }

    const isSessionDatePassed = (dateString, timeString) => {
        const sessionDate = new Date(dateString)
        const [hours, minutes] = timeString.split(':').map(Number)
        sessionDate.setHours(hours, minutes, 0, 0)
        return sessionDate < new Date()
    }

    const getSessionActions = (session) => {
        const actions = []
        const isPastSession = isSessionDatePassed(session.date, session.time)

        if (role === EUserRole.Institution_ADMIN) {
            if (['Approval Pending', 'Approved'].includes(session.status) && !isPastSession) {
                actions.push({
                    label: 'Reschedule',
                    icon: <FaRegCalendarAlt className="text-xs" />,
                    onClick: () => handleRescheduleClick(session),
                    className: 'border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white',
                })
            }

            if (session.status !== 'Completed') {
                if (session.status === 'Approval Pending') {
                    actions.push({
                        label: 'Approve',
                        icon: <FaCheck className="text-xs" />,
                        onClick: () => handleApproveRejectClick(session, true),
                        className: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
                    })

                    actions.push({
                        label: 'Reject',
                        icon: <FaTimes className="text-xs" />,
                        onClick: () => handleApproveRejectClick(session, false),
                        className: 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
                    })
                }
            }

            if (session.status === 'Approved' && isPastSession) {
                actions.push({
                    label: 'Mark Complete',
                    icon: <MdDoneAll className="text-xs" />,
                    onClick: () => handleCompleteClick(session),
                    className: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
                })
            }
        } else {
            if (['Approval Pending', 'Approved'].includes(session.status) && !isPastSession) {
                actions.push({
                    label: 'Reschedule',
                    icon: <FaRegCalendarAlt className="text-xs" />,
                    onClick: () => handleRescheduleClick(session),
                    className: 'border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white',
                })

                if (session.status === 'Approval Pending') {
                    actions.push({
                        label: 'Cancel',
                        icon: <MdCancel className="text-xs" />,
                        onClick: () => handleCancelClick(session),
                        className: 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
                    })
                }
            }
        }

        return actions
    }

    return (
        <div className="bg-background-light py-8 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-navy-blue">Counselling Sessions</h1>
                    {role !== EUserRole.Institution_ADMIN && (
                        <button
                            onClick={handleBookNewSession}
                            className="bg-deep-blue text-white px-5 py-2.5 rounded-md hover:bg-navy-blue transition-colors duration-200 flex items-center gap-2 shadow-sm">
                            <FaRegCalendarAlt />
                            <span>Book New Session</span>
                        </button>
                    )}
                </div>

                <div className="hidden md:flex border-b border-border-light mb-6">
                    {Object.keys(sessions).map((tab) => (
                        <button
                            key={tab}
                            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors duration-200
                ${activeTab === tab ? 'border-b-2 border-deep-blue text-deep-blue' : 'text-dark-gray hover:text-navy-blue hover:bg-gray-50'}`}
                            onClick={() => setActiveTab(tab)}>
                            {icons[tab]}
                            <span className="ml-2">{tab}</span>
                            <span className="ml-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">{sessions[tab].length}</span>
                        </button>
                    ))}
                </div>

                <div className="flex justify-center md:hidden border-b border-border-light mb-6 space-x-6">
                    {Object.keys(sessions).map((tab) => (
                        <div
                            key={tab}
                            className="relative group"
                            onMouseEnter={() => setHoveredTab(tab)}
                            onMouseLeave={() => setHoveredTab(null)}>
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`flex flex-col items-center p-3 rounded-md transition-colors duration-200
                  ${activeTab === tab ? 'text-deep-blue bg-gray-100' : 'text-dark-gray hover:bg-gray-50'}`}>
                                {icons[tab]}
                                <span className="text-xs mt-1">{sessions[tab].length}</span>
                            </button>

                            {hoveredTab === tab && (
                                <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md z-10">
                                    {tab}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deep-blue"></div>
                    </div>
                ) : sessions[activeTab].length > 0 ? (
                    <div className="space-y-4">
                        {sessions[activeTab].map((session) => (
                            <div
                                key={session.id}
                                className="bg-white p-6 rounded-lg shadow-input-shadow transition-all duration-200 hover:shadow-md">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="p-3 bg-light-gray rounded-full flex-shrink-0">
                                            <FaUniversity className="text-2xl text-navy-blue" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-navy-blue">{session.institution}</h3>
                                            {role === EUserRole.Institution_ADMIN && session.userName && (
                                                <p className="text-sm text-deep-blue mt-1">Student: {session.userName}</p>
                                            )}
                                            <p className="text-sm text-dark-gray mt-1">{session.purpose}</p>
                                        </div>
                                    </div>
                                    <span className={`${getStatusBadge(session.status)}`}>{session.status}</span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                                    <div className="flex items-center space-x-2 text-dark-gray">
                                        <FaCalendarAlt className="text-deep-blue" />
                                        <span>{formatDate(session.date)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-dark-gray">
                                        <FaClock className="text-deep-blue" />
                                        <span>{session.time}</span>
                                    </div>
                                </div>

                                {session.diApprovalReason && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md text-sm text-red-700">
                                        <strong>Reason for rejection:</strong> {session.diApprovalReason}
                                    </div>
                                )}

                                {session.meetingLink && (
                                    <div className="flex items-center space-x-2 text-deep-blue mb-4">
                                        <FaVideo />
                                        <a
                                            href={session.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline flex items-center">
                                            Join Meeting <FaExternalLinkAlt className="ml-1 text-xs" />
                                        </a>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 mt-4">
                                    {getSessionActions(session).map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={action.onClick}
                                            disabled={actionLoading !== null}
                                            className={`px-4 py-2 text-sm border rounded-md transition-colors duration-200 flex items-center gap-2 ${action.className}`}>
                                            {action.icon}
                                            <span>{action.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                        <FaRegClock className="mx-auto text-6xl text-gray-200 mb-4" />
                        <h3 className="text-xl font-medium text-dark-gray mb-2">No {activeTab.toLowerCase()} sessions found</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            {activeTab === 'Upcoming'
                                ? "When you book a counseling session, you'll see your schedule here."
                                : `You don't have any ${activeTab.toLowerCase()} counseling sessions.`}
                        </p>
                        {activeTab !== 'Upcoming' && (
                            <button
                                onClick={() => setActiveTab('Upcoming')}
                                className="mt-6 px-4 py-2 text-sm bg-deep-blue text-white rounded-md hover:bg-navy-blue transition-colors duration-200">
                                View Upcoming Sessions
                            </button>
                        )}
                    </div>
                )}
            </div>

            {showRescheduleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-navy-blue mb-4">Reschedule Session</h3>
                        <form onSubmit={handleRescheduleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="newDate"
                                        className="block text-sm font-medium text-gray-700 mb-1">
                                        New Date
                                    </label>
                                    <div className="relative">
                                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            id="newDate"
                                            type="date"
                                            value={rescheduleData.newDate}
                                            onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="newTime"
                                        className="block text-sm font-medium text-gray-700 mb-1">
                                        New Time
                                    </label>
                                    <div className="relative">
                                        <FaClock className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            id="newTime"
                                            type="time"
                                            value={rescheduleData.newTime}
                                            onChange={(e) => setRescheduleData({ ...rescheduleData, newTime: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowRescheduleModal(false)}
                                    disabled={actionLoading === 'reschedule'}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading === 'reschedule'}
                                    className="px-4 py-2 bg-deep-blue text-white rounded-md hover:bg-navy-blue flex items-center">
                                    {actionLoading === 'reschedule' ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Rescheduling...
                                        </>
                                    ) : (
                                        'Reschedule'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showApprovalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-navy-blue mb-4">{approvalData.approval ? 'Approve Session' : 'Reject Session'}</h3>
                        <form onSubmit={handleApproveRejectSubmit}>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => setApprovalData({ ...approvalData, approval: true })}
                                        className={`flex-1 py-2 px-4 rounded-md border ${
                                            approvalData.approval ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 text-gray-700'
                                        }`}>
                                        Approve
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setApprovalData({ ...approvalData, approval: false })}
                                        className={`flex-1 py-2 px-4 rounded-md border ${
                                            !approvalData.approval ? 'bg-red-50 border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                                        }`}>
                                        Reject
                                    </button>
                                </div>

                                {!approvalData.approval && (
                                    <div>
                                        <label
                                            htmlFor="rejectionReason"
                                            className="block text-sm font-medium text-gray-700 mb-1">
                                            Reason for Rejection <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            value={approvalData.disapprovalReason}
                                            onChange={(e) => setApprovalData({ ...approvalData, disapprovalReason: e.target.value })}
                                            id="rejectionReason"
                                            className="w-full p-3 border border-gray-300 rounded-md"
                                            rows={3}
                                            placeholder="Please provide a reason for rejection"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowApprovalModal(false)}
                                    disabled={actionLoading === 'approval'}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading === 'approval'}
                                    className={`px-4 py-2 rounded-md text-white flex items-center ${
                                        approvalData.approval ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                    }`}>
                                    {actionLoading === 'approval' ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : approvalData.approval ? (
                                        'Confirm Approval'
                                    ) : (
                                        'Confirm Rejection'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmModal.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-navy-blue mb-2">{confirmModal.title}</h3>
                        <p className="text-gray-600 mb-6">{confirmModal.message}</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmModal({ ...confirmModal, show: false })}
                                disabled={actionLoading === confirmModal.type}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAction}
                                disabled={actionLoading === confirmModal.type}
                                className={`px-4 py-2 rounded-md text-white flex items-center ${
                                    confirmModal.type === 'cancel' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                }`}>
                                {actionLoading === confirmModal.type ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : confirmModal.type === 'cancel' ? (
                                    'Confirm Cancellation'
                                ) : (
                                    'Mark as Completed'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ViewCounselling
