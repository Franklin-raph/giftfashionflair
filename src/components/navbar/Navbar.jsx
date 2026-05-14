import React, { useState } from 'react'
import { BiCart, BiSearch, BiUser } from 'react-icons/bi'
import { BsPhone, BsTiktok, BsWhatsapp } from 'react-icons/bs'
import { MdMail } from 'react-icons/md'
import { NavbarData } from '../../data/MockData'
import { IoCall } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa6'

const Navbar = () => {

    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='w-full'>
        <div className='bg-[#7E33E0] w-full fixed z-[100]'>
            <div className='flex py-2 px-4 md:px-[4rem] text-white justify-center max-w-[1600px] mx-auto'>
                <div className='flex items-center gap-4 md:gap-[50px] flex-wrap justify-center'>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <a className='flex items-center gap-1 cursor-pointer' href='https://chat.whatsapp.com/JPD42b7XuyBCg0wSYN8Nz9' target='_blank' rel='noopener noreferrer'>
                            <BsWhatsapp />
                            <span className='hidden sm:inline'>@giftfashionflair</span>
                        </a>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <a className='flex items-center gap-1 cursor-pointer' href='tel:+2347088501332' target='_blank' rel='noopener noreferrer'>
                            <IoCall />
                            <p className='hidden sm:block'>07088501332</p>
                        </a>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <BsTiktok />
                        <p className='hidden sm:block'>08139362969</p>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <FaFacebook />
                        <p className='hidden sm:block'>08139362969</p>
                    </div>
                </div>
                {/* <div className='flex items-center gap-[100px]'>
                    <div className='flex items-center gap-1 cursor-pointer' onClick={() => navigate('/login')}>
                        <p>Login</p>
                        <BiUser />
                    </div>
                    <BiCart className='cursor-pointer'/>
                </div> */}
            </div>
        </div>

        <div className='flex px-2 md:px-[4rem] justify-between max-w-[1600px] mx-auto pt-[2.5rem] relative z-[99] bg-white items-center'>
            <div className='flex gap-[120px]'>
                <Link to="/" className='w-[70px]'>
                    <img src="/images/logo.png" alt="Logo" />
                </Link>
            </div>

            {/* Desktop Nav */}
            <div className='hidden md:flex items-center pl-[6px]'>
                <div className='font-[300] flex gap-7 items-center'>
                    {NavbarData.map((item) => (
                        <a key={item.id} href={item.link}>
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>

            {/* Hamburger Button (mobile only) */}
            <button
                className='flex md:hidden flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer'
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className={`block h-[2px] w-6 bg-[#7E33E0] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[2px] w-6 bg-[#7E33E0] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[2px] w-6 bg-[#7E33E0] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 relative z-[98] ${menuOpen ? 'max-h-[400px] py-4' : 'max-h-0'}`}>
            <div className='flex flex-col items-start gap-4 px-6 font-[300]'>
                {NavbarData.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        onClick={() => setMenuOpen(false)}
                        className='text-gray-800 w-full border-b border-gray-100 pb-2'
                    >
                        {item.title}
                    </a>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Navbar