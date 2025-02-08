import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa'
import logo from '../../assets/logo.png'

const Footer = () => {
    return (
        <footer className="relative p-10 shadow-input-shadow">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between gap-y-10 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                    <div className="w-full sm:w-auto">
                        <div className="mb-4 w-full">
                            <a href="/">
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="mb-3 h-9 w-auto"
                                />
                            </a>
                            <p className="mb-4 text-sm text-body-color">
                                CareerGo helps you make informed choices for your education, from selecting the right college to stream and school.
                                Contact us for personalized guidance.
                            </p>
                            <p className="flex items-center text-sm font-medium">
                                <span className="mr-3 text-primary">
                                    <FaPhoneAlt size={18} />
                                </span>
                                <span>+91 8141425799</span>
                            </p>
                        </div>
                    </div>

                    <div className="mx-4">
                        <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    Sign in / Sign up
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="mx-4">
                        <h2 className="mb-4 text-lg font-semibold">Our Partners</h2>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    Delhi Public School (DPS)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    All India Institute of Medical Sciences (AIIMS)
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    Ryan International School
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary">
                                    Vellore Institute of Technology (VIT)
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full sm:w-auto">
                        <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">Follow Us On</h4>
                        <div className="mb-4 flex space-x-3">
                            <a
                                href="/"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark dark:border-dark-3 dark:text-white">
                                <FaFacebookF size={16} />
                            </a>
                            <a
                                href="/"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark dark:border-dark-3 dark:text-white">
                                <FaTwitter size={16} />
                            </a>
                            <a
                                href="/"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark dark:border-dark-3 dark:text-white">
                                <FaYoutube size={16} />
                            </a>
                            <a
                                href="/"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-stroke text-dark dark:border-dark-3 dark:text-white">
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                        <p className="text-sm text-body-color dark:text-dark-6">&copy; 2025 Vitians</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
