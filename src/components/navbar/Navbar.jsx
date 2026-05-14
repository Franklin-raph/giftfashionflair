import React from 'react'
import { BiCart, BiSearch, BiUser } from 'react-icons/bi'
import { BsPhone, BsTiktok, BsWhatsapp } from 'react-icons/bs'
import { MdMail } from 'react-icons/md'
import { NavbarData } from '../../data/MockData'
import { IoCall } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa6'

const Navbar = () => {

    const navigate = useNavigate()

  return (
    <div className='w-full'>
        <div className='bg-[#7E33E0] w-full fixed z-[100]'>
            <div className='flex py-2 px-[4rem] text-white justify-center max-w-[1600px] mx-auto'>
                <div className='flex items-center gap-[50px]'>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <a className='flex items-center gap-1 cursor-pointer' href='https://chat.whatsapp.com/JPD42b7XuyBCg0wSYN8Nz9' target='_blank' rel='noopener noreferrer'>
                            <BsWhatsapp />
                            @giftfashionflair
                        </a>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <IoCall />
                        <p>08139362969</p>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <BsTiktok />
                        <p>08139362969</p>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <FaFacebook />
                        <p>08139362969</p>
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
        <div className='flex px-[4rem] justify-between max-w-[1600px] mx-auto pt-[2.5rem] relative z-[99] bg-white'>
            <div className='flex gap-[120px]'>
                <Link to="/" className='w-[70px]'>
                    <img src="/images/logo.png" alt="Logo" />
                </Link>
            </div>
            <div className='flex items-center pl-[6px]'>
                <div className='font-[300] flex gap-7 items-center'>
                    {NavbarData.map((item) => (
                        <a key={item.id} href={item.link}>
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar