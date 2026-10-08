import { getAllBrands } from '@/api/services/brandsApi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Brands() {

  // call api
  const data = await getAllBrands()

  return (
    <div>
      {/* header banner */}
      <div className='bg-gradient-to-r from-purple-600 to-indigo-600'>
        <div className='container mx-auto px-4 pt-4 pb-10'>
          <div className='text-sm text-purple-100 mb-4'>
            <Link href='/' className='hover:text-white'>Home</Link> / <span className='text-white'>Brands</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <div>
              <h2 className='text-3xl font-bold text-white'>Top Brands</h2>
              <p className='text-purple-100 mt-1'>Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {data.map((brand) => (
            <Link
              href={`/brands/${brand._id}`}
              key={brand._id}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5 flex flex-col items-center gap-3"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={160}
                height={160}
                className="w-full h-24 object-contain"
              />
              <h4 className="text-center text-sm text-gray-500">{brand.name}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
