import React from 'react'
import { BiCart, BiHeart } from 'react-icons/bi'
import { FaCarTunnel } from 'react-icons/fa6'

const FeaturedCard = ({card}) => {
  return (
    <div className='bg-white w-[95%] shadow shadow-[#0000001A] text-center group'>
        <div className='bg-[#F6F7FB] flex items-center justify-center py-9 flex-col relative'>
            <div className='absolute top-[10px] right-[10px] gap-2 items-center hidden group-hover:flex'>
                {/* <div className='text-[#2F1AC4] bg-[#EEEFFB] p-2 text-[18px] rounded-full cursor-pointer'>
                    <BiCart />
                </div>
                <div className='text-[#1389FF] bg-[#EEEFFB] p-2 text-[18px] rounded-full cursor-pointer'>
                    <BiHeart />
                </div> */}
                {/* <BiHeart className='text-[#1389FF] bg-[#EEEFFB] text-[18px]'/> */}
            </div>
            <img src={card.image} alt="" className='h-[200px]'/>
            <button className='bg-[#08D15F] py-[7px] text-white px-[12px] text-[12px] rounded-[4px] hidden group-hover:block absolute bottom-[10px]'>Contact Seller</button>
            {/* <button className='bg-[#08D15F] py-[7px] text-white px-[12px] text-[12px] rounded-[4px] hidden group-hover:block absolute bottom-[10px]'>View Details</button> */}
        </div>
        <div className='bg-white group-hover:bg-[#4d39e0]'>
            <h2 className='text-[#FB2E86] pt-6 text-[18px] group-hover:text-white'>{card.title}</h2>
            <div className='flex items-center justify-center gap-1 my-2'>
                <div className='bg-[#05E6B7] py-[2px] px-2 rounded-full'></div>
                <div className='bg-[#F701A8] py-[2px] px-2 rounded-full'></div>
                <div className='bg-[#00009D] py-[2px] px-2 rounded-full group-hover:bg-[#FFEAC1]'></div>
            </div>
            {/* <p className='text-[#151875] mb-3 group-hover:text-white'>Code - {card.code}</p> */}
            <p className='text-[#151875] pb-2 group-hover:text-white'>${card.price}</p>
        </div>
    </div>
  )
}

export default FeaturedCard