import { getShopCategory } from '@/api/services/categoriesApi'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ShopCategory() {
  // call api
  const data = await getShopCategory()

  return (
    <div className='container mx-auto px-4 my-10'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
          <span className='w-1 h-6 bg-green-600 rounded inline-block' />
          Shop By <span className='text-green-600'>Category</span>
        </h2>
        <Link href='/categories' className='text-sm text-gray-500 hover:text-green-600 inline-flex items-center gap-1'>
          View All Categories
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="flex flex-col items-center gap-3 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-green-100 transition-all group"
          >
            <div className='w-16 h-16 rounded-full overflow-hidden shrink-0'>
              <Image
                className='w-full h-full object-cover'
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
              />
            </div>
            <h4 className='text-sm text-gray-700 text-center group-hover:text-green-600'>{category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  )
}
