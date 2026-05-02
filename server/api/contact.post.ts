import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(20).max(1200)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid contact request payload.'
    })
  }

  return {
    success: true,
    message: `Thanks, ${parsed.data.name}. Your message was received.`
  }
})

