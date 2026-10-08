'use client'
import { ProductType } from '@/api/types/productType'
import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart } from '@/api/actions/cartActions/addToCart'
import { updateCart } from '@/api/actions/updateCartItem'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import WishlistBtn from '../WishlistBtn/WishlistBtn'
import ProductGallery from '../ProductGallery/ProductGallery'
import ProductCard from '../ProductCard/ProductCard'
import Link from 'next/link'

export default function ProductDetailsView({ product, related }: { product: ProductType; related: ProductType[] }) {
  const router = useRouter()
  const query = useQueryClient()
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'details' | 'reviews' | 'shipping'>('details')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Only treat it as a real discount when priceAfterDiscount is a positive
  // number that's actually lower than price. The API sometimes sends
  // priceAfterDiscount: 0, which must NOT be displayed as "0 EGP" (also why
  // we use `||` below, not `??`: 0 is falsy and should fall back to price).
  const hasDiscount = !!product.priceAfterDiscount && product.priceAfterDiscount < product.price
  const discount = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount!) / product.price) * 100)
    : 0

  const unitPrice = hasDiscount ? product.priceAfterDiscount! : product.price
  const totalPrice = (unitPrice * qty).toFixed(2)

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: async () => {
      const first = await addToCart(product._id)
      if (qty > 1) {
        await updateCart({ prodId: product._id, count: qty })
      }
      return first
    },
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Product Added To Cart Successfully' })
      query.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Login first' })
    },
  })

  const { mutate: buyNowMutate, isPending: isBuying } = useMutation({
    mutationFn: async () => {
      const first = await addToCart(product._id)
      if (qty > 1) {
        await updateCart({ prodId: product._id, count: qty })
      }
      return first
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['getCart'] })
      router.push('/cart')
    },
    onError: () => {
      toast.add({ type: 'error', description: 'Login first' })
    },
  })

  function scrollRelated(dir: 1 | -1) {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  return (
    <div className='container mx-auto px-4 py-6'>
      {/* Breadcrumb */}
      <div className='text-sm text-gray-500 mb-4 flex items-center gap-1.5 flex-wrap'>
        <Link href='/' className='hover:text-green-600'>Home</Link>
        <span>/</span>
        <Link href={`/categories/${product.category?._id}`} className='hover:text-green-600'>{product.category?.name}</Link>
        {product.subcategory?.[0] && (
          <>
            <span>/</span>
            <span>{product.subcategory[0].name}</span>
          </>
        )}
        <span>/</span>
        <span className='text-gray-800'>{product.title}</span>
      </div>

      <div className='grid md:grid-cols-2 gap-10'>
        {/* Gallery */}
        <ProductGallery images={product.images?.length ? product.images : [product.imageCover]} title={product.title} />

        {/* Info panel */}
        <div>
          <div className='flex gap-2 mb-3'>
            <span className='text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>{product.category?.name}</span>
            <span className='text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>{product.brand?.name}</span>
          </div>

          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>{product.title}</h1>

          <div className='flex items-center gap-1.5 mt-2'>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${star <= Math.round(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                </svg>
              ))}
            </div>
            <span className='text-sm text-gray-500'>{product.ratingsAverage} ({product.ratingsQuantity} reviews)</span>
          </div>

          <div className='flex items-center gap-3 mt-4'>
            {hasDiscount ? (
              <>
                <span className='text-2xl font-bold text-gray-900'>{product.priceAfterDiscount} EGP</span>
                <span className='text-gray-400 line-through'>{product.price} EGP</span>
                <span className='bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full'>Save {discount}%</span>
              </>
            ) : (
              <span className='text-2xl font-bold text-gray-900'>{product.price} EGP</span>
            )}
          </div>

          <div className='flex items-center gap-1.5 mt-3 text-sm text-green-600 font-medium'>
            <span className='w-2 h-2 bg-green-500 rounded-full' /> In Stock
          </div>

          <p className='text-gray-500 mt-4 leading-relaxed'>{product.description}</p>

          {/* Quantity */}
          <div className='mt-6'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Quantity</p>
            <div className='flex items-center gap-4'>
              <div className='flex items-center border border-gray-200 rounded-lg'>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className='w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50'
                >
                  −
                </button>
                <span className='w-10 text-center text-sm font-medium'>{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.quantity || 99, q + 1))}
                  className='w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50'
                >
                  +
                </button>
              </div>
              <span className='text-sm text-gray-400'>{product.quantity} available</span>
            </div>
          </div>

          {/* Total price */}
          <div className='flex items-center justify-between mt-5 pt-5 border-t border-gray-100'>
            <span className='text-gray-500'>Total Price:</span>
            <span className='text-xl font-bold text-gray-900'>{totalPrice} EGP</span>
          </div>

          {/* CTA buttons */}
          <div className='flex gap-3 mt-5'>
            <button
              onClick={() => addMutate()}
              disabled={isAdding}
              className='flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-semibold disabled:opacity-60'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0Zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0Z" />
              </svg>
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              onClick={() => buyNowMutate()}
              disabled={isBuying}
              className='flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-3 font-semibold disabled:opacity-60'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              {isBuying ? 'Processing...' : 'Buy Now'}
            </button>
          </div>

          <div className='flex items-center gap-3 mt-3'>
            <WishlistBtn
              prodId={product._id}
              label='Add to Wishlist'
              toggle
              cls='flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 rounded-lg py-3 font-semibold hover:bg-gray-50'
            />
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.title, url: window.location.href }).catch(() => {})
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  toast.add({ type: 'success', description: 'Link copied to clipboard' })
                }
              }}
              className='w-12 h-12 shrink-0 border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
          </div>

          {/* Trust row */}
          <div className='grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100'>
            <div className='flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.83H14.25M16.5 18.75h-2.25m0-11.177v-.443c0-1.132-.912-2.05-2.043-2.08a23.949 23.949 0 00-5.454 0c-1.131.03-2.043.948-2.043 2.08v.443M16.5 7.5l-3.75-3.75m0 0L9 7.5m3.75-3.75v11.177" />
              </svg>
              <div>
                <p className='text-xs font-semibold text-gray-700'>Free Delivery</p>
                <p className='text-[11px] text-gray-400'>Orders over 500</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <div>
                <p className='text-xs font-semibold text-gray-700'>30 Days Return</p>
                <p className='text-[11px] text-gray-400'>Money back</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div>
                <p className='text-xs font-semibold text-gray-700'>Secure Payment</p>
                <p className='text-[11px] text-gray-400'>100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='mt-10'>
        <div className='flex gap-6 border-b border-gray-200'>
          {([
            ['details', 'Product Details'],
            ['reviews', `Reviews (${product.ratingsQuantity})`],
            ['shipping', 'Shipping & Returns'],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`pb-3 text-sm font-medium border-b-2 -mb-px ${tab === key ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className='py-6'>
          {tab === 'details' && (
            <div>
              <h3 className='font-semibold text-gray-900 mb-2'>About this Product</h3>
              <p className='text-gray-500 leading-relaxed mb-6'>{product.description}</p>

              <div className='grid sm:grid-cols-2 gap-8'>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>Product Information</h4>
                  <dl className='text-sm divide-y divide-gray-100'>
                    <div className='flex justify-between py-2'>
                      <dt className='text-gray-500'>Category</dt>
                      <dd className='text-gray-800 font-medium'>{product.category?.name}</dd>
                    </div>
                    <div className='flex justify-between py-2'>
                      <dt className='text-gray-500'>Subcategory</dt>
                      <dd className='text-gray-800 font-medium'>{product.subcategory?.[0]?.name ?? '—'}</dd>
                    </div>
                    <div className='flex justify-between py-2'>
                      <dt className='text-gray-500'>Brand</dt>
                      <dd className='text-gray-800 font-medium'>{product.brand?.name}</dd>
                    </div>
                    <div className='flex justify-between py-2'>
                      <dt className='text-gray-500'>Items Sold</dt>
                      <dd className='text-gray-800 font-medium'>{product.sold}+ sold</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>Key Features</h4>
                  <ul className='text-sm text-gray-600 flex flex-col gap-2'>
                    {['Premium Quality Product', '100% Authentic Guarantee', 'Fast & Secure Packaging', 'Quality Tested'].map((f) => (
                      <li key={f} className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 text-green-600 shrink-0">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className='flex items-center gap-4'>
              <div className='text-center'>
                <p className='text-4xl font-bold text-gray-900'>{product.ratingsAverage}</p>
                <div className='flex justify-center my-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${star <= Math.round(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
                    </svg>
                  ))}
                </div>
                <p className='text-sm text-gray-400'>{product.ratingsQuantity} reviews</p>
              </div>
              <p className='text-sm text-gray-500'>
                Individual review text isn&apos;t provided by the store&apos;s API — this summary reflects the aggregate rating.
              </p>
            </div>
          )}

          {tab === 'shipping' && (
            <div className='text-sm text-gray-600 flex flex-col gap-2'>
              <p>• Free delivery on orders over 500 EGP, otherwise standard shipping fees apply.</p>
              <p>• Orders are typically delivered within 2–5 business days.</p>
              <p>• Items can be returned within 30 days of delivery in their original condition.</p>
              <p>• Refunds are processed back to the original payment method within 5–7 business days.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className='mt-10'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
              <span className='w-1 h-6 bg-green-600 rounded inline-block' />
              You May Also <span className='text-green-600'>Like</span>
            </h2>
            <div className='flex gap-2'>
              <button onClick={() => scrollRelated(-1)} className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button onClick={() => scrollRelated(1)} className='w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className='flex gap-4 overflow-x-auto scroll-smooth pb-2'>
            {related.map((p) => (
              <div key={p._id} className='w-48 shrink-0'>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
