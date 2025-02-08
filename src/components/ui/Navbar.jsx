import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import logo from '../../assets/logo.png'

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    const navItems = [
        { id: 1, text: 'Home Page' },
        { id: 2, text: 'About Us' },
        { id: 3, text: 'Contact Us' },
    ]

    return (
        <div className="w-full h-16">
            <div className="fixed bg-white w-full shadow-input-shadow flex justify-between items-center h-16 px-16">
                <a href="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="mx-auto h-9 w-auto"
                    />
                </a>

                <ul className="hidden md:flex">
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className="p-2 hover:underline m-2 cursor-pointer">
                            {item.text}
                        </li>
                    ))}
                </ul>

                <ul className="hidden md:flex space-x-4">
                    <li>
                        <button className="bg-deep-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-navy-blue transition">Sign In</button>
                    </li>
                    <li>
                        <button className="border border-deep-blue text-deep-blue px-5 py-2 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition">
                            Sign Up
                        </button>
                    </li>
                </ul>

                <button
                    onClick={handleNav}
                    className="block md:hidden">
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </button>

                <ul
                    className={
                        nav
                            ? 'fixed md:hidden left-0 top-0 w-[50%] h-full bg-white shadow-input-shadow ease-in-out duration-500'
                            : 'ease-in-out w-[50%] duration-500 fixed top-0 bottom-0 left-[-100%] '
                    }>
                    <a href="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="m-4 h-9 w-auto"
                        />
                    </a>

                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            className="px-5 py-2 hover:underline m-3 cursor-pointer">
                            {item.text}
                        </li>
                    ))}

                    <div>
                        <li>
                            <button className="my-3 mx-7 bg-deep-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-navy-blue transition">
                                Sign In
                            </button>
                        </li>
                        <li>
                            <button className="my-3 mx-7 border border-deep-blue text-deep-blue px-5 py-2 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition">
                                Sign Up
                            </button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
