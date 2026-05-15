import { useEffect, useState } from 'react'
import { HeroData, FeaturedProducts, LatestProductTabHeaders, LatestProducts, Offers, TrendingProducts, TrendingExtraProducts } from '../../data/MockData'
import { SlideRight } from '../../utils/animation'
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import FeaturedCard from '../../components/featured-card/FeaturedCard'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import LatestProductCard from '../../components/latest-product-card/LatestProductCard'
import OfferCard from '../../components/offer-card/OfferCard'
import TrendingProductsCard from '../../components/trending-products-card/TrendingProductsCard'
import { Link } from 'react-router-dom'
import TrendingProductsExtraCard from '../../components/trending-products-extra-card/TrendingProductsExtraCard'


const Home = () => {

    const [activeData, setActiveData] = useState(HeroData[0])
    const [currentIndex, setCurrentIndex] = useState(0);

    const [activeTab, setActiveTab] = useState(LatestProductTabHeaders[0])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex])

    useEffect(() => {
        setActiveData(HeroData[currentIndex])
    }, [currentIndex])

    const SampleNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div onClick={onClick}>
                <IoIosArrowForward className="custom-arrow-next" style={{ color: "black" }} />
            </div>
        )
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div onClick={onClick}>
                <MdOutlineArrowBackIos className="custom-arrow-prev" style={{ color: "black" }} />
            </div>
        )
    }

    let settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        autoplaySpeed: 1000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        // FIX 1: overflow-x-hidden on the root div stops cloned Swiper slides
        // from creating horizontal scroll, and also prevents modals from
        // inheriting an offset paint layer that makes them appear misaligned.
        <div className="overflow-x-hidden">

            <div className='bg-[#F2F0FF] relative'>
                <img src="/images/lamp.svg" className='absolute top-[-85px] left-[-60px] hidden xl:block' alt="" />
                <section className='flex md:justify-between items-center flex-col md:flex-row h-screen md:h-[650px] relative max-w-[1600px] mx-auto px-[4rem] gap-5'>
                    <div className='py-14 md:pb-0 md:pt-[6rem] lg:w-[45%] md:w-[70%] w-[98%]'>
                        <div className='text-center md:text-left'>
                            <AnimatePresence mode='wait'>
                                <motion.p
                                    className='text-[#FB2E86] text-sm lg:text-[16px] capitalize'
                                    key={activeData.id}
                                    variants={SlideRight(0.2)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    transition={{ ease: easeInOut, duration: 0.5 }}
                                >
                                    {activeData.subtitle}
                                </motion.p>
                            </AnimatePresence>
                            <AnimatePresence mode='wait'>
                                <motion.h1
                                    className='text-3xl lg:text-4xl xl:text-5xl font-bold xl:leading-[65px] my-3 capitalize'
                                    key={activeData.id}
                                    variants={SlideRight(0.4)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    transition={{ ease: easeInOut, duration: 0.5 }}
                                >
                                    {activeData.title}
                                </motion.h1>
                            </AnimatePresence>
                            <AnimatePresence mode='wait'>
                                <motion.p
                                    className='text-[#8A8FB9] text-sm lg:text-[16px]'
                                    key={activeData.id}
                                    variants={SlideRight(0.6)}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    transition={{ ease: easeInOut, duration: 0.5 }}
                                >
                                    {activeData.description}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className='relative'>
                        <AnimatePresence>
                            <motion.img
                                src={activeData.image} alt="" className='lg:w-[500px] md:w-[300px] w-[400px] relative z-10'
                                key={activeData.id}
                                variants={SlideRight(0.4)}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                transition={{ ease: easeInOut, duration: 0.5 }}
                            />
                        </AnimatePresence>
                        <p className='text-[300px] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 font-extrabold'>{activeData.modal}</p>
                    </div>
                </section>
            </div>

            <section className='mt-[7rem] max-w-[1200px] mx-auto px-5 md:px-0'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='text-center text-[#1A0B5B] font-bold md:text-[40px] text-[20px]'>Featured Products</h1>
                        <p className='text-center text-[#8A8FB9] hidden md:block'>Discover our curated collection of featured products</p>
                    </div>
                    <Link to="/products" className='text-[#151875] font-bold cursor-pointer underline'>View all</Link>
                </div>

                {/* FIX 2: overflow-hidden wrapper clips Swiper's cloned slides that
                    spill outside the track during the continuous autoplay loop.
                    Without this, those clones extend beyond the viewport and create
                    a horizontal scrollbar (and break fixed/absolute modals). */}
                <div className='mt-[2rem] flex items-center justify-center overflow-hidden'>
                    <Swiper
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        loop={true}
                        speed={3000}
                        slidesPerView={3}
                        spaceBetween={30}
                        navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
                        pagination={false}
                        modules={[Navigation, Pagination, Autoplay]}
                        // FIX 3: !overflow-hidden on the Swiper itself ensures the
                        // component's own inline styles don't override the clipping.
                        className="mySwiper !overflow-hidden"
                    >
                        {
                            FeaturedProducts.map(card => {
                                return (
                                    <SwiperSlide key={card.id}>
                                        <FeaturedCard card={card} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </section>

            <section className='mt-[7rem] max-w-[1200px] mx-auto px-3 md:px-0'>
                <h1 className='text-center text-[#1A0B5B] font-bold md:text-[40px] text-[20px]'>Latest Products</h1>
                <div className='flex items-center justify-center mt-2 text-[#151875] md:gap-10 gap-5'>
                    {
                        LatestProductTabHeaders.map(header => {
                            return (
                                <p
                                    key={header}
                                    className={activeTab === header ? 'text-[#FB2E86] underline cursor-pointer md:text-[16px] text-[12px]' : 'md:text-[16px] text-[12px] cursor-pointer'}
                                    onClick={() => setActiveTab(header)}
                                >
                                    {header}
                                </p>
                            )
                        })
                    }
                </div>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 md:mt-10 mt-6'>
                    {
                        LatestProducts.filter(product => activeTab === "All" || product.category === activeTab).map((product, index) => {
                            return (
                                <LatestProductCard
                                    key={`${product.source}-${product.id ?? index}`}
                                    product={product}
                                    allProducts={LatestProducts}
                                    productIndex={index}
                                />
                            )
                        })
                    }
                </div>
            </section>

            <section className='mt-[7rem] max-w-[1200px] mx-auto px-10 md:px-0'>
                <h1 className='text-center text-[#1A0B5B] font-bold md:text-[40px] text-[20px]'>What We Offer.</h1>
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 mt-[2rem]'>
                    {
                        Offers.map(offer => {
                            return (
                                <OfferCard key={offer.id} offer={offer} />
                            )
                        })
                    }
                </div>
            </section>

            <section className='bg-[#F1F0FF] mt-[7rem]'>
                <div className='max-w-[1200px] mx-auto px-5 md:px-0 flex items-center justify-center md:gap-[4rem] gap-[2rem] py-[2rem] flex-col md:flex-row'>
                    <img src="/images/29.jpeg" alt="" className='w-[400px]' />
                    <div className='md:w-[450px]'>
                        <h1 className='text-[#151875] md:text-[28px] text-[18px]'>Unique Features Of Our Latest Co-Ord Set Collection</h1>
                        <ul className='text-[#ACABC3] text-[14px] mb-7 mt-4'>
                            <li className='flex items-center gap-2'><span className='bg-[#F52B70] p-1 rounded-full'></span> Perfectly matched top and trouser sets available in 5 rich colours — green, khaki, brown, black & white</li>
                            <li className='flex items-center gap-2 my-2'><span className='bg-[#2B2BF5] p-1 rounded-full'></span> Lace-up neckline design with subtle embroidery detail — effortlessly stylish for any occasion</li>
                            <li className='flex items-center gap-2'><span className='bg-[#2BF5CC] p-1 rounded-full'></span> Relaxed, breathable fabric with an elastic waistband — comfort and style in one clean look</li>
                        </ul>
                        <div className='flex items-center gap-3'>
                            <button className='bg-[#FB2E86] text-white py-[9px] px-8 rounded-[2px]'>Add To Cart</button>
                            <div className='text-[#151875] text-[14px]'>
                                <p>Unisex Co-Ord Set</p>
                                <p className='font-[300]'>$40.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mt-[7rem] max-w-[1200px] mx-auto px-4 md:px-0'>
                <h1 className='text-center text-[#1A0B5B] font-bold md:text-[40px] text-[20px]'>Trending Products</h1>
                <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-5'>
                    {
                        TrendingProducts.map(card => {
                            return (
                                <TrendingProductsCard key={card.id} card={card} />
                            )
                        })
                    }
                </div>
                <div className='flex items-center justify-center mt-7'>
                    <Link to="/products" className='text-[#151875] font-bold cursor-pointer underline'>See more</Link>
                </div>
            </section>

        </div>
    )
}

export default Home