import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="relative p-10 bg-gray-100 shadow-md border-t-2">
            <div className="container mx-auto px-4">
                <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="w-full">
                        <NavLink to="/">
                            <img
                                src={logo}
                                alt="logo"
                                className="mb-3 h-9 w-auto"
                            />
                        </NavLink>
                        <p className="mb-4 text-sm text-gray-600">
                            CareerGo helps you make informed choices for your education, from selecting the right college to booking counseling
                            sessions with esteemed universities. Contact us for personalized guidance.
                        </p>
                        <p className="flex items-center text-sm font-medium text-gray-700">
                            <FaPhoneAlt
                                className="mr-2"
                                size={16}
                            />
                            <a
                                href="tel:+918141425799"
                                target="_blank"
                                rel="noopener noreferrer">
                                (+91) 8141425799
                            </a>
                        </p>
                        <p className="flex items-center text-sm font-medium text-gray-700 mt-2">
                            <FaEnvelope
                                className="mr-2"
                                size={16}
                            />
                            <a
                                href="mailto:contact@careergo.com"
                                target="_blank"
                                rel="noopener noreferrer">
                                careergo@gmail.com
                            </a>
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">Quick Links</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className="hover:text-blue-500">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className="hover:text-blue-500">
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className="hover:text-blue-500">
                                    Contact Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/signin"
                                    className="hover:text-blue-500">
                                    Sign in
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/signup"
                                    className="hover:text-blue-500">
                                    Sign up
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">Our Partners</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>Vellore Institute of Technology (VIT)</li>
                            <li>IIT Bombay</li>
                            <li>BITS Pilani</li>
                            <li>IIIT Hyderabad</li>
                            <li>NIT Trichy</li>
                            <li>IIT Delhi</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">Our Location</h2>
                        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                            <a
                                href="https://www.google.com/maps/place/VIT+Bhopal+University/@23.1843811,76.7642691,15z"
                                target="_blank"
                                rel="noopener noreferrer">
                                <iframe
                                    title="VIT Bhopal Location"
                                    className="w-full h-48"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.5357352578176!2d76.84871217451133!3d23.077476414278653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397ce9ceaaaaaaab%3A0xa224b6b82b421f83!2sVIT%20Bhopal%20University!5e0!3m2!1sen!2sin!4v1743148495329!5m2!1sen!2sin"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </a>
                        </div>
                    </div>
                </div>
                <p className="mt-10 text-center text-sm text-gray-600">&copy; 2025 CareerGo | All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer
