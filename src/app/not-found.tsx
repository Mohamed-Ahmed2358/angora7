import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import errorImg from '../assets/error.svg'

export default function NotFound() {
  return (
    <div className='container mx-auto px-4 py-16 flex flex-col items-center text-center'>
      <Image src={errorImg} alt='Page not found' className='w-full max-w-xl h-auto' priority />

      <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mt-6'>Oops! Page not found</h1>
      <p className='text-gray-500 mt-2 max-w-md'>
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      <div className='flex flex-wrap items-center justify-center gap-3 mt-6'>
        <Link
          href='/'
          className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold'
        >
          Back to Home
        </Link>
        <Link
          href='/shop'
          className='border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg text-sm font-semibold'
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
