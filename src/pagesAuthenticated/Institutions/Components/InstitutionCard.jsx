import { FaGlobe, FaArrowRight } from 'react-icons/fa'

const InstitutionCard = ({ institution, onViewDetails }) => {
    const { _id, institutionName, logo, website, registrationNumber, admission, courseCategories, minCourseFees, maxCourseFees } = institution

    const formatFees = (fees) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(fees)
    }

    const categories = courseCategories && courseCategories.length > 0 ? courseCategories[0] : []

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border-light">
            <div className="p-5">
                <div className="mb-4">
                    {logo ? (
                        <img
                            src={logo || '/placeholder.svg'}
                            alt={`${institutionName} logo`}
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    ) : (
                        <div className="h-16 w-16 bg-navy-blue text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                            {registrationNumber.substring(0, 2)}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-heading font-bold text-navy-blue text-center mb-3 line-clamp-2">{institutionName}</h3>

                {website && (
                    <div className="flex items-center justify-center mb-3 text-sm">
                        <FaGlobe className="text-deep-blue mr-2" />
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-deep-blue hover:underline truncate">
                            {website.replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                )}

                <div className="flex justify-center mb-3">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                            admission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {admission ? 'Admission Open' : 'Admission Closed'}
                    </span>
                </div>

                <div className="mb-3 text-center">
                    <p className="text-sm text-gray-600">Fees Range:</p>
                    <p className="font-medium text-deep-indigo">
                        {formatFees(minCourseFees)} - {formatFees(maxCourseFees)}
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 text-center mb-2">Courses:</p>
                    <div className="flex flex-wrap justify-center gap-1">
                        {categories.slice(0, 3).map((category, index) => (
                            <span
                                key={index}
                                className="bg-background-light text-deep-blue text-xs px-2 py-1 rounded-md">
                                {category}
                            </span>
                        ))}
                        {categories.length > 3 && (
                            <span className="bg-background-light text-deep-blue text-xs px-2 py-1 rounded-md">+{categories.length - 3} more</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => onViewDetails(_id)}
                    className="w-full bg-navy-blue hover:bg-deep-blue text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center">
                    Institution Details
                    <FaArrowRight className="ml-2" />
                </button>
            </div>
        </div>
    )
}

export default InstitutionCard
