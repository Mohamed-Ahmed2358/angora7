'use client'
import { ProductType } from '@/api/types/productType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddBtn from '../AddBtn/AddBtn'
import WishlistBtn from '../WishlistBtn/WishlistBtn'
import { toast } from '@/components/ui/toast'

export default function ProductCard({ product }: { product: ProductType }) {

  // Only treat it as a real discount when priceAfterDiscount is a positive
  // number that's actually lower than price. The API sometimes sends
  // priceAfterDiscount: 0, which must NOT be displayed as "0 EGP".
  const hasDiscount = !!product.priceAfterDiscount && product.priceAfterDiscount < product.price
  const discount = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0

  return (
    <>
      <div className="my-2">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow p-3">

          {/* Image row: picture on the left, plain icon rail on the right */}
          <div className="flex gap-1">
            <div className="relative flex-1 min-w-0">
              {discount > 0 && (
                <span className="absolute top-0 left-0 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}
              <Link href={`/productDetails/${product._id}`}>
                <Image
                  width={300}
                  height={220}
                  src={product.imageCover}
                  alt={product.title}
                  className="object-contain w-full h-40"
                />
              </Link>
            </div>

            {/* icon rail */}
            <div className="flex flex-col justify-between items-center py-1 shrink-0 w-6">
              <WishlistBtn
                prodId={product._id}
                cls="text-gray-400 hover:text-red-500"
              />
              <button
                onClick={() => toast.add({ type: 'info', description: 'Compare is coming soon' })}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <Link
                href={`/productDetails/${product._id}`}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-3">
            <p className="uppercase text-gray-400 text-xs font-medium">
              {product.category?.name}
            </p>
            <Link href={`/productDetails/${product._id}`}>
              <h3 className="text-gray-800 font-medium text-sm line-clamp-1 hover:text-green-600 mt-0.5">
                {product.title}
              </h3>
            </Link>

            {/* Ratings */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3.5 w-3.5 ${star <= Math.round(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {product.ratingsAverage} ({product.ratingsQuantity})
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-end justify-between mt-2">
              <div className="flex items-baseline gap-2">
                {hasDiscount ? (
                  <>
                    <span className="text-gray-900 text-base font-semibold">{product.priceAfterDiscount} EGP</span>
                    <span className="text-gray-400 text-xs line-through">{product.price} EGP</span>
                  </>
                ) : (
                  <span className="text-gray-900 text-base font-semibold">{product.price} EGP</span>
                )}
              </div>
              <AddBtn
                prodId={product._id}
                child={
                  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5v14" />
                  </svg>
                }
                cls="w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center shadow text-white shrink-0"
              />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
