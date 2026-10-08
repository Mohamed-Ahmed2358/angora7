"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"
import logo from '../../../assets/freshcart-logo.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"

import { getCart } from '@/api/actions/cartActions/getCart'
import { CartResponseType } from '@/api/types/cartType'
import { WishlistResponseType } from '@/api/types/wishlistType'
import { Category } from '@/api/types/productType'
import { useQuery } from '@tanstack/react-query'
import SearchBar from '../SearchBar/SearchBar'
 
export default function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const activeCls = (href: string) => isActive(href) ? 'text-green-600' : ''
  const { data: navCategories } = useQuery<Category[]>({
    queryKey: ['navCategories'],
    queryFn: async () => {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
      if (!response.ok) throw new Error('faild To Fetch')
      const payload = await response.json()
      return payload.data
    },
    staleTime: 1000 * 60 * 10,
  })

  const {data:cartData , isLoading}= useQuery<CartResponseType>({
    queryKey:['getCart'] ,
    queryFn: async()=>{
        const response = await fetch('/api/cart')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    }

})
console.log('cart Data..' , cartData);

const {data:wishlistData}= useQuery<WishlistResponseType>({
    queryKey:['getWishlist'] ,
    queryFn: async()=>{
        const response = await fetch('/api/wishlist')
        if(!response.ok) throw new Error('faild To Fetch')
          return   response.json()
    }

})
  function handleLogout(){
    signOut({redirect:true , callbackUrl:'/login'})
  }
 const {data:sessionData , status}= useSession()
 console.log(status)
  return (
    <NavigationMenu className='bg-white border-b border-gray-100 sticky top-0 z-50 max-w-full p-3 '>
      <NavigationMenuList className='justify-between gap-4'>

       <Link href='/' className='shrink-0'>
         <Image src={logo} alt='Fresh Cart' />
       </Link>

       <div className="hidden md:block flex-1 max-w-xl">
         <React.Suspense fallback={<div className='h-10 rounded-full bg-gray-100 animate-pulse' />}>
           <SearchBar />
         </React.Suspense>
       </div>

<div className="md:flex gap-4 hidden">
  
    <NavigationMenuItem>
          <Link className={`font-semibold hover:text-green-800 ${activeCls('/')}`} href='/'>Home</Link>
        </NavigationMenuItem>
           <NavigationMenuItem>
          <Link className={`font-semibold hover:text-green-800 ${activeCls('/shop')}`} href='/shop'>Shop</Link>
        </NavigationMenuItem>
           <NavigationMenuItem>
          <NavigationMenuTrigger className={`font-semibold hover:text-green-800 bg-transparent data-popup-open:text-green-700 data-open:text-green-700 ${pathname.startsWith('/categories') ? 'text-green-600' : ''}`}>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-56 p-1">
              <li>
                <NavigationMenuLink render={<Link href='/categories'><span className='font-semibold text-gray-900'>All Categories</span></Link>} />
              </li>
              {navCategories?.slice(0, 8).map((cat) => (
                <li key={cat._id}>
                  <NavigationMenuLink render={<Link href={`/categories/${cat._id}`}>{cat.name}</Link>} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
           <NavigationMenuItem>
          <Link className={`font-semibold hover:text-green-800 ${pathname.startsWith('/brands') ? 'text-green-600' : ''}`} href='/brands'>Brands</Link>
        </NavigationMenuItem>
</div>


<div className="md:flex gap-6 items-center hidden">
  <Link href='/contact' className='flex items-center gap-1.5 text-gray-600 hover:text-green-600'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
    </svg>
    <span className='text-xs leading-tight'>Support<br />24/7 Help</span>
  </Link>

  {status==="authenticated" ? <><Link href='/cart' className='relative inline-flex'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
{!!cartData?.numOfCartItems && (
  <span className='absolute -top-2 -right-2 w-4 h-4 bg-green-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center'>
    {cartData.numOfCartItems}
  </span>
)}
 </Link>

<Link href='/wishList' className='flex items-center'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</Link>

<button onClick={handleLogout} className='bg-green-600 hover:bg-green-700 py-2 px-4 text-white rounded-full text-sm font-semibold inline-flex items-center gap-1.5'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
  </svg>
  Sign Out
</button></> :<Link href='/login' className='bg-green-600 hover:bg-green-700 py-2 px-4 text-white rounded-full text-sm font-semibold inline-flex items-center gap-1.5'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
  Sign In
</Link>}
 



</div>


        <NavigationMenuItem className='md:hidden'>
          <NavigationMenuTrigger><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>
</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/" title="Home">
                <Link href='/'>Home</Link>
              </ListItem>

              <ListItem href="/shop" title="Shop">
                <Link href='/shop'>Shop</Link>
              </ListItem>

              <ListItem href="/categories" title="Categories">
                <Link href='/categories'>Categories</Link>
              </ListItem>

                <ListItem href="/brands" title="Brands">
                <Link href='/brands'>Brands</Link>
              </ListItem>

              <ListItem href="/contact" title="Support">
                <Link href='/contact'>Support / Contact Us</Link>
              </ListItem>

              {status === "authenticated" && (
                <>
                  <ListItem href="/cart" title="Cart">
                    <Link href='/cart'>Cart {cartData?.numOfCartItems ? `(${cartData.numOfCartItems})` : ''}</Link>
                  </ListItem>

                  <ListItem href="/wishList" title="Wishlist">
                    <Link href='/wishList'>Wishlist</Link>
                  </ListItem>
                </>
              )}
            
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>









    



      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<Link href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div></Link>} />
    </li>
  )
}
