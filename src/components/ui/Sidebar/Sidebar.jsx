import { useState, useRef } from 'react'
import { LuListCollapse } from 'react-icons/lu'
import { IoIosArrowDown } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import logoIcon from '../../../assets/logoIcon.png'
import { UserMenu } from './UserMenu'
import { InstitutionMenu } from './InstitutionMenu'
import { useSelector } from 'react-redux'

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
    const [activeDropdown, setActiveDropdown] = useState(null)
    const dropdownRef = useRef(null)

    const { role } = useSelector((state) => state.user)

    const menuItems = role === 'Organisation Admin' ? InstitutionMenu : UserMenu

    const toggleDropdown = (dropdownName) => {
        if (isSidebarOpen) {
            setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
        }
    }

    return (
        <div className="relative">
            <div
                className={`fixed z-50 border-r border-light-gray shadow-xs bg-white h-screen transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'w-64' : 'w-20'
                } flex flex-col`}>
                <div className={`flex items-center py-6 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
                    <img
                        src={isSidebarOpen ? logo : logoIcon}
                        alt="logo"
                        className={`h-8 w-auto transition-all duration-300 ${isSidebarOpen ? 'px-4' : 'px-0'}`}
                    />
                </div>

                <nav
                    className="flex-1 overflow-y-auto pb-4 px-3"
                    ref={dropdownRef}>
                    <div className="space-y-1">
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                {item.type === 'item' ? (
                                    <SidebarItem
                                        to={item.to}
                                        icon={item.icon}
                                        text={item.text}
                                        isSidebarOpen={isSidebarOpen}
                                        isActive={location.pathname === item.to}
                                    />
                                ) : (
                                    <>
                                        <SidebarDropdownTrigger
                                            icon={item.icon}
                                            text={item.text}
                                            isOpen={activeDropdown === item.id}
                                            isSidebarOpen={isSidebarOpen}
                                            onClick={(e) => toggleDropdown(item.id, item.items, e)}
                                        />

                                        {activeDropdown === item.id && isSidebarOpen && (
                                            <div className="pl-10 space-y-1 animate-fadeIn">
                                                {item.items.map((subItem, subIndex) => (
                                                    <SidebarItem
                                                        key={subIndex}
                                                        to={subItem.to}
                                                        icon={subItem.icon}
                                                        text={subItem.text}
                                                        isSidebarOpen={isSidebarOpen}
                                                        isActive={location.pathname === subItem.to}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="border-t border-border-light/20 p-1">
                    <button
                        className={`w-full flex items-center p-2 rounded-md hover:bg-light-gray text-navy-blue transition-colors ${isSidebarOpen ? 'justify-start pl-5' : 'justify-center'}`}
                        onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <LuListCollapse className={`text-xl transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                        {isSidebarOpen && <span className="ml-3">Collapse</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

const SidebarItem = ({ to, icon, text, isSidebarOpen }) => {
    const [tooltip, setTooltip] = useState({ visible: false, top: 0 })

    return (
        <div
            className="relative"
            onMouseEnter={(e) => {
                if (!isSidebarOpen) {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setTooltip({ visible: true, top: rect.top + window.scrollY })
                }
            }}
            onMouseLeave={() => setTooltip({ visible: false, top: 0 })}>
            <NavLink
                to={to}
                end
                className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                        isSidebarOpen ? 'justify-start' : 'justify-center'
                    } ${isActive ? 'bg-navy-blue text-white' : 'text-navy-blue hover:bg-light-gray'}`
                }>
                <span className="text-lg">{icon}</span>
                {isSidebarOpen && <span className="ml-3 truncate">{text}</span>}
            </NavLink>

            {tooltip.visible && !isSidebarOpen && (
                <div
                    className="fixed z-50 left-20 bg-white text-dark-gray px-4 py-2 rounded-md shadow-lg text-sm animate-fadeIn"
                    style={{ top: tooltip.top, whiteSpace: 'nowrap' }}>
                    {text}
                </div>
            )}
        </div>
    )
}

const SidebarDropdownTrigger = ({ icon, text, isOpen, isSidebarOpen, onClick }) => {
    const [tooltip, setTooltip] = useState({ visible: false, top: 0 })

    return (
        <button
            className={`flex items-center w-full px-3 py-2.5 rounded-md transition-colors ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${
                isOpen ? 'bg-background-accent/20 text-navy-blue' : 'text-navy-blue hover:bg-light-gray'
            }`}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (!isSidebarOpen) {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setTooltip({ visible: true, top: rect.top + window.scrollY })
                }
            }}
            onMouseLeave={() => setTooltip({ visible: false, top: 0 })}>
            <span className="text-xl">{icon}</span>
            {isSidebarOpen && (
                <>
                    <span className="ml-3 truncate">{text}</span>
                    <IoIosArrowDown className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </>
            )}
            {tooltip.visible && !isSidebarOpen && (
                <div
                    className="fixed z-50 left-20 bg-white text-dark-gray px-4 py-2 rounded-md shadow-lg text-sm animate-fadeIn"
                    style={{ top: tooltip.top, whiteSpace: 'nowrap' }}>
                    {text}
                </div>
            )}
        </button>
    )
}
