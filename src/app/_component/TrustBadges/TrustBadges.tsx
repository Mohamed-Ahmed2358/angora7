import React from 'react'

const badges = [
  {
    title: 'Free Shipping',
    subtitle: 'On orders over 500 EGP',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    paths: ['M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.83H14.25M16.5 18.75h-2.25m0-11.177v-.443c0-1.132-.912-2.05-2.043-2.08a23.949 23.949 0 00-5.454 0c-1.131.03-2.043.948-2.043 2.08v.443M16.5 7.5l-3.75-3.75m0 0L9 7.5m3.75-3.75v11.177'],
  },
  {
    title: 'Secure Payment',
    subtitle: '100% secure transactions',
    bg: 'bg-green-50',
    color: 'text-green-600',
    paths: ['M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'],
  },
  {
    title: 'Easy Returns',
    subtitle: '14-day return policy',
    bg: 'bg-orange-50',
    color: 'text-orange-500',
    paths: ['M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'],
  },
  {
    title: '24/7 Support',
    subtitle: 'Dedicated support team',
    bg: 'bg-purple-50',
    color: 'text-purple-600',
    paths: [
      'M3 18v-6a9 9 0 0118 0v6',
      'M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z',
    ],
  },
]

export default function TrustBadges() {
  return (
    <div className='container mx-auto px-4 -mt-0 relative z-10 py-5'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {badges.map((badge) => (
          <div key={badge.title} className='bg-white rounded-xl shadow-sm p-4 flex items-center gap-3'>
            <div className={`w-11 h-11 ${badge.bg} rounded-lg flex items-center justify-center shrink-0`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${badge.color}`}>
                {badge.paths.map((d) => (
                  <path key={d} strokeLinecap="round" strokeLinejoin="round" d={d} />
                ))}
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>{badge.title}</p>
              <p className='text-xs text-gray-500'>{badge.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
