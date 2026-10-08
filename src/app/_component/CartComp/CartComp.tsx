'use client'
import { clearCart } from '@/api/actions/cartActions/clearCart.action'
import { getCart } from '@/api/actions/cartActions/getCart'
import { deleteCartItem } from '@/api/actions/deleteCartItem'
import { updateCart } from '@/api/actions/updateCartItem'
import { CartResponseType } from '@/api/types/cartType'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CartComp() {
  const query = useQueryClient()

  const { data: cartData, isLoading } = useQuery<CartResponseType>({
    queryKey: ['getCart'],
    queryFn: async () => {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('faild To Fetch')
      return response.json()
    }

  })

  // delete
  const { mutate: delCartItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: 'Product Deleted Successfully',
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


  // update
  const { mutate: updateCartItem } = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: 'Product updated Successfully',
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

  // clear Cart
  const { mutate: clearCartItems } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: 'Cart Deleted Successfully',
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

  function handleClearCart() {
    clearCartItems()
  }
  function HandleUpdateCart(prodId: string, count: number) {
    if (count < 1) return
    updateCartItem({ prodId, count })
  }

  if (isLoading) {
    return <h2 className="text-center py-10">Loading......</h2>
  }

  return (
    <>
      {cartData?.numOfCartItems ? (
        <section className="w-full bg-white py-9 px-4 md:px-8">
          <h1 className="text-center text-[#191919] text-[32px] font-semibold leading-[38px]">
            My Shopping Cart
          </h1>

          <div className="flex flex-col lg:flex-row items-start mt-8 gap-6">

            {/* Items table */}
            <div className="bg-white p-4 w-full lg:flex-1 rounded-xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] bg-white rounded-xl">
                  <thead>
                    <tr className="text-center border-b border-gray-400 w-full text-[#7f7f7f] text-sm font-medium uppercase leading-[14px] tracking-wide">
                      <th className="text-left px-2 py-2">Product</th>
                      <th className="px-2 py-2">Price</th>
                      <th className="px-2 py-2">Quantity</th>
                      <th className="px-2 py-2">Subtotal</th>
                      <th className="w-7 px-2 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {cartData?.data.products.map((product) => (
                      <tr key={product._id} className="text-center border-b border-gray-50 last:border-0">
                        <td className="px-2 py-3 text-left align-top">
                          <div className="flex items-center gap-3">
                            <Image
                              src={product.product.imageCover}
                              alt={product.product.title}
                              width={70}
                              height={70}
                              className="w-[70px] h-[70px] object-contain shrink-0"
                            />
                            <span className="text-sm line-clamp-2">{product.product.title}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">{product.price} EGP</td>
                        <td className="p-2">
                          <div className="w-fit mx-auto px-2 py-1.5 bg-white rounded-full border border-[#a0a0a0] justify-around items-center flex gap-2">
                            <svg width={14} height={15} className="cursor-pointer shrink-0" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path onClick={() => { HandleUpdateCart(product.product._id, product.count - 1) }} d="M2.33398 7.5H11.6673" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span className="w-6 text-center text-[#191919] text-base font-normal leading-normal">{product.count}</span>
                            <svg className="cursor-pointer shrink-0" width={14} height={15} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path onClick={() => { HandleUpdateCart(product.product._id, product.count + 1) }} d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap">{product.count * product.price} EGP</td>
                        <td className="px-2 py-3">
                          <svg onClick={() => { delCartItem(product.product._id) }} width={22} className="cursor-pointer inline-block" height={23} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/shop"
                  className="px-8 text-center cursor-pointer py-3.5 bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold leading-[16px] hover:bg-gray-200"
                >
                  Return to shop
                </Link>
                <button
                  onClick={handleClearCart}
                  className="px-8 py-3.5 cursor-pointer bg-[#f2f2f2] rounded-[43px] text-[#4c4c4c] text-sm font-semibold leading-[16px] hover:bg-gray-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart total */}
            <div className="w-full lg:w-96 shrink-0 bg-white rounded-lg p-6 border border-gray-100">
              <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
                Cart Total
              </h2>
              <div className="w-full py-3 justify-between items-center flex">
                <span className="text-[#4c4c4c] text-base font-normal leading-normal">Total:</span>
                <span className="text-[#191919] text-base font-semibold leading-tight">{cartData?.data.totalCartPrice} EGP</span>
              </div>
              <div className="w-full py-3 border-t border-gray-100 justify-between items-center flex">
                <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Shipping:</span>
                <span className="text-[#191919] text-sm font-medium leading-[21px]">Free</span>
              </div>
              <div className="w-full py-3 border-t border-gray-100 justify-between items-center flex">
                <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">Items:</span>
                <span className="text-[#191919] text-sm font-medium leading-[21px]">{cartData?.numOfCartItems}</span>
              </div>
              <Link
                href={`/checkout/${cartData?.cartId}`}
                className="w-full block text-center text-white mt-5 px-10 py-4 bg-[#00b206] rounded-[44px] text-base font-semibold leading-tight hover:bg-green-700"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-6 p-5 w-full bg-white rounded-lg border border-[#e6e6e6] flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-[#191919] shrink-0 sm:w-1/4 text-xl font-medium leading-[30px]">
              Coupon Code
            </h3>
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Enter code"
                type="text"
                className="w-full px-6 py-3.5 outline-none border border-[#e6e6e6] bg-white rounded-[46px] text-[#999999] text-base font-normal leading-normal"
              />
              <button className="px-10 py-4 shrink-0 bg-[#333333] rounded-[43px] text-white text-base font-semibold leading-tight hover:bg-black">
                Apply Coupon
              </button>
            </div>
          </div>
        </section>
      ) : (
        <h2 className="text-center py-20 text-gray-500">Cart Empty</h2>
      )}
    </>
  )
}
