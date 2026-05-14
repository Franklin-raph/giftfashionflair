import React from 'react'

const TrendingProductsCard = ({card}) => {
  return (
        <div className='bg-white p-3 shadow-lg'>
            <div className='bg-[#F5F6F8] p-4 h-[250px] overflow-hidden'>
                <img src={card.image} alt="" className='w-full h-full object-cover object-top rounded-[2px]'/>
            </div>
            <div className='text-center text-[#151875] flex flex-col text-[14px] mt-3'>
                <p className='mb-1'>{card.title}</p>
                <p>${card.price} <span className='ml-4 text-[#1518754D] text-[12px] line-through'>${card.oldPrice}</span> </p>
            </div>
        </div>
  )
}

export default TrendingProductsCard