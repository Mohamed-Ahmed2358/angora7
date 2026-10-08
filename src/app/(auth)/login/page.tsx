'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import * as zod from 'zod'
import { toast } from "@/components/ui/toast"

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginSchema } from '@/schema/loginSchems'
import { signIn } from 'next-auth/react'
import Link from 'next/link'


export type loginData = zod.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<loginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema)
  })

  async function submitForm(data: loginData) {
    const isLogin = await signIn('credentials', { ...data, redirect: false })

    if (isLogin?.ok) {
      // success , navigate
      toast.add({
        type: "success",
        description: "Signed in successfully",
      })
      router.push('/')
    }
    else {
      toast.add({
        type: "error",
        description: "Invalid email or password",
      })
    }
  }

  function comingSoon(provider: string) {
    toast.add({
      type: "info",
      description: `Sign in with ${provider} is coming soon`,
    })
  }

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10 items-center'>

        {/* Left side - illustration */}
        <div className='hidden lg:flex flex-col items-center text-center gap-6'>
          <svg viewBox="0 0 200 200" className='w-72 h-72' xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="#DCFCE7" />
            <g transform="translate(38 60)">
              <path d="M2 0 H18 L26 62 H94 L108 16 H30" fill="none" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="34" cy="78" r="8" fill="#16A34A" />
              <circle cx="86" cy="78" r="8" fill="#16A34A" />
              <circle cx="45" cy="28" r="13" fill="#EF4444" />
              <circle cx="65" cy="22" r="15" fill="#F97316" />
              <circle cx="85" cy="30" r="11" fill="#EAB308" />
              <path d="M45 15 Q50 4 58 10" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
              <path d="M63 8 Q68 -2 76 4" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
          <h1 className='text-3xl font-bold text-gray-900'>
            FreshCart - Your One-Stop Shop for Fresh Products
          </h1>
          <p className='text-gray-500 max-w-md'>
            Join thousands of happy customers who trust FreshCart for their daily grocery needs
          </p>
          <div className='flex items-center gap-6 text-sm text-gray-600'>
            <span className='flex items-center gap-1.5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.83H14.25M16.5 18.75h-2.25m0-11.177v-.443c0-1.132-.912-2.05-2.043-2.08a23.949 23.949 0 00-5.454 0c-1.131.03-2.043.948-2.043 2.08v.443M16.5 7.5l-3.75-3.75m0 0L9 7.5m3.75-3.75v11.177" />
              </svg>
              Free Delivery
            </span>
            <span className='flex items-center gap-1.5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Secure Payment
            </span>
            <span className='flex items-center gap-1.5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A3.75 3.75 0 0112 1.5v0a3.75 3.75 0 013.75 3.75V9m-9 9.75h9a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25h-9a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              24/7 Support
            </span>
          </div>
        </div>

        {/* Right side - form card */}
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 max-w-md w-full mx-auto'>
          <div className='text-center mb-6'>
            <h2 className='text-2xl font-bold text-green-600'>FreshCart</h2>
            <h1 className='text-2xl font-bold text-gray-900 mt-2'>Welcome Back!</h1>
            <p className='text-gray-500 text-sm mt-1'>Sign in to continue your fresh shopping experience</p>
          </div>

          <div className='flex flex-col gap-3'>
            <button
              type='button'
              onClick={() => comingSoon('Google')}
              className='w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              <svg className="w-4 h-4" viewBox="0 0 533.5 544.3">
                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
              </svg>
              Continue with Google
            </button>
            <button
              type='button'
              onClick={() => comingSoon('Facebook')}
              className='w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className='my-6 flex items-center gap-3'>
            <div className='h-px bg-gray-200 flex-1' />
            <span className='text-xs text-gray-400 font-medium tracking-wide'>OR CONTINUE WITH EMAIL</span>
            <div className='h-px bg-gray-200 flex-1' />
          </div>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className='flex flex-col gap-4'>

              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <div className='relative'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="email"
                        className='pl-8 h-10'
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className='flex items-center justify-between'>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <button
                        type='button'
                        onClick={() => comingSoon('password reset')}
                        className='text-xs text-green-600 hover:underline'
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className='relative'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className='pl-8 pr-8 h-10'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword((v) => !v)}
                        className='absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <label className='flex items-center gap-2 text-sm text-gray-600'>
                <input type='checkbox' className='accent-green-600 w-4 h-4' />
                Keep me signed in
              </label>

              <Button type='submit' disabled={isSubmitting} className='w-full bg-green-600 hover:bg-green-700 h-10'>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>

          <p className='text-center text-sm text-gray-600 mt-6'>
            New to FreshCart?{' '}
            <Link href='/register' className='text-green-600 font-medium hover:underline'>
              Create an account
            </Link>
          </p>

          <div className='flex items-center justify-center gap-4 mt-6 text-xs text-gray-400'>
            <span className='flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              SSL Secured
            </span>
            <span>50K+ Users</span>
            <span className='flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927C9.349 2.2 10.651 2.2 10.951 2.927l1.558 3.779 4.004.37c.85.079 1.194 1.139.572 1.724l-2.922 2.658.87 3.917c.181.816-.68 1.448-1.419 1.034L10 13.01l-3.614 1.96c-.74.414-1.6-.218-1.419-1.034l.87-3.917-2.922-2.658c-.622-.585-.278-1.645.572-1.724l4.004-.37L9.049 2.927z" />
              </svg>
              4.9 Rating
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
