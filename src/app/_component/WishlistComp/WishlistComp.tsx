'use client'
import { removeFromWishlist } from '@/api/actions/wishlistActions/removeFromWishlist'
import { addToCart } from '@/api/actions/cartActions/addToCart'
import { WishlistResponseType } from '@/api/types/wishlistType'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function WishlistComp() {
  const query = useQueryClient()

  const { data: wishlistData, isLoading } = useQuery<WishlistResponseType>({
    queryKey: ['getWishlist'],
    queryFn: async () => {
      const response = await fetch('/api/wishlist')
      if (!response.ok) throw new Error('faild To Fetch')
      return response.json()
    }
  })

  // remove
  const { mutate: removeItem } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: 'Product Removed From Wishlist',
      })
      query.invalidateQueries({ queryKey: ['getWishlist'] })
    },
    onError: () => {
      toast.add({
        type: "error",
        description: 'Failed',
      })
    }
  })

  // add to cart
  const { mutate: moveToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: 'Product Added To Cart Successfully',
      })
      query.invalidateQueries({ queryKey: ['getCart'] })
    },
    onError: () => {
      toast.add({
        type: "error",
        description: 'Failed',
      })
    }
  })

  if (isLoading) {
    return <h2 className="text-center py-10">Loading......</h2>
  }

  return (
    <>
      {wishlistData?.count ? (
        <section className="w-full bg-white py-9 px-4 md:px-8">
          <div className='text-sm text-gray-500 mb-4 max-w-7xl mx-auto'>
            <Link href='/' className='hover:text-green-600'>Home</Link> / <span className='text-gray-800'>Wishlist</span>
          </div>
          <h1 className="text-center text-[#191919] text-[32px] font-semibold leading-[38px]">
            My Wishlist
          </h1>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full bg-white rounded-xl">
              <thead>
                <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
                  <th className="text-left px-2 py-2">Product</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2" />
                  <th className="w-7 px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {wishlistData?.data.map((product) => (
                  <tr key={product._id} className="text-center border-b border-gray-100">
                    <td className="px-2 py-2 text-left align-middle">
                      <Link href={`/productDetails/${product._id}`} className="flex items-center gap-3">
                        <Image
                          src={product.imageCover}
                          alt={product.title}
                          width={80}
                          height={80}
                          className="w-[80px] h-[80px] object-contain"
                        />
                        <span className="line-clamp-1">{product.title}</span>
                      </Link>
                    </td>
                    <td className="px-2 py-2">
                      {product.priceAfterDiscount && product.priceAfterDiscount < product.price
                        ? product.priceAfterDiscount
                        : product.price} EGP
                    </td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => moveToCart(product._id)}
                        className="cursor-pointer px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-full hover:bg-green-700"
                      >
                        Add To Cart
                      </button>
                    </td>
                    <td className="px-2 py-2">
                      <svg
                        onClick={() => removeItem(product._id)}
                        width={24}
                        className="cursor-pointer inline-block"
                        height={25}
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 23.5C18.0748 23.5 23 18.5748 23 12.5C23 6.42525 18.0748 1.5 12 1.5C5.92525 1.5 1 6.42525 1 12.5C1 18.5748 5.92525 23.5 12 23.5Z" stroke="#CCCCCC" strokeMiterlimit={10} />
                        <path d="M16 8.5L8 16.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 16.5L8 8.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-28 gap-3 text-center px-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-14 text-gray-300 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h2>
          <p className="text-gray-500 max-w-sm">
            Browse products and save your favorites here. Sign in to sync your wishlist across devices.
          </p>
          <Link
            href="/shop"
            className="w-full max-w-md mt-4 py-3.5 bg-green-600 text-white rounded-lg text-base font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
          >
            Browse Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Link>
          <Link href="/login" className="mt-2 text-gray-800 font-medium hover:text-green-600">
            Sign In
          </Link>
        </div>
      )}
    </>
  )
}
