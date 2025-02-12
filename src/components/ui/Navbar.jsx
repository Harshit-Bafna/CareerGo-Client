import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useBtnNavigation } from '../../utils/helper/syncHelper'

const Navbar = () => {
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    const navItems = [
        { id: 1, text: 'Home', path: '/' },
        { id: 2, text: 'About Us', path: '/about' },
        { id: 3, text: 'Contact Us', path: '/contact' },
    ]

    return (
        <div className="w-full h-16">
            <div className="fixed z-49 bg-white w-full shadow-input-shadow flex justify-between items-center h-16 px-16">
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="mx-auto h-9 w-auto"
                    />
                </NavLink>

                <ul className="hidden md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.id}
                            className={({ isActive }) => `p-2 m-2 cursor-pointer ${isActive ? 'font-semibold' : 'hover:underline'}`}>
                            {item.text}
                        </NavLink>
                    ))}
                </ul>

                <ul className="hidden md:flex space-x-4">
                    <li>
                        <button
                            onClick={useBtnNavigation('/signin')}
                            className="bg-deep-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-navy-blue transition">
                            Sign In
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={useBtnNavigation('/signup')}
                            className="border border-deep-blue text-deep-blue px-5 py-2 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition">
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
                    <NavLink to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="m-4 h-9 w-auto"
                        />
                    </NavLink>

                    {navItems.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.id}
                            className={({ isActive }) => ` m-3 cursor-pointer ${isActive ? 'font-semibold' : 'hover:underline'}`}>
                            <li className="px-8">{item.text}</li>
                        </NavLink>
                    ))}

                    <div>
                        <li>
                            <button
                                onClick={useBtnNavigation('/signin')}
                                className="my-3 mx-7 bg-deep-blue text-white px-5 py-2 rounded-lg font-semibold hover:bg-navy-blue transition">
                                Sign In
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={useBtnNavigation('/signup')}
                                className="my-3 mx-7 border border-deep-blue text-deep-blue px-5 py-2 rounded-lg font-semibold hover:bg-deep-blue hover:text-white transition">
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
