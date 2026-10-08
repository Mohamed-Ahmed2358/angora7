'use client'
import React, { useState } from 'react'
import { toast } from '@/components/ui/toast'

const tags = [
  {
    label: 'Fresh Picks Weekly',
    path: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  },
  {
    label: 'Free Delivery Codes',
    path: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.83H14.25M16.5 18.75h-2.25m0-11.177v-.443c0-1.132-.912-2.05-2.043-2.08a23.949 23.949 0 00-5.454 0c-1.131.03-2.043.948-2.043 2.08v.443M16.5 7.5l-3.75-3.75m0 0L9 7.5m3.75-3.75v11.177',
  },
  {
    label: 'Members-Only Deals',
    path: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z',
  },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    // No dedicated newsletter endpoint exists in the Route ecommerce API,
    // so we simulate a short delay and confirm subscription locally.
    await new Promise((r) => setTimeout(r, 500))
    toast.add({ type: 'success', description: "You're subscribed! Welcome to FreshCart." })
    setEmail('')
    setSubmitting(false)
  }

  return (
    <div className='bg-gradient-to-br from-green-50 via-emerald-50/40 to-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid lg:grid-cols-5 gap-6'>

          {/* Newsletter card */}
          <div className='lg:col-span-3 bg-white rounded-2xl shadow-sm p-8'>
            <div className='flex items-center gap-3'>
              <div className='w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center shrink-0'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className='text-xs font-semibold text-green-600 tracking-wide'>NEWSLETTER</p>
                <p className='text-xs text-gray-400'>50,000+ subscribers</p>
              </div>
            </div>

            <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mt-5'>
              Get the Freshest Updates <span className='text-green-600'>Delivered Free</span>
            </h2>
            <p className='text-gray-500 mt-2'>Weekly recipes, seasonal offers &amp; exclusive member perks.</p>

            <div className='flex flex-wrap gap-2 mt-4'>
              {tags.map((tag) => (
                <span key={tag.label} className='inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 rounded-full pl-1.5 pr-3 py-1.5'>
                  <span className='w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d={tag.path} />
                    </svg>
                  </span>
                  {tag.label}
                </span>
              ))}
            </div>

            <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-3 mt-5'>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='you@example.com'
                className='flex-1 h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-green-500'
              />
              <button
                type='submit'
                disabled={submitting}
                className='h-11 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60'
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </form>
            <p className='text-xs text-gray-400 mt-2'>✨ Unsubscribe anytime. No spam, ever.</p>
          </div>

          {/* App download card */}
          <div className='lg:col-span-2 bg-gray-900 rounded-2xl p-8 text-white flex flex-col'>
            <span className='inline-flex items-center gap-1.5 w-fit bg-green-500/15 text-green-400 text-xs font-semibold tracking-wide px-3 py-1 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
              MOBILE APP
            </span>
            <h3 className='text-xl md:text-2xl font-bold mt-3'>Shop Faster on Our App</h3>
            <p className='text-gray-400 text-sm mt-1'>Get app-exclusive deals &amp; 15% off your first order</p>

            <div className='flex flex-col gap-3 mt-5'>
              <button
                type='button'
                onClick={() => toast.add({ type: 'info', description: 'iOS app is coming soon' })}
                className='flex items-center gap-3 bg-black border border-gray-700 rounded-lg px-4 py-2.5 hover:bg-gray-800 text-left'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="white" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.468 2.233-1.23 3.028-.84.883-2.215 1.57-3.355 1.478-.146-1.106.42-2.264 1.202-3.07C13.76 1.98 15.13 1.312 16.364 1.43zM20.12 17.17c-.5 1.153-.74 1.67-1.38 2.69-.89 1.42-2.147 3.19-3.705 3.21-1.38.02-1.735-.9-3.6-.89-1.868.01-2.258.91-3.638.89-1.56-.02-2.75-1.61-3.64-3.03-2.49-3.96-2.753-8.6-1.216-11.07.98-1.577 2.5-2.5 3.934-2.5 1.46 0 2.378.9 3.588.9 1.173 0 1.88-.9 3.55-.9 1.28 0 2.64.698 3.61 1.9-3.176 1.74-2.66 6.27.497 8.8z" />
                </svg>
                <div>
                  <p className='text-[10px] text-gray-400 leading-none'>DOWNLOAD ON</p>
                  <p className='text-sm font-semibold leading-tight'>App Store</p>
                </div>
              </button>

              <button
                type='button'
                onClick={() => toast.add({ type: 'info', description: 'Android app is coming soon' })}
                className='flex items-center gap-3 bg-black border border-gray-700 rounded-lg px-4 py-2.5 hover:bg-gray-800 text-left'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24">
                  <path d="M3.6 2.7c-.3.3-.5.7-.5 1.2v16.2c0 .5.2.9.5 1.2l.1.1L13 12l-9.3-9.3-.1 0z" fill="white" />
                  <path d="M16.1 15.1l-3.1-3.1 3.1-3.1 3.7 2.1c.6.3.6 1.1 0 1.5l-3.7 2.1z" fill="#34A853" />
                  <path d="M13 12l3.1 3.1-10.4 6c-.4.2-.9.2-1.3-.1L13 12z" fill="#EA4335" />
                  <path d="M13 12L4.4 3c.4-.3.9-.3 1.3-.1l10.4 6-3.1 3.1z" fill="#FBBC04" />
                </svg>
                <div>
                  <p className='text-[10px] text-gray-400 leading-none'>GET IT ON</p>
                  <p className='text-sm font-semibold leading-tight'>Google Play</p>
                </div>
              </button>
            </div>

            <div className='flex items-center gap-1.5 mt-auto pt-5 text-sm text-gray-300'>
              <span className='text-yellow-400'>★★★★★</span>
              4.9 &bull; 100K+ downloads
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
