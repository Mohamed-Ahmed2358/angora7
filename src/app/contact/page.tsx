'use client'
import React from 'react'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { contactSchema } from '@/schema/contactSchema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { toast } from '@/components/ui/toast'

type ContactData = zod.infer<typeof contactSchema>

export default function Contact() {
  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<ContactData>({
    defaultValues: { name: '', email: '', subject: '', message: '' },
    resolver: zodResolver(contactSchema)
  })

  async function submitForm() {
    // No dedicated contact-messages endpoint exists in the Route ecommerce API,
    // so we simulate a short delay and confirm submission locally.
    await new Promise((r) => setTimeout(r, 600))
    toast.add({
      type: 'success',
      description: "Message sent! We'll get back to you soon.",
    })
    reset()
  }

  return (
    <div>
      {/* header banner */}
      <div className='bg-green-600'>
        <div className='container mx-auto px-4 pt-4 pb-10'>
          <div className='text-sm text-green-100 mb-4'>
            <Link href='/' className='hover:text-white'>Home</Link> / <span className='text-white'>Contact Us</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
              </svg>
            </div>
            <div>
              <h2 className='text-3xl font-bold text-white'>Contact Us</h2>
              <p className='text-green-100 mt-1'>We&apos;d love to hear from you. Get in touch with our team.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-10 grid lg:grid-cols-5 gap-8'>

        {/* Left: contact info */}
        <div className='lg:col-span-2 flex flex-col gap-4'>

          <div className='border border-gray-200 rounded-xl p-5 flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <div>
              <h4 className='font-semibold text-gray-900'>Phone</h4>
              <p className='text-sm text-gray-500'>Mon-Fri from 8am to 6pm</p>
              <a href='tel:+18001234567' className='text-sm text-green-600 font-medium hover:underline'>+1 (800) 123-4567</a>
            </div>
          </div>

          <div className='border border-gray-200 rounded-xl p-5 flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <div>
              <h4 className='font-semibold text-gray-900'>Email</h4>
              <p className='text-sm text-gray-500'>We&apos;ll respond within 24 hours</p>
              <a href='mailto:support@freshcart.com' className='text-sm text-green-600 font-medium hover:underline'>support@freshcart.com</a>
            </div>
          </div>

          <div className='border border-gray-200 rounded-xl p-5 flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <div>
              <h4 className='font-semibold text-gray-900'>Office</h4>
              <p className='text-sm text-gray-500'>123 Commerce Street</p>
              <p className='text-sm text-gray-500'>New York, NY 10001</p>
              <p className='text-sm text-gray-500'>United States</p>
            </div>
          </div>

          <div className='border border-gray-200 rounded-xl p-5 flex gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600 shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className='font-semibold text-gray-900'>Business Hours</h4>
              <p className='text-sm text-gray-500'>Monday - Friday: 8am - 6pm</p>
              <p className='text-sm text-gray-500'>Saturday: 9am - 4pm</p>
              <p className='text-sm text-gray-500'>Sunday: Closed</p>
            </div>
          </div>

          <div className='p-5'>
            <h4 className='font-semibold text-gray-900 mb-3'>Follow Us</h4>
            <div className='flex items-center gap-3 text-gray-500'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' aria-label='Facebook' className='hover:text-green-600'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.88v-6.99H7.9V12h2.5V9.8c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 2.89h-2.3v6.99A10 10 0 0022 12z"/></svg>
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' aria-label='Twitter' className='hover:text-green-600'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.98A12.16 12.16 0 013 4.9a4.27 4.27 0 001.33 5.72c-.7-.02-1.36-.21-1.94-.53v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.14 2.97 4.03 3-1.47 1.15-3.33 1.84-5.35 1.84-.35 0-.69-.02-1.03-.06A12.13 12.13 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.53.8-.58 1.5-1.3 2.05-2.13-.74.33-1.53.55-2.36.65a4.15 4.15 0 001.81-2.29z"/></svg>
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' aria-label='Instagram' className='hover:text-green-600'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76A4.9 4.9 0 015.44 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
              </a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn' className='hover:text-green-600'>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11.02-4.12 2.06 2.06 0 01-.02 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right: message form */}
        <div className='lg:col-span-3'>
          <div className='border border-gray-200 rounded-xl p-6 md:p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              <div>
                <h3 className='font-semibold text-gray-900 text-lg'>Send us a Message</h3>
                <p className='text-sm text-gray-500'>Fill out the form and we&apos;ll get back to you</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>
              <div className='grid sm:grid-cols-2 gap-4'>
                <Controller
                  name='name'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                      <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder='John Doe' className='h-10' />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                      <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder='john@example.com' className='h-10' />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <div className='mt-4'>
                <Controller
                  name='subject'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Subject</FieldLabel>
                      <select
                        {...field}
                        id={field.name}
                        className='h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
                      >
                        <option value=''>Select a subject</option>
                        <option value='order'>Order Inquiry</option>
                        <option value='returns'>Returns & Refunds</option>
                        <option value='product'>Product Question</option>
                        <option value='partnership'>Partnership</option>
                        <option value='other'>Other</option>
                      </select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <div className='mt-4'>
                <Controller
                  name='message'
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                      <textarea
                        {...field}
                        id={field.name}
                        rows={5}
                        placeholder='How can we help you?'
                        className='w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 resize-none'
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>

              <Button type='submit' disabled={isSubmitting} className='mt-5 bg-green-600 hover:bg-green-700 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Help center callout */}
          <div className='mt-6 bg-green-50 border border-green-100 rounded-xl p-5 flex gap-3'>
            <div className='w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-gray-900'>Looking for quick answers?</h4>
              <p className='text-sm text-gray-600 mt-0.5'>Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.</p>
              <Link href='/contact' className='text-sm text-green-600 font-medium hover:underline inline-flex items-center gap-1 mt-2'>
                Visit Help Center
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
