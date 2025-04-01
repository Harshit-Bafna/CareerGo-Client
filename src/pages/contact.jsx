import { useState } from 'react'
import bgimg from '../assets/contactBg.png'
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { setError } from '../store/slices/errorSlice'
import { validateEmail } from '../utils/helper/syncHelper'
import { contactEmailTemplate } from '../utils/template/contactEmailTemplate'
import { sendEmail } from '../store/slices/emailSlice'

const Contact = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            const errorMessage = 'Name is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!email) {
            const errorMessage = 'Email is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!validateEmail(email)) {
            const errorMessage = 'Invalid email format.'
            dispatch(setError(errorMessage))
            return
        } else if (!phone) {
            const errorMessage = 'Phone number is required.'
            dispatch(setError(errorMessage))
            return
        } else if (!message) {
            const errorMessage = 'Message is required.'
            dispatch(setError(errorMessage))
            return
        }

        const payload = {
            emailAddress: 'bafnaharshit7891@gmail.com',
            subject: `New Contact Request from ${name}`,
            body: contactEmailTemplate(name, email, phone, message),
        }

        dispatch(sendEmail(payload))
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
    }

    return (
        <section className="relative z-10 overflow-hidden bg-white py-10 md:px-20 sm:px-10 px-0 my-4">
            <div className="container">
                <div className="mx-4 flex flex-wrap lg:justify-between">
                    <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
                        <div className="mb-12 max-w-[570px] lg:mb-0">
                            <span className="mb-4 block text-base font-semibold text-blue-900">Contact Us</span>
                            <h2 className="mb-6 font-bold uppercase text-3xl text-dark-gray">GET IN TOUCH WITH US</h2>
                            <p className="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
                                CareerGo helps you make informed choices for your education, from selecting the right college to book counselling
                                sessions. Contact us for personalized guidance.
                            </p>

                            <div className="mb-6 flex w-full max-w-[370px]">
                                <div className="mr-6 flex h-[50px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-900/5 text-blue-900 sm:h-[50px] sm:max-w-[50px]">
                                    <HiLocationMarker size={27} />
                                </div>
                                <div className="w-full">
                                    <h4 className="text-lg font-bold text-dark dark:text-white">Our Location</h4>
                                    <a
                                        href="https://www.google.com/maps?q=VIT+Bhopal"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        VIT Bhopal
                                    </a>
                                </div>
                            </div>

                            <div className="mb-6 flex w-full max-w-[370px]">
                                <div className="mr-6 flex h-[50px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-900/5 text-blue-900 sm:h-[50px] sm:max-w-[50px]">
                                    <HiPhone size={27} />
                                </div>
                                <div className="w-full">
                                    <h4 className="text-lg font-bold text-dark dark:text-white">Phone Number</h4>
                                    <a
                                        href="tel:+918141425799"
                                        target="_blank">
                                        (+91) 8141425799
                                    </a>
                                </div>
                            </div>

                            <div className="mb-6 flex w-full max-w-[370px]">
                                <div className="mr-6 flex h-[50px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-blue-900/5 text-blue-900 sm:h-[50px] sm:max-w-[50px]">
                                    <HiMail size={27} />
                                </div>
                                <div className="w-full">
                                    <h4 className="text-lg font-bold text-dark dark:text-white">Email Address</h4>
                                    <a
                                        href="mailto:careergo@gmail.com"
                                        target="_blank">
                                        careergo@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="w-full px-4 lg:w-1/2 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgimg})` }}>
                        <div className="relative rounded-lg bg-white mx-3 p-8 mt-2 shadow-lg dark:bg-dark-2 sm:p-12">
                            <form onSubmit={handleSubmit}>
                                <ContactInputBox
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <ContactInputBox
                                    type="text"
                                    name="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <ContactInputBox
                                    type="text"
                                    name="phone"
                                    placeholder="Your Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <ContactTextArea
                                    row="5"
                                    placeholder="Your Message"
                                    name="message"
                                    defaultValue=""
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
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
    )
}

export default Contact

const ContactTextArea = ({ row, placeholder, name, defaultValue, value, onChange }) => {
    return (
        <div className="mb-4">
            <textarea
                rows={row}
                placeholder={placeholder}
                name={name}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                className="text-[13.5px] w-full resize-none rounded border border-stroke px-[14px] py-2 text-base text-body-color outline-none"
            />
        </div>
    )
}

const ContactInputBox = ({ type, placeholder, name, value, onChange }) => {
    return (
        <div className="mb-4">
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="text-[13.5px] w-full rounded border border-stroke px-[12px] py-1 text-base text-body-color outline-none"
            />
        </div>
    )
}
