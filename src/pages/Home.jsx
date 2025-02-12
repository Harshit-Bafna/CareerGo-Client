import { useState } from 'react'
import HomeBanner from '../assets/homeBanner.jpg'
import careerImg from '../assets/career-assessment.jpg'
import person1 from '../assets/person1.jpg'
import person2 from '../assets/person2.jpg'
import person3 from '../assets/person3.jpg'
import person4 from '../assets/person4.jpg'
import person5 from '../assets/person5.jpg'
import person6 from '../assets/person6.jpg'
import {
    FaUniversity,
    FaLightbulb,
    FaSchool,
    FaUserGraduate,
    FaStar,
    FaChevronLeft,
    FaChevronRight,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from 'react-icons/fa'

const features = [
    {
        icon: (
            <FaUniversity
                size={40}
                className="text-blue-500"
            />
        ),
        title: 'Tailored College Selection for Your Future Success',
        description: 'Access a database of top-rated colleges to make an informed choice.',
        moreContent:
            'Get personalized recommendations based on your preferences, scores, and future aspirations. Explore detailed reviews and student testimonials.',
    },
    {
        icon: (
            <FaLightbulb
                size={40}
                className="text-yellow-500"
            />
        ),
        title: 'Discover Your Ideal Stream with Expert Guidance',
        description: 'Utilize AI-driven assessments to choose the stream that aligns with your strengths.',
        moreContent:
            'Take quizzes designed by experts to evaluate your interests and aptitude. Get mentorship sessions to gain clarity on career paths.',
    },
    {
        icon: (
            <FaSchool
                size={40}
                className="text-green-500"
            />
        ),
        title: 'Find the Best Schools for Your Academic Growth',
        description: 'Access a database of top-rated schools to make an informed choice.',
        moreContent:
            'Compare schools based on curriculum, faculty, infrastructure, and extracurricular activities. Find scholarships and financial aid options.',
    },
]

const testimonials = [
    {
        id: 1,
        name: 'Aditya Nair',
        institution: 'VIT Vellore',
        review: 'CareerGo’s expert resources and AI-driven tests helped me align my choices with my interests. It’s a game-changer for students!',
        rating: 5,
        image: person1,
    },
    {
        id: 2,
        name: 'Megha Rathi',
        institution: 'Symbiosis Pune',
        review: 'I love how CareerGo simplifies the entire career planning journey. From stream selection to college recommendations, it covers everything!',
        rating: 4,
        image: person2,
    },
    {
        id: 3,
        name: 'Aarav Mehta',
        institution: 'Delhi Public School, Bangalore',
        review: 'CareerGo made my college selection process so much smoother! The AI-driven recommendations truly helped me find the best fit for my future.',
        rating: 5,
        image: person3,
    },
    {
        id: 4,
        name: 'Riya Sharma',
        institution: 'St. Xavier’s School, Jaipur',
        review: 'I was confused about which stream to choose after 10th, but CareerGo’s assessments gave me clarity. Highly recommend it to students!',
        rating: 4,
        image: person4,
    },
    {
        id: 5,
        name: 'Kunal Verma',
        institution: 'Amity International School, Noida',
        review: 'Finding the right school for my child felt overwhelming, but CareerGo provided insightful recommendations that made the decision easier.',
        rating: 4,
        image: person5,
    },
    {
        id: 6,
        name: 'Sneha Kapoor',
        institution: 'Christ University, Bangalore',
        review: 'The platform is user-friendly and offers personalized career guidance. It helped me explore options I had not even considered before!',
        rating: 4,
        image: person6,
    },
]

export default function Home() {
    const [expanded, setExpanded] = useState(Array(features.length).fill(false))

    const toggleExpand = (index) => {
        setExpanded((prev) => {
            const newExpanded = [...prev]
            newExpanded[index] = !newExpanded[index]
            return newExpanded
        })
    }

    const [page, setPage] = useState(0)
    const reviewsPerPage = 2
    const totalPages = Math.ceil(testimonials.length / reviewsPerPage)

    const nextPage = () => setPage((prev) => (prev + 1) % totalPages)
    const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages)

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-16">
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-dark-gray leading-tight">
                        Empower Your Future with <span className="text-deep-blue">CareerGo</span> Today
                    </h1>
                    <p className="mt-4 text-dark-gray text-lg">
                        At CareerGo, we provide personalized guidance to help you navigate your educational and career choices. Discover the right
                        path for your future with our expert resources and support.
                    </p>
                    <div className="mt-6 flex justify-center md:justify-start space-x-4">
                        <button className="bg-deep-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-blue transition">
                            Get Started
                        </button>
                        <button className="border border-deep-blue text-deep-blue px-6 py-3 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition">
                            Contact Us
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
                    <img
                        src={HomeBanner}
                        alt="Career Guidance"
                        className="w-full max-w-md md:max-w-lg lg:max-w-xl"
                    />
                </div>
            </section>

            <section className="py-16 text-center bg-gray-100">
                <h2 className="text-3xl font-bold text-dark-gray mb-8">Explore Our Comprehensive Features for Your Career Journey</h2>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-center mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 mb-4">{feature.description}</p>
                            {expanded[index] && <p className="text-gray-700 mt-2">{feature.moreContent}</p>}
                            <button
                                onClick={() => toggleExpand(index)}
                                className="text-deep-blue flex items-center justify-center mt-2">
                                Learn More <span className="ml-2">&gt;</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                    <img
                        src={careerImg}
                        alt="Career Assessment"
                        className="w-full h-auto shadow-lg"
                    />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-gray">Discover Your Path with AI-Driven Career Assessment Tests</h2>
                    <p className="mt-4 text-gray-600">
                        Our AI-powered assessments help students identify their strengths and interests, guiding them toward the right academic
                        stream. Make informed decisions that align with your career aspirations.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <FaUserGraduate className="text-blue-600 text-xl" />
                            <h3 className="mt-3 text-xl font-semibold text-dark-gray">Personalized Insights</h3>
                            <p className="mt-2 text-gray-500">
                                Tailored recommendations based on individual skills and interests for optimal stream selection.
                            </p>
                        </div>

                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <FaLightbulb className="text-yellow-500 text-xl" />
                            <h3 className="mt-3 text-xl font-semibold text-dark-gray">Future Ready</h3>
                            <p className="mt-2 text-gray-500">Equip yourself with the knowledge to thrive in your chosen career path.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center py-12 px-12 sm:px-6 bg-gray-100">
                <h2 className="text-3xl font-bold">Customer Testimonials</h2>
                <div className="w-24 h-1 bg-gray-700 mx-auto my-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    {testimonials.slice(page * reviewsPerPage, (page + 1) * reviewsPerPage).map((t) => (
                        <div
                            key={t.id}
                            className="p-6 border rounded-lg shadow-lg">
                            <div className="flex justify-center mb-3">
                                {[...Array(t.rating)].map(() => (
                                    <FaStar
                                        key={Math.random().toString(36).substr(2, 9)}
                                        className="text-yellow-500"
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700">{t.review}</p>
                            <div className="flex items-center gap-4 mt-4">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="text-left">
                                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                                    <p className="text-sm text-gray-600">{t.institution}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <span
                                key={`page-dot-${i + 1}`}
                                className={`w-2 h-2 rounded-full ${i === page ? 'bg-gray-900' : 'bg-gray-400'}`}></span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={prevPage}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={nextPage}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </section>

            <section className="flex justify-center items-center m-10 sm:m-20 border-2 border-black p-8 sm:p-16">
                <div className="text-center rounded-lg w-full md:w-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your Career Journey Today</h2>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">
                        Unlock your potential with a free consultation or career assessment tailored just for you.
                    </p>
                    <div className="flex justify-center gap-4 flex-col md:flex-row">
                        <button className="bg-deep-blue text-white px-6 py-2 hover:bg-navy-blue transition w-full md:w-auto">Sign Up</button>
                        <button
                            className="bg-gray-800 text-white px-6 py-2 hover:bg-dark-gray transition w-full md:w-auto"
                            onClick={() => setIsOpen(true)}>
                            Learn More
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                            <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
                            <p className="text-gray-700 mb-4">
                                Get personalized career guidance, AI-powered assessments, and expert insights to help you make informed decisions.
                            </p>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                onClick={() => setIsOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </section>

            <section className="mx-auto text-center p-8 md:p-20 bg-gray-100">
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <FaEnvelope className="text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Contact</h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            Reach out to us for any inquiries or support. Our team is always ready to assist you with any questions or concerns you
                            may have regarding our services. Don’t hesitate to get in touch with us for the support you need.
                        </p>
                        <a
                            href="mailto:careergo@gmail.com"
                            className="underline">
                            careergo@gmail.com
                        </a>
                    </div>

                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <FaPhoneAlt className="text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Call</h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            We are here to assist you via phone anytime. Feel free to call us for immediate assistance. Our team is always available
                            to answer your queries and provide support over the phone at your convenience.
                        </p>
                        <a
                            href="tel:+918141425799"
                            className="underline">
                            (+91) 8141425799
                        </a>
                    </div>

                    <div className="flex flex-col items-center w-full md:w-1/3">
                        <FaMapMarkerAlt className="text-4xl mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Location</h3>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            Visit us at our headquarters for personalized support. Our office is located at VIT Bhopal, where you can meet with our
                            team and discuss your career path in person. We’re happy to guide you toward your goals.
                        </p>
                        <a
                            href="https://www.google.com/maps?q=VIT+Bhopal"
                            className="underline"
                            target="_blank"
                            rel="noopener noreferrer">
                            VIT Bhopal
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
