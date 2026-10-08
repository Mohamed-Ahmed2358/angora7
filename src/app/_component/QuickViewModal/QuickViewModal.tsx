'use client'
import { ProductType } from '@/api/types/productType'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import AddBtn from '../AddBtn/AddBtn'
import WishlistBtn from '../WishlistBtn/WishlistBtn'

export default function QuickViewModal({ product, onClose }: { product: ProductType; onClose: () => void }) {

  // close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative grid sm:grid-cols-2 gap-6 p-6'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <Image
          src={product.imageCover}
          alt={product.title}
          width={300}
          height={300}
          className='w-full h-56 sm:h-full object-contain'
        />

        <div className='flex flex-col'>
          <p className='text-gray-400 text-xs uppercase font-medium'>{product.category?.name}</p>
          <h2 className='text-lg font-semibold text-gray-900 mt-1'>{product.title}</h2>

          <div className='flex items-center gap-1 mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
            </svg>
            <span className='text-sm text-gray-500'>{product.ratingsAverage} ({product.ratingsQuantity} reviews)</span>
          </div>

          <div className='flex items-baseline gap-2 mt-3'>
            {product.priceAfterDiscount ? (
              <>
                <span className='text-xl font-bold text-gray-900'>{product.priceAfterDiscount} EGP</span>
                <span className='text-gray-400 text-sm line-through'>{product.price} EGP</span>
              </>
            ) : (
              <span className='text-xl font-bold text-gray-900'>{product.price} EGP</span>
            )}
          </div>

          <p className='text-sm text-gray-500 mt-3 line-clamp-4'>{product.description}</p>

          <div className='flex items-center gap-3 mt-auto pt-4'>
            <AddBtn
              prodId={product._id}
              child={<>Add to Cart</>}
              cls='flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold'
            />
            <WishlistBtn
              prodId={product._id}
              cls='w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50'
            />
          </div>

          <Link
            href={`/productDetails/${product._id}`}
            className='text-center text-sm text-green-600 hover:underline mt-3'
          >
            View full details
          </Link>
        </div>
      </div>
    </div>
  )
}
