'use client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const list = images.length ? images : []

  return (
    <div>
      <div className='bg-white border border-gray-100 rounded-xl overflow-hidden'>
        <Image
          width={500}
          height={500}
          src={list[active]}
          alt={title}
          className='w-full h-80 md:h-96 object-contain p-4'
        />
      </div>

      {list.length > 1 && (
        <div className='flex gap-3 mt-4 overflow-x-auto'>
          {list.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${active === i ? 'border-green-600' : 'border-gray-100'}`}
            >
              <Image width={80} height={80} src={img} alt={`${title} ${i + 1}`} className='w-full h-full object-contain p-1' />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
