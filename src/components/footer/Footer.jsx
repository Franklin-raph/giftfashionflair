import React from 'react'
import { CategoriesLinks, CustomerCareService } from '../../data/MockData'
import { LuFacebook, LuInstagram, LuTwitter } from 'react-icons/lu'
import { BsTiktok, BsWhatsapp } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='mt-[7rem]'>
        {/* <div className='bg-[#EEEFFB] py-[3rem] mt-[7rem]'>
            <div className='grid grid-cols-2 py-2 px-[4rem] justify-between max-w-[1600px] mx-auto'>
                <div className='w-[500px]'>
                    <h1 className='font-[600] mb-4 text-[30px]'>Hekto</h1>
                    <div className='flex w-full text-[14px]'>
                        <input type="text" className='outline-none pl-2 py-2 w-[400px]' placeholder='Subscribe to our news letter' />
                        <button className='bg-[#FB2E86] text-white py-1 px-4 text-center w-[150px] rounded-[4px]'>Subscribe</button>
                    </div>
                    <p className='text-[#9196AA] mt-3 text-[14px]'>Contact Info</p>
                    <p className='text-[#9196AA] text-[14px]'>17 Princess Road, London, Greater London NW1 8JR, UK</p>
                </div>
                <div className='flex w-full justify-between'>
                    <div>
                        <h1 className='text-[22px] mb-4'>Categories</h1>
                        {
                            CategoriesLinks.map((item) => (
                                <a className='block text-[#8A8FB9] my-2 text-[13px]' key={item.id} href={item.link}>{item.title}</a>
                            ))
                        }
                    </div>
                    <div>
                        <h1 className='text-[22px] mb-4'>Categories</h1>
                        {
                            CustomerCareService.map((item) => (
                                <a className='block text-[#8A8FB9] my-2 text-[13px]' key={item.id} href={item.link}>{item.title}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div> */}
        <div className='bg-[#E7E4F8] text-[#9DA0AE]'>
            <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-0 w-full max-w-[1200px] justify-between mx-auto py-[1rem] px-4'>
                <p className='text-sm text-center sm:text-left'>&copy; Gift Fashion Flair - All Rights Reserved</p>
                <div className='flex items-center gap-5'>
                    {/* <a href="/" className='bg-[#151875] text-white p-[6px] rounded-full'>
                        <LuFacebook />
                    </a> */}
                    <a href="http://www.tiktok.com/@giftfashion_fliar" className='bg-[#151875] text-white p-[6px] rounded-full'>
                        <BsTiktok />
                    </a>
                    <a href='https://chat.whatsapp.com/JPD42b7XuyBCg0wSYN8Nz9' target='_blank' rel='noopener noreferrer' className='bg-[#151875] text-white p-[6px] rounded-full'>
                        <BsWhatsapp />
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer