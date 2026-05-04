import { z } from 'zod'
import { FetchError } from 'ofetch'

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  message: z.string().trim().min(20).max(1200),
  turnstileToken: z.string().trim().min(1)
})

interface ContactApiResponse {
  success: boolean
  message: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid contact request payload.'
    })
  }

  const config = useRuntimeConfig(event)

  try {
    const response = await $fetch<ContactApiResponse>('/contact', {
      baseURL: config.backendApiBase,
      method: 'POST',
      body: parsed.data
    })

    return {
      success: response.success,
      message: response.message
    }
  } catch (error) {
    if (error instanceof FetchError) {
      const payload = error.data as { message?: string } | undefined

      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: payload?.message || 'Unable to send your message right now.'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to send your message right now.'
    })
  }
})