import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from '../../../assets/freshcart-logo.svg'

export default function Footer() {
  return (
    <div>

      {/* Trust strip */}
      <div className='bg-gradient-to-b from-green-50/60 to-green-50/20 mt-10'>
        <div className='container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.83H14.25M16.5 18.75h-2.25m0-11.177v-.443c0-1.132-.912-2.05-2.043-2.08a23.949 23.949 0 00-5.454 0c-1.131.03-2.043.948-2.043 2.08v.443M16.5 7.5l-3.75-3.75m0 0L9 7.5m3.75-3.75v11.177" />
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Free Shipping</p>
              <p className='text-xs text-gray-500'>On orders over 500 EGP</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Easy Returns</p>
              <p className='text-xs text-gray-500'>14-day return policy</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Secure Payment</p>
              <p className='text-xs text-gray-500'>100% secure checkout</p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A3.75 3.75 0 0112 1.5v0a3.75 3.75 0 013.75 3.75V9m-9 9.75h9a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25h-9a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>24/7 Support</p>
              <p className='text-xs text-gray-500'>Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className='bg-slate-900 text-gray-300'>
        <div className='container mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-10'>

          <div className='lg:col-span-1 sm:col-span-2'>
            <Link href='/' className='inline-flex items-center bg-white rounded-lg px-3 py-1.5'>
              <Image src={logo} alt='FreshCart' className='h-6 w-auto' />
            </Link>
            <p className='text-sm text-gray-400 mt-4 leading-relaxed'>
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className='flex flex-col gap-2 mt-4 text-sm'>
              <span className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +1 (800) 123-4567
              </span>
              <span className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-green-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                support@freshcart.com
              </span>
              <span className='flex items-start gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-green-500 mt-0.5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                123 Commerce Street, New York, NY 10001
              </span>
            </div>
            <div className='flex items-center gap-3 mt-5'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' aria-label='Facebook' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.88v-6.99H7.9V12h2.5V9.8c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 2.89h-2.3v6.99A10 10 0 0022 12z"/></svg>
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' aria-label='Twitter' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98A12.16 12.16 0 013 4.9a4.27 4.27 0 001.33 5.72c-.7-.02-1.36-.21-1.94-.53v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.14 2.97 4.03 3-1.47 1.15-3.33 1.84-5.35 1.84-.35 0-.69-.02-1.03-.06A12.13 12.13 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53.8-.58 1.5-1.3 2.05-2.13-.74.33-1.53.55-2.36.65a4.15 4.15 0 001.81-2.29z"/></svg>
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' aria-label='Instagram' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
              </a>
              <a href='https://youtube.com' target='_blank' rel='noopener noreferrer' aria-label='YouTube' className='w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.13c1.88.57 9.38.57 9.38.57s7.5 0 9.38-.57a3.02 3.02 0 002.12-2.13A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Shop</h4>
            <ul className='flex flex-col gap-2.5 text-sm'>
              <li><Link href='/shop' className='hover:text-green-500 transition-colors'>All Products</Link></li>
              <li><Link href='/categories' className='hover:text-green-500 transition-colors'>Categories</Link></li>
              <li><Link href='/brands' className='hover:text-green-500 transition-colors'>Brands</Link></li>
              <li><Link href='/shop' className='hover:text-green-500 transition-colors'>Electronics</Link></li>
              <li><Link href='/shop' className='hover:text-green-500 transition-colors'>Men&apos;s Fashion</Link></li>
              <li><Link href='/shop' className='hover:text-green-500 transition-colors'>Women&apos;s Fashion</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Account</h4>
            <ul className='flex flex-col gap-2.5 text-sm'>
              <li><Link href='/allorders' className='hover:text-green-500 transition-colors'>My Account</Link></li>
              <li><Link href='/allorders' className='hover:text-green-500 transition-colors'>Order History</Link></li>
              <li><Link href='/wishList' className='hover:text-green-500 transition-colors'>Wishlist</Link></li>
              <li><Link href='/cart' className='hover:text-green-500 transition-colors'>Shopping Cart</Link></li>
              <li><Link href='/login' className='hover:text-green-500 transition-colors'>Sign In</Link></li>
              <li><Link href='/register' className='hover:text-green-500 transition-colors'>Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Support</h4>
            <ul className='flex flex-col gap-2.5 text-sm'>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Contact Us</Link></li>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Help Center</Link></li>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Shipping Info</Link></li>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Returns &amp; Refunds</Link></li>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Legal</h4>
            <ul className='flex flex-col gap-2.5 text-sm'>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Privacy Policy</Link></li>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Terms of Service</Link></li>
              <li><Link href='/contact' className='hover:text-green-500 transition-colors'>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800'>
          <div className='container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500'>
            <span>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</span>
            <div className='flex items-center gap-2'>
              <span className='border border-gray-700 rounded px-2 py-0.5'>Visa</span>
              <span className='border border-gray-700 rounded px-2 py-0.5'>Mastercard</span>
              <span className='border border-gray-700 rounded px-2 py-0.5'>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
