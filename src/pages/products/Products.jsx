import { useState } from 'react'
import { FeaturedProducts, LatestProducts, TrendingProducts } from '../../data/MockData'
import LatestProductCard from '../../components/latest-product-card/LatestProductCard'
import FeaturedCard from '../../components/featured-card/FeaturedCard'

const allProducts = [
    ...LatestProducts.map(p => ({ ...p, source: 'latest' })),
    ...FeaturedProducts.map(p => ({ ...p, source: 'featured' })),
    ...TrendingProducts.map(p => ({ ...p, source: 'trending' })),
]

const categories = ['All', ...new Set(allProducts.map(p => p.category).filter(Boolean))]

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const [sortBy, setSortBy] = useState('default')
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = allProducts
        .filter(p => activeCategory === 'All' || p.category === activeCategory)
        .filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            const priceA = parseFloat((a.price || a.newPrice || '0').toString().replace(/[^0-9.]/g, ''))
            const priceB = parseFloat((b.price || b.newPrice || '0').toString().replace(/[^0-9.]/g, ''))
            if (sortBy === 'price-asc') return priceA - priceB
            if (sortBy === 'price-desc') return priceB - priceA
            return 0
        })

    return (
        <div>

            {/* Page Header */}
            <div className='bg-[#F2F0FF] py-10 text-center'>
                <h1 className='text-[#1A0B5B] font-bold md:text-[40px] text-[20px]'>All Products</h1>
                <p className='text-[#8A8FB9] mt-2 text-[14px]'>Browse our full collection — fashion for every vibe</p>
            </div>

            <div className='max-w-[1200px] mx-auto px-3 md:px-0 mt-10'>

                {/* Search + Sort Bar */}
                <div className='flex flex-col md:flex-row items-center justify-between gap-4 mb-8'>
                    <input
                        type="text"
                        placeholder='Search products...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='border border-[#E0D9FF] rounded-[4px] px-4 py-2 w-full md:w-[300px] text-sm text-[#151875] outline-none focus:border-[#FB2E86]'
                    />
                    {/* <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='border border-[#E0D9FF] rounded-[4px] px-4 py-2 text-sm text-[#151875] outline-none cursor-pointer focus:border-[#FB2E86]'
                    >
                        <option value="default">Sort: Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select> */}
                </div>

                {/* Category Tabs */}
                {/* <div className='flex items-center flex-wrap gap-4 mb-10 text-[#151875] text-[14px]'>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-[2px] transition-all duration-200 ${
                                activeCategory === cat
                                    ? 'bg-[#FB2E86] text-white'
                                    : 'bg-[#F2F0FF] text-[#151875] hover:bg-[#FB2E86] hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div> */}

                {/* Results Count */}
                <p className='text-[#8A8FB9] text-sm mb-3'>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>

                {/* Products Grid */}
                {filtered.length > 0 ? (
                    <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mb-[5rem]'>
                        {filtered.map((product, index) => (
                                <LatestProductCard
                                    key={`${product.source}-${product.id ?? index}`}
                                    product={product}
                                    allProducts={filtered}   // 👈 pass the full list
                                    productIndex={index}     // 👈 pass current index
                                />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-20'>
                        <p className='text-[#8A8FB9] text-lg'>No products found for "<span className='text-[#FB2E86]'>{searchQuery}</span>"</p>
                        <button
                            onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
                            className='mt-4 bg-[#FB2E86] text-white px-6 py-2 rounded-[2px] text-sm'
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products