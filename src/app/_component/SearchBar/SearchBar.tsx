'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    router.push(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : '/shop')
  }

  return (
    <form onSubmit={handleSubmit} className='flex-1 max-w-xl relative'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search for products, brands and more...'
        className='w-full h-10 rounded-full border border-gray-200 pl-4 pr-11 text-sm outline-none focus:border-green-500'
      />
      <button
        type='submit'
        aria-label='Search'
        className='absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>
  )
}
