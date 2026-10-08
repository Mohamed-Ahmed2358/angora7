import { getAllProducts } from '@/api/services/productApi'
import React from 'react'
import ProductCard from '../ProductCard/ProductCard'

export default async function FeaturedProducts() {

  // call api
  const data = await getAllProducts()

  return (
    <div className='container mx-auto px-4 my-10'>
      <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2 mb-6'>
        <span className='w-1 h-6 bg-green-600 rounded inline-block' />
        Featured <span className='text-green-600'>Products</span>
      </h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
        {data.slice(0, 10).map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  )
}
