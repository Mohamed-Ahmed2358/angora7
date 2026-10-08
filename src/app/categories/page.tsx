import { getShopCategory } from '@/api/services/categoriesApi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {

  // call api
  const data = await getShopCategory()

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* breadcrumb */}
      <div className='text-sm text-gray-500 mb-4'>
        <Link href='/' className='hover:text-green-600'>Home</Link> / <span className='text-gray-800'>Categories</span>
      </div>

      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-gray-900'>All Categories</h2>
        <p className='text-gray-500 mt-1'>Browse our wide range of product categories</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((category) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center gap-3"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded-md"
            />
            <h4 className="text-center font-medium text-gray-800">{category.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  )
}
