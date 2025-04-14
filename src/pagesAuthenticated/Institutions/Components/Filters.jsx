import { useState } from 'react'
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Filters = ({ minFeesRange, maxFeesRange, hostel, admission, courseCategory, onFilterChange, onApplyFeeFilter }) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)

    const courseCategories = [
        'Ph.D',
        'B.Tech + M.Tech',
        'BS',
        'BS + MS',
        'M.S',
        'M.Des',
        'BE',
        'M.Sc',
        'Integrated MBA',
        'B.S',
        'MPP',
        'BA',
        'MBA',
        'B.Arch',
        'M.A',
        'L.L.M',
        'Polytechnic',
        'MCA',
        'M.Pharm',
        'BBA',
        'M.Tech',
        'B.Tech',
        'B.Sc',
        'ME',
        'B.Des',
        'B.Ed',
        'MA',
        'BCA',
    ]

    return (
        <div className="mb-6 bg-background-light rounded-lg p-4 border border-border-light">
            <button
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <div className="flex items-center">
                    <FaFilter className="text-navy-blue mr-2" />
                    <h3 className="font-medium text-navy-blue">Filters</h3>
                </div>
                {isFiltersOpen ? <FaChevronUp className="text-navy-blue" /> : <FaChevronDown className="text-navy-blue" />}
            </button>

            {isFiltersOpen && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="fee">
                            Fees Range
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minFeesRange}
                                onChange={(e) => onFilterChange('minFeesRange', e.target.value)}
                                className="w-full p-2 border border-border-light rounded-md text-sm"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxFeesRange}
                                onChange={(e) => onFilterChange('maxFeesRange', e.target.value)}
                                className="w-full p-2 border border-border-light rounded-md text-sm"
                            />
                        </div>
                        <button
                            onClick={onApplyFeeFilter}
                            className="w-full bg-deep-blue text-white py-1 px-3 rounded-md text-sm">
                            Apply
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="hostel">
                            Hostel Availability
                        </label>
                        <select
                            value={hostel}
                            onChange={(e) => onFilterChange('hostel', e.target.value)}
                            className="w-full p-2 border border-border-light rounded-md text-sm">
                            <option value="">All</option>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="admission">
                            Admission Status
                        </label>
                        <select
                            value={admission}
                            onChange={(e) => onFilterChange('admission', e.target.value)}
                            className="w-full p-2 border border-border-light rounded-md text-sm">
                            <option value="">All</option>
                            <option value="true">Open</option>
                            <option value="false">Closed</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="courseCategory">
                            Course Category
                        </label>
                        <select
                            value={courseCategory}
                            onChange={(e) => onFilterChange('courseCategory', e.target.value)}
                            className="w-full p-2 border border-border-light rounded-md text-sm">
                            <option value="">All Categories</option>
                            {courseCategories.map((category) => (
                                <option
                                    key={category}
                                    value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Filters
