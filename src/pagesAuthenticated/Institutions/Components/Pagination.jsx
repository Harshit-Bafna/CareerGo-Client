import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)

            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            if (currentPage <= 3) {
                end = Math.min(totalPages - 1, 4)
            }

            if (currentPage >= totalPages - 2) {
                start = Math.max(2, totalPages - 3)
            }

            if (start > 2) {
                pages.push('...')
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            if (end < totalPages - 1) {
                pages.push('...')
            }

            pages.push(totalPages)
        }

        return pages
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center space-x-1 mt-8">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-md ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-navy-blue hover:bg-background-light'
                }`}>
                <FaChevronLeft />
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                        page === currentPage
                            ? 'bg-navy-blue text-white'
                            : page === '...'
                              ? 'text-gray-500 cursor-default'
                              : 'text-navy-blue hover:bg-background-light'
                    }`}
                    disabled={page === '...'}>
                    {page}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-md ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-navy-blue hover:bg-background-light'
                }`}>
                <FaChevronRight />
            </button>
        </div>
    )
}

export default Pagination
