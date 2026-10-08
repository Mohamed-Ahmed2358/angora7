import Link from 'next/link'
import React from 'react'

export default function PromoBanners() {
  return (
    <div className='container mx-auto px-4 my-10 grid md:grid-cols-2 gap-6'>

      {/* Deal of the Day */}
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 p-8 text-white'>
        <div className='absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full' />
        <span className='inline-flex items-center gap-1.5 bg-white/20 text-xs font-semibold px-3 py-1 rounded-full'>
          🔥 Deal of the Day
        </span>
        <h3 className='text-2xl font-bold mt-4'>Fresh Organic Fruits</h3>
        <p className='text-white/90 mt-1'>Get up to 40% off on selected organic fruits</p>
        <p className='text-3xl font-bold mt-4'>
          40% OFF <span className='text-sm font-medium text-white/80 align-middle'>Use code: ORGANIC40</span>
        </p>
        <Link
          href='/shop'
          className='relative z-10 inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-2.5 rounded-full mt-5 hover:bg-gray-100'
        >
          Shop Now
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* New Arrivals */}
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white'>
        <div className='absolute -right-8 -bottom-10 w-40 h-40 bg-white/10 rounded-full' />
        <span className='inline-flex items-center gap-1.5 bg-white/20 text-xs font-semibold px-3 py-1 rounded-full'>
          ⚡ New Arrivals
        </span>
        <h3 className='text-2xl font-bold mt-4'>Exotic Vegetables</h3>
        <p className='text-white/90 mt-1'>Discover our latest collection of premium vegetables</p>
        <p className='text-3xl font-bold mt-4'>
          25% OFF <span className='text-sm font-medium text-white/80 align-middle'>Use code: FRESH25</span>
        </p>
        <Link
          href='/shop'
          className='relative z-10 inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-2.5 rounded-full mt-5 hover:bg-gray-100'
        >
          Explore Now
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
