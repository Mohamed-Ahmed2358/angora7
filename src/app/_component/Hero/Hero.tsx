'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import Link from 'next/link'
import veggies from '../../../assets/images/slider-2.jpeg'
import bread from '../../../assets/images/grocery-banner-2.jpeg'
import wafer from '../../../assets/images/slider-image-2.jpeg'
import chocolate from '../../../assets/images/slider-image-3.jpeg'

// These images are shot with built-in negative space on the left for text,
// so slides use dark text on a light scrim instead of white text on a dark one.
const slides = [
  {
    image: veggies,
    title: 'Fresh Products Delivered to your Door',
    subtitle: 'Get 20% off your first order',
  },
  {
    image: bread,
    title: 'Freshly Baked, Every Morning',
    subtitle: 'Artisan bread and pastries delivered warm',
  },
  {
    image: wafer,
    title: 'Sweet Treats You\u2019ll Love',
    subtitle: 'Try our Red Velvet wafer rolls today',
  },
  {
    image: chocolate,
    title: 'Indulge in Rich Chocolate',
    subtitle: 'Premium Belgian chocolate, freshly stocked',
  },
]

export default function Hero() {
  return (
    <div className='relative group'>
      <button className='hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/70 hover:bg-white shadow-sm backdrop-blur-sm flex items-center justify-center text-gray-700'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button className='hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/70 hover:bg-white shadow-sm backdrop-blur-sm flex items-center justify-center text-gray-700'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        pagination={{
          clickable: true,
          renderBullet(_index, className) {
            return `<span class='${className} bg-gray-400! w-2.5! h-2.5! opacity-60!'></span>`
          },
          bulletActiveClass: 'w-7! opacity-100! !bg-green-600 rounded-full!',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className='relative h-[320px] md:h-[400px] w-full bg-gray-50'>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent' />
            <div className='relative z-10 h-full container mx-auto px-6 flex flex-col justify-center gap-4 max-w-xl'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 leading-tight'>
                {slide.title}
              </h1>
              <p className='text-gray-600 text-lg'>{slide.subtitle}</p>
              <div className='flex gap-3 mt-2'>
                <Link
                  href='/shop'
                  className='bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors'
                >
                  Shop Now
                </Link>
                <Link
                  href='/shop'
                  className='border border-gray-800 text-gray-800 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-colors'
                >
                  View Deals
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
