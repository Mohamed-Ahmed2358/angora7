import * as zod from 'zod'

export const contactSchema = zod.object({
  name: zod.string().nonempty('Full name is required').min(3, 'Name is too short'),
  email: zod.string().nonempty('Email is required').email('Invalid Email'),
  subject: zod.string().nonempty('Please select a subject'),
  message: zod.string().nonempty('Message is required').min(10, 'Message is too short'),
})
