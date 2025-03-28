import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaUniversity } from 'react-icons/fa'
import { getAllInstitutions } from '../../store/slices/institutionSlice'
import InstitutionCard from './Components/InstitutionCard'
import Pagination from './Components/Pagination'
import Filters from './Components/Filters'

const Institution = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [institutions, setInstitutions] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [minFeesRange, setMinFeesRange] = useState('')
    const [maxFeesRange, setMaxFeesRange] = useState('')
    const [hostel, setHostel] = useState('')
    const [admission, setAdmission] = useState('')
    const [courseCategory, setCourseCategory] = useState('')

    useEffect(() => {
        fetchInstitutions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, hostel, admission, courseCategory])

    const fetchInstitutions = async () => {
        setLoading(true)
        setError(null)

        try {
            const result = await dispatch(
                getAllInstitutions({
                    search,
                    page,
                    limit,
                    minFeesRange,
                    maxFeesRange,
                    hostel,
                    admission,
                    courseCategory,
                })
            ).unwrap()

            if (result && result.data) {
                setInstitutions(result.data.institutions || [])
                setTotalCount(result.data.totalCount || 0)
            } else {
                setInstitutions([])
                setTotalCount(0)
                setError('No data received from server')
            }
        } catch (err) {
            setInstitutions([])
            setTotalCount(0)
            setError(err?.message || 'Failed to fetch institutions')
        } finally {
            setLoading(false)
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setPage(1)
        fetchInstitutions()
    }

    const handleViewDetails = (institutionId) => {
        navigate(`/dashboard/institution/${institutionId}`)
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const handleFilterChange = (filterType, value) => {
        setPage(1)

        switch (filterType) {
            case 'minFeesRange':
                setMinFeesRange(value)
                break
            case 'maxFeesRange':
                setMaxFeesRange(value)
                break
            case 'hostel':
                setHostel(value)
                break
            case 'admission':
                setAdmission(value)
                break
            case 'courseCategory':
                setCourseCategory(value)
                break
            default:
                break
        }
    }

    const handleApplyFeeFilter = () => {
        fetchInstitutions()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-navy-blue mb-8">Institutions</h1>

            <form
                onSubmit={handleSearchSubmit}
                className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search institutions..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full p-3 pl-10 border border-border-light rounded-lg shadow-input-shadow focus:outline-none focus:ring-2 focus:ring-deep-blue"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-navy-blue text-white p-2 rounded-md">
                        <FaSearch />
                    </button>
                    <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-gray" />
                </div>
            </form>

            <Filters
                minFeesRange={minFeesRange}
                maxFeesRange={maxFeesRange}
                hostel={hostel}
                admission={admission}
                courseCategory={courseCategory}
                onFilterChange={handleFilterChange}
                onApplyFeeFilter={handleApplyFeeFilter}
            />

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-blue"></div>
                </div>
            ) : (
                <>
                    {institutions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {institutions.map((institution) => (
                                <InstitutionCard
                                    key={institution._id}
                                    institution={institution}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-background-light rounded-lg">
                            <FaUniversity className="mx-auto text-5xl text-gray-400 mb-4" />
                            <h3 className="text-xl font-medium text-gray-500">No institutions found</h3>
                            <p className="text-gray-400">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {institutions.length > 0 && (
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(totalCount / limit)}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default Institution
