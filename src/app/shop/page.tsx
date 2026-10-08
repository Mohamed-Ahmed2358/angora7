import { getAllProducts } from '@/api/services/productApi'
import ProductCard from '../_component/ProductCard/ProductCard'
import Link from 'next/link'
import React from 'react'

export default async function Shop(props: { searchParams: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams
  const search = searchParams.search?.trim()

  // call api
  const data = await getAllProducts(search)

  return (
    <div>
      {/* header banner */}
      <div className='bg-green-600'>
        <div className='container mx-auto px-4 pt-4 pb-10'>
          <div className='text-sm text-green-100 mb-4'>
            <Link href='/' className='hover:text-white'>Home</Link> / <span className='text-white'>All Products</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <div>
              <h2 className='text-3xl font-bold text-white'>{search ? `Results for "${search}"` : 'All Products'}</h2>
              <p className='text-green-100 mt-1'>{search ? 'Products matching your search' : 'Explore our complete product collection'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-gray-500'>Showing {data.length} products</p>
          {search && (
            <Link href='/shop' className='text-sm text-green-600 hover:underline inline-flex items-center gap-1'>
              Clear search
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          )}
        </div>

        {data.length ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {data.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <div className='text-center py-20'>
            <p className='text-gray-500'>No products found{search ? ` for "${search}"` : ''}.</p>
          </div>
        )}
      </div>
    </div>
  )
}
