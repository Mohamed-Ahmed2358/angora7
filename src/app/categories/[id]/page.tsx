import { getSingleCategory, getSubcategories } from '@/api/services/categoriesApi'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function CategoryDetails(props: { params: { id: string } }) {
  const params = await props.params
  const { id } = params

  const [category, subcategories] = await Promise.all([
    getSingleCategory(id),
    getSubcategories(id),
  ])

  return (
    <div>
      {/* header banner */}
      <div className='bg-gradient-to-r from-green-600 to-green-500'>
        <div className='container mx-auto px-4 pt-4 pb-10'>
          <div className='text-sm text-green-100 mb-4'>
            <Link href='/' className='hover:text-white'>Home</Link> /{' '}
            <Link href='/categories' className='hover:text-white'>Categories</Link> /{' '}
            <span className='text-white'>{category.name}</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 rounded-xl overflow-hidden bg-white/20 shrink-0'>
              <Image src={category.image} alt={category.name} width={100} height={100} className='w-full h-full object-cover' />
            </div>
            <div>
              <h2 className='text-3xl font-bold text-white'>{category.name}</h2>
              <p className='text-green-100 mt-1'>Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <Link href='/categories' className='inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 mb-5'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Categories
        </Link>

        <h3 className='font-bold text-gray-900 mb-5'>{subcategories.length} Subcategories in {category.name}</h3>

        {subcategories.length ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {subcategories.map((sub) => (
              <Link
                href={`/categories/${id}/${sub._id}`}
                key={sub._id}
                className='group bg-white border border-gray-100 rounded-xl p-5 hover:border-green-200 hover:shadow-md transition-all'
              >
                <div className='w-11 h-11 bg-green-50 rounded-lg flex items-center justify-center mb-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                  </svg>
                </div>
                <h4 className='font-semibold text-gray-900 group-hover:text-green-600'>{sub.name}</h4>
                <span className='text-sm text-green-600 inline-flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                  Browse Products
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <h3 className='text-center text-gray-500 py-10'>No Subcategories Found</h3>
        )}
      </div>
    </div>
  )
}
