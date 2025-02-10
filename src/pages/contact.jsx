import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import bgimg from '../assets/contactBg.png'
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi'

const Contact = () => {
    return (
        <>
            <Navbar />
            <section className="relative z-10 overflow-hidden bg-white py-10 md:px-20 sm:px-10 px-0 my-4">
                <div className="container">
                    <div className="mx-4 flex flex-wrap lg:justify-between">
                        <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                            <div className="mb-12 max-w-[570px] lg:mb-0">
                                <span className="mb-4 block text-base font-semibold text-blue-900">Contact Us</span>
                                <h2 className="mb-6 font-bold uppercase text-3xl text-dark-gray">GET IN TOUCH WITH US</h2>
                                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
                                    CareerGo helps you make informed choices for your education, from selecting the right college to stream and
                                    school. Contact us for personalized guidance.
                                </p>

                                <div className="mb-6 flex w-full max-w-[370px]">
                                    <div className="mr-6 flex h-[50px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-900/5 text-blue-900 sm:h-[50px] sm:max-w-[50px]">
                                        <HiLocationMarker size={27} />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-bold text-dark dark:text-white">Our Location</h4>
                                        <p className="text-base text-body-color dark:text-dark-6">VIT Bhopal</p>
                                    </div>
                                </div>

                                <div className="mb-6 flex w-full max-w-[370px]">
                                    <div className="mr-6 flex h-[50px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-900/5 text-blue-900 sm:h-[50px] sm:max-w-[50px]">
                                        <HiPhone size={27} />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-bold text-dark dark:text-white">Phone Number</h4>
                                        <p className="text-base text-body-color dark:text-dark-6">(+91) 8141425799</p>
                                    </div>
                                </div>

                                <div className="mb-6 flex w-full max-w-[370px]">
                                    <div className="mr-6 flex h-[50px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-900/5 text-blue-900 sm:h-[50px] sm:max-w-[50px]">
                                        <HiMail size={27} />
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-bold text-dark dark:text-white">Email Address</h4>
                                        <p className="text-base text-body-color dark:text-dark-6">careergo@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-full px-4 lg:w-1/2 bg-cover bg-center"
                            style={{ backgroundImage: `url(${bgimg})` }}>
                            <div className="relative rounded-lg bg-white mx-3 p-8 mt-2 shadow-lg dark:bg-dark-2 sm:p-12">
                                <form>
                                    <ContactInputBox
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                    />
                                    <ContactInputBox
                                        type="text"
                                        name="email"
                                        placeholder="Your Email"
                                    />
                                    <ContactInputBox
                                        type="text"
                                        name="phone"
                                        placeholder="Your Phone"
                                    />
                                    <ContactTextArea
                                        row="5"
                                        placeholder="Your Message"
                                        name="details"
                                        defaultValue=""
                                    />
                                    <div>
                                        <button
                                            type="submit"
                                            className="bg-navy-blue hover:bg-deep-blue w-full rounded border p-2 text-white transition">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                                <div>
                                    <span className="absolute -right-11 -top-9 z-[-1]">
                                        <svg
                                            width={100}
                                            height={100}
                                            viewBox="0 0 100 100"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                                                fill="#0a528e"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact

const ContactTextArea = ({ row, placeholder, name, defaultValue }) => {
    return (
        <div className="mb-4">
            <textarea
                rows={row}
                placeholder={placeholder}
                name={name}
                className="text-[13.5px] w-full resize-none rounded border border-stroke px-[14px] py-2 text-base text-body-color outline-none"
                defaultValue={defaultValue}
            />
        </div>
    )
}

const ContactInputBox = ({ type, placeholder, name }) => {
    return (
        <div className="mb-4">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className="text-[13.5px] w-full rounded border border-stroke px-[12px] py-1 text-base text-body-color outline-none"
            />
        </div>
    )
}
