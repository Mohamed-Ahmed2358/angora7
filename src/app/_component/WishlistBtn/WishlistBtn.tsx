'use client'
import { addToWishlist } from '@/api/actions/wishlistActions/addToWishlist'
import { removeFromWishlist } from '@/api/actions/wishlistActions/removeFromWishlist'
import React, { useState } from 'react'
import { toast } from "@/components/ui/toast"
import { useMutation, useQueryClient } from '@tanstack/react-query'

// call api add/remove prod from wishlist => get token
// Note: we can't know the server-side wishlist state without an extra fetch,
// so "added" starts false and simply tracks what happened in this session.
export default function WishlistBtn({ prodId, cls, label, toggle }: { prodId: string; cls?: string; label?: string; toggle?: boolean }) {
  const query = useQueryClient()
  const [added, setAdded] = useState(false)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (toggle && added) {
      removeMutate(prodId)
    } else {
      addMutate(prodId)
    }
  }

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      toast.add({ type: "success", description: 'Product Added To Wishlist Successfully' })
      setAdded(true)
      query.invalidateQueries({ queryKey: ['getWishlist'] })
    },
    onError: () => {
      toast.add({ type: "error", description: 'Login first' })
    }
  })

  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      toast.add({ type: "success", description: 'Product Removed From Wishlist' })
      setAdded(false)
      query.invalidateQueries({ queryKey: ['getWishlist'] })
    },
    onError: () => {
      toast.add({ type: "error", description: 'Login first' })
    }
  })

  const isPending = isAdding || isRemoving
  const showAddedStyle = toggle && added

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`${cls ?? "absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"} ${showAddedStyle ? '!bg-red-50 !text-red-600 !border-red-200' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={label ? "size-5" : "h-4 w-4"}
        fill={showAddedStyle ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={label ? 1.5 : 2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
      {label && (showAddedStyle ? 'In Wishlist' : label)}
    </button>
  )
}
