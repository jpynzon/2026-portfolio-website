import type { ContactFormInput } from '~/types/portfolio'

interface ContactResponse {
  success: boolean
  message: string
}

export const contactService = {
  async sendContact(payload: ContactFormInput) {
    const { public: publicConfig } = useRuntimeConfig()
    return $fetch<ContactResponse>('/contact', {
      baseURL: publicConfig.apiBase,
      method: 'POST',
      body: payload
    })
  }
}

