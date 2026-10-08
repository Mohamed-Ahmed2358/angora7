import { getSingleBrand } from '@/api/services/brandsApi'
import { getProductsByBrand } from '@/api/services/productApi'
import ProductCard from '@/app/_component/ProductCard/ProductCard'
import Image from 'next/image'
import React from 'react'

export default async function BrandDetails(props: { params: { id: string } }) {
  const params = await props.params
  const { id } = params

  const [brand, products] = await Promise.all([
    getSingleBrand(id),
    getProductsByBrand(id),
  ])

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col items-center gap-3 mb-8'>
        <Image
          src={brand.image}
          alt={brand.name}
          width={220}
          height={220}
          className='w-48 h-48 object-contain'
        />
        <h2 className='text-2xl font-bold text-green-600'>{brand.name}</h2>
      </div>

      {products.length ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <h3 className='text-center text-gray-500 py-10'>No Products Found For This Brand</h3>
      )}
    </div>
  )
}
