import { getSingleCategory, getSubcategories } from '@/api/services/categoriesApi'
import { getProductsBySubcategory } from '@/api/services/productApi'
import ProductCard from '@/app/_component/ProductCard/ProductCard'
import Link from 'next/link'
import React from 'react'

export default async function SubcategoryDetails(props: { params: { id: string; subId: string } }) {
  const params = await props.params
  const { id, subId } = params

  const [category, subcategories, products] = await Promise.all([
    getSingleCategory(id),
    getSubcategories(id),
    getProductsBySubcategory(subId),
  ])

  const subcategory = subcategories.find((s) => s._id === subId)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-sm text-gray-500 mb-5'>
        <Link href='/' className='hover:text-green-600'>Home</Link> /{' '}
        <Link href='/categories' className='hover:text-green-600'>Categories</Link> /{' '}
        <Link href={`/categories/${id}`} className='hover:text-green-600'>{category.name}</Link> /{' '}
        <span className='text-gray-800'>{subcategory?.name ?? 'Products'}</span>
      </div>

      <Link href={`/categories/${id}`} className='inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 mb-5'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to {category.name}
      </Link>

      <h2 className='text-2xl font-bold text-gray-900 mb-1'>{subcategory?.name ?? 'Products'}</h2>
      <p className='text-gray-500 mb-6'>{products.length} products found</p>

      {products.length ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <h3 className='text-center text-gray-500 py-10'>No Products Found In This Subcategory</h3>
      )}
    </div>
  )
}
