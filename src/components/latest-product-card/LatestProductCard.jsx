import React, { useState, useRef } from 'react'
import { BiCart, BiHeart, BiX, BiCamera, BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { FaWhatsapp } from 'react-icons/fa'

const SELLER_WHATSAPP = '2347088501332' // seller's number in international format (234 = Nigeria)

const LatestProductCard = ({ product, allProducts = [], productIndex = 0 }) => {
  const [showModal, setShowModal] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(productIndex)
  const [snapped, setSnapped] = useState(false)
  const imageRef = useRef(null)

  const currentProduct = allProducts.length > 0 ? allProducts[currentIndex] : product

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length)
    setSnapped(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allProducts.length)
    setSnapped(false)
  }

  const handleSnapshot = async () => {
    try {
      const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.esm.js')).default
      const canvas = await html2canvas(imageRef.current, { useCORS: true, backgroundColor: '#F7F7F7' })
      const link = document.createElement('a')
      link.download = `${currentProduct.title || 'product'}-snapshot.png`
      link.href = canvas.toDataURL()
      link.click()
      setSnapped(true)
      setTimeout(() => setSnapped(false), 2000)
    } catch (err) {
      console.error('Snapshot failed:', err)
    }
  }

  const handleWhatsApp = () => {
    const message =
      `Hi! I'm interested in this item from your store:%0A%0A` +
      `🛍️ *${currentProduct.title}*%0A` +
      `💰 *Price: ₦${currentProduct.price}*%0A` +
      `🖼️ Image: ${currentProduct.image}%0A%0A` +
      `Please let me know if it's available. Thank you!`

    const url = `https://wa.me/${SELLER_WHATSAPP}?text=${message}`
    window.open(url, '_blank')
  }

  const openModal = () => {
    setCurrentIndex(productIndex)
    setSnapped(false)
    setShowModal(true)
  }

  return (
    <>
      <div key={product.id} className='group cursor-pointer'>
        <div className='bg-[#F7F7F7] flex items-center justify-center px-3 py-6 flex-col relative h-[300px] group-hover:bg-white'>
          <div className='group-hover:flex items-center flex-col absolute left-2 bottom-2 gap-3 hidden'>
            {/* <div className='text-[#2F1AC4] bg-[#EEEFFB] p-2 text-[18px] rounded-full cursor-pointer'>
                        <BiCart />
                    </div>
                    <div className='text-[#1389FF] bg-[#EEEFFB] p-2 text-[18px] rounded-full cursor-pointer'>
                        <BiHeart />
                    </div> */}
          </div>
          <img
            src={product.image}
            alt=""
            className='w-[200px]'
            onClick={openModal}
          />
        </div>
        <div className='flex items-center justify-between mt-2'>
          <p className='text-[#151875] text-[14px] underline'>{product.title}</p>
          <p className='text-[#151875] text-[14px]'>₦{product.price}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className='fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center px-4'
          onClick={() => setShowModal(false)}
        >
          <div
            className='bg-white rounded-[4px] max-w-[500px] w-full p-8 relative'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-3 right-3 text-[#151875] text-[22px] hover:text-[#FB2E86] transition-colors z-10'
            >
              <BiX />
            </button>

            {/* Navigation + Image Row */}
            <div className='relative flex items-center justify-center'>

              {/* Left Arrow */}
              {allProducts.length > 1 && (
                <button
                  onClick={handlePrev}
                  className='absolute -left-4 bg-white border border-[#E0D9FF] text-[#151875] rounded-full p-1 text-[26px] hover:bg-[#FB2E86] hover:text-white hover:border-[#FB2E86] transition-all shadow-sm z-10'
                >
                  <BiChevronLeft />
                </button>
              )}

              {/* Image Snapshot Area */}
              <div
                ref={imageRef}
                className='bg-[#F7F7F7] flex items-center justify-center py-10 rounded-[2px] w-full'
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className='w-[250px] object-contain'
                />
              </div>

              {/* Right Arrow */}
              {allProducts.length > 1 && (
                <button
                  onClick={handleNext}
                  className='absolute -right-4 bg-white border border-[#E0D9FF] text-[#151875] rounded-full p-1 text-[26px] hover:bg-[#FB2E86] hover:text-white hover:border-[#FB2E86] transition-all shadow-sm z-10'
                >
                  <BiChevronRight />
                </button>
              )}
            </div>

            {/* Snapshot Button */}
            <button
              onClick={handleSnapshot}
              className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-[2px] text-[13px] border transition-all duration-200 ${
                snapped
                  ? 'bg-green-50 border-green-400 text-green-600'
                  : 'border-[#E0D9FF] text-[#8A8FB9] hover:border-[#FB2E86] hover:text-[#FB2E86]'
              }`}
            >
              <BiCamera className='text-[16px]' />
              {snapped ? 'Snapshot saved!' : 'Snapshot Image'}
            </button>

            {/* Item counter */}
            {allProducts.length > 1 && (
              <p className='text-center text-[#8A8FB9] text-[11px] mt-2'>
                {currentIndex + 1} of {allProducts.length}
              </p>
            )}

            {/* Details */}
            <div className='mt-3 flex justify-between items-start gap-4'>
              <p className='text-[#151875] font-bold text-[20px]'>{currentProduct.title}</p>

              {/* {currentProduct.category && (
                <span className='text-[11px] bg-[#F2F0FF] text-[#8A8FB9] px-3 py-1 rounded-full mt-1 inline-block'>
                  {currentProduct.category}
                </span>
              )} */}

              <div className='flex items-center gap-4'>
                <p className='text-[#FB2E86] font-bold text-[22px]'>₦{currentProduct.price}</p>
                {/* {currentProduct.oldPrice && (
                  <p className='text-[#8A8FB9] text-[16px] line-through'>₦{currentProduct.oldPrice}</p>
                )} */}
              </div>

              {currentProduct.description && (
                <p className='text-[#8A8FB9] text-[13px] mt-3 leading-relaxed'>{currentProduct.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-3 mt-3'>
              <button className='bg-[#FB2E86] text-white py-[10px] px-8 rounded-[2px] text-[14px] flex items-center justify-center gap-2 hover:bg-[#e0206e] transition-colors w-full text-center'>
                Contact seller
                {/* <BiCart className='text-[18px]' /> Add To Cart */}
              </button>
              {/* <button className='border border-[#FB2E86] text-[#FB2E86] py-[10px] px-4 rounded-[2px] text-[18px] hover:bg-[#FFF0F6] transition-colors'>
                <BiHeart />
              </button> */}
            </div>

            {/* WhatsApp Button */}
            <div className='flex items-center gap-3 mt-2'>
              <button
                onClick={handleWhatsApp}
                className='bg-[#25D366] text-white py-[10px] px-8 rounded-[2px] text-[14px] flex items-center justify-center gap-2 hover:bg-[#1ebe5d] transition-colors w-full text-center'
              >
                <FaWhatsapp className='text-[18px]' />
                Send via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default LatestProductCard