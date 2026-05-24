import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BiSearch, BiX } from 'react-icons/bi'
import { BsTiktok, BsWhatsapp } from 'react-icons/bs'
import { IoCall } from 'react-icons/io5'
import { FaFacebook, FaWhatsapp } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { FeaturedProducts, LatestProducts, TrendingProducts } from '../../data/MockData'

const SELLER_WHATSAPP = '2347088501332'
const SITE_BASE_URL = 'https://giftfashionflair.vercel.app'

const allProducts = [
    ...LatestProducts.map(p => ({ ...p, source: 'latest' })),
    ...FeaturedProducts.map(p => ({ ...p, source: 'featured' })),
    ...TrendingProducts.map(p => ({ ...p, source: 'trending' })),
]

const Navbar = () => {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const [dropdownRect, setDropdownRect] = useState(null)

    const searchRef = useRef(null)
    const inputRef = useRef(null)
    const mobileInputRef = useRef(null)
    const mobileSearchBarRef = useRef(null)
    const dropdownRef = useRef(null)  // ← NEW

    const filtered = searchQuery.trim().length > 0
        ? allProducts.filter(p =>
            p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ).slice(0, 6)
        : []

    const updateDropdownRect = () => {
        if (mobileSearchBarRef.current) {
            const rect = mobileSearchBarRef.current.getBoundingClientRect()
            setDropdownRect({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width,
            })
        }
    }

    useEffect(() => {
        if (!mobileSearchOpen) return
        updateDropdownRect()
        window.addEventListener('scroll', updateDropdownRect, { passive: true })
        window.addEventListener('resize', updateDropdownRect)
        return () => {
            window.removeEventListener('scroll', updateDropdownRect)
            window.removeEventListener('resize', updateDropdownRect)
        }
    }, [mobileSearchOpen])

    // ← UPDATED: now also checks dropdownRef so clicks inside the portal don't trigger close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                searchRef.current && !searchRef.current.contains(e.target) &&
                mobileSearchBarRef.current && !mobileSearchBarRef.current.contains(e.target) &&
                dropdownRef.current && !dropdownRef.current.contains(e.target)
            ) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleWhatsApp = (product) => {
        const rawImage = product.image || ''
        const fullImageUrl = rawImage.startsWith('http')
            ? rawImage
            : `${SITE_BASE_URL}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`

        const message =
            `Hi! I'm interested in this item from your store:%0A%0A` +
            `🛍️ *${product.title}*%0A` +
            `💰 *Price: ₦${product.price}*%0A%0A` +
            `🖼️ ${fullImageUrl}%0A%0A` +
            `Please let me know if it's available. Thank you!`

        window.open(`https://wa.me/${SELLER_WHATSAPP}?text=${message}`, '_blank')
    }

    const clearSearch = () => {
        setSearchQuery('')
        setShowDropdown(false)
        inputRef.current?.focus()
        mobileInputRef.current?.focus()
    }

    const toggleMobileSearch = () => {
        setMobileSearchOpen(prev => {
            const next = !prev
            if (next) {
                setTimeout(() => {
                    mobileInputRef.current?.focus()
                    updateDropdownRect()
                }, 100)
            } else {
                setSearchQuery('')
                setShowDropdown(false)
            }
            return next
        })
    }

    // ← UPDATED: now inline JSX instead of a nested component, so the ref stays stable
    const mobileDropdownPortal = mobileSearchOpen && showDropdown && searchQuery.trim() && dropdownRect
        ? ReactDOM.createPortal(
            <div
                ref={dropdownRef}  // ← ref attached here
                style={{
                    position: 'absolute',
                    top: `${dropdownRect.top}px`,
                    left: `${dropdownRect.left}px`,
                    width: `${dropdownRect.width}px`,
                    zIndex: 9999,
                }}
                className='bg-white border border-[#E0D9FF] rounded-[6px] shadow-xl overflow-hidden'
            >
                {filtered.length > 0 ? (
                    <div className='divide-y divide-[#F2F0FF]'>
                        {filtered.map((product, i) => (
                            <div
                                key={`${product.source}-${product.id ?? i}`}
                                className='flex items-center gap-3 px-4 py-3 hover:bg-[#F9F7FF] transition-colors'
                            >
                                <div className='w-[48px] h-[48px] bg-[#F7F7F7] rounded-[4px] flex-shrink-0 overflow-hidden'>
                                    <img src={product.image} alt={product.title} className='w-full h-full object-cover' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-[#151875] text-[13px] font-medium truncate'>{product.title}</p>
                                    <p className='text-[#FB2E86] text-[12px] font-bold mt-[2px]'>₦{product.price}</p>
                                </div>
                                <button
                                    onClick={() => handleWhatsApp(product)}
                                    className='flex items-center gap-1 bg-[#25D366] text-white text-[11px] px-3 py-[6px] rounded-[3px] hover:bg-[#1ebe5d] transition-colors flex-shrink-0'
                                >
                                    <FaWhatsapp className='text-[13px]' />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='px-4 py-5 text-center'>
                        <p className='text-[#8A8FB9] text-[13px]'>No results for "<span className='text-[#FB2E86]'>{searchQuery}</span>"</p>
                    </div>
                )}
            </div>,
            document.body
        )
        : null

    return (
        <div className='w-full'>
            {/* Top Bar */}
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
                </div>
            </div>

            {/* Main Navbar */}
            <div className='flex px-2 md:px-[4rem] justify-between max-w-[1600px] mx-auto pt-[2.5rem] relative z-[99] bg-white items-center gap-4'>
                {/* Logo */}
                <Link to="/" className='w-[70px] flex-shrink-0'>
                    <img src="/images/logo.png" alt="Logo" />
                </Link>

                {/* Search Bar — Desktop */}
                <div ref={searchRef} className='hidden md:flex flex-1 max-w-[500px] relative'>
                    <div className='flex items-center w-full border border-[#E0D9FF] rounded-[4px] overflow-visible focus-within:border-[#7E33E0] transition-colors bg-white'>
                        <BiSearch className='ml-3 text-[#8A8FB9] text-[18px] flex-shrink-0' />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder='Search products...'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowDropdown(true)
                            }}
                            onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                            className='flex-1 px-3 py-[10px] text-[14px] text-[#151875] outline-none bg-transparent placeholder:text-[#C0C4D8]'
                        />
                        {searchQuery && (
                            <button onClick={clearSearch} className='mr-3 text-[#8A8FB9] hover:text-[#FB2E86] transition-colors'>
                                <BiX className='text-[18px]' />
                            </button>
                        )}
                    </div>

                    {/* Desktop Dropdown */}
                    {showDropdown && searchQuery.trim() && (
                        <div className='absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-[#E0D9FF] rounded-[6px] shadow-xl z-[200] overflow-hidden'>
                            {filtered.length > 0 ? (
                                <>
                                    <p className='text-[11px] text-[#8A8FB9] px-4 pt-3 pb-1 uppercase tracking-wider font-medium'>
                                        {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery}"
                                    </p>
                                    <div className='divide-y divide-[#F2F0FF]'>
                                        {filtered.map((product, i) => (
                                            <div
                                                key={`${product.source}-${product.id ?? i}`}
                                                className='flex items-center gap-3 px-4 py-3 hover:bg-[#F9F7FF] transition-colors group'
                                            >
                                                <div className='w-[52px] h-[52px] bg-[#F7F7F7] rounded-[4px] flex items-center justify-center flex-shrink-0 overflow-hidden'>
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-[#151875] text-[13px] font-medium truncate'>{product.title}</p>
                                                    <p className='text-[#FB2E86] text-[13px] font-bold mt-[2px]'>₦{product.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleWhatsApp(product)}
                                                    className='flex items-center gap-1 bg-[#25D366] text-white text-[11px] px-3 py-[6px] rounded-[3px] hover:bg-[#1ebe5d] transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 md:opacity-100'
                                                >
                                                    <FaWhatsapp className='text-[13px]' />
                                                    <span className='hidden lg:inline'>Order</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className='px-4 py-6 text-center'>
                                    <p className='text-[#8A8FB9] text-[13px]'>No products found for "<span className='text-[#FB2E86]'>{searchQuery}</span>"</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Search Icon (mobile) */}
                <button
                    className='flex md:hidden items-center justify-center w-8 h-8 cursor-pointer text-[#7E33E0]'
                    onClick={toggleMobileSearch}
                    aria-label="Toggle search"
                >
                    {mobileSearchOpen
                        ? <BiX className='text-[22px]' />
                        : <BiSearch className='text-[22px]' />
                    }
                </button>
            </div>

            {/* Mobile Search Bar */}
            <div className={`md:hidden bg-white transition-all duration-300 relative z-[98] overflow-hidden ${mobileSearchOpen ? 'max-h-[120px]' : 'max-h-0'}`}>
                <div ref={mobileSearchBarRef} className='px-4 pt-3 pb-2'>
                    <div className='flex items-center w-full border border-[#E0D9FF] rounded-[4px] focus-within:border-[#7E33E0] transition-colors bg-white'>
                        <BiSearch className='ml-3 text-[#8A8FB9] text-[18px] flex-shrink-0' />
                        <input
                            ref={mobileInputRef}
                            type="text"
                            placeholder='Search products...'
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowDropdown(true)
                                updateDropdownRect()
                            }}
                            onFocus={() => {
                                if (searchQuery.trim()) setShowDropdown(true)
                                updateDropdownRect()
                            }}
                            className='flex-1 px-3 py-[9px] text-[14px] text-[#151875] outline-none bg-transparent placeholder:text-[#C0C4D8]'
                        />
                        {searchQuery && (
                            <button onClick={clearSearch} className='mr-3 text-[#8A8FB9] hover:text-[#FB2E86] transition-colors'>
                                <BiX className='text-[18px]' />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown — portalled to document.body */}
            {mobileDropdownPortal}
        </div>
    )
}

export default Navbar