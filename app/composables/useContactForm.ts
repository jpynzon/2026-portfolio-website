import { z } from 'zod'
import { contactService } from '~/services/contact.service'
import type { ContactContent, ContactFormInput } from '~/types/portfolio'

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(20, 'Message should be at least 20 characters.')
    .max(1200, 'Message is too long.')
})

export type ContactFieldUpdate = {
  field: keyof ContactFormInput
  value: string
}

export function useContactForm() {
  const form = reactive<ContactFormInput>({
    name: '',
    email: '',
    message: ''
  })

  const errors = reactive<Record<keyof ContactFormInput, string>>({
    name: '',
    email: '',
    message: ''
  })

  const isSubmitting = ref(false)
  const feedback = ref('')
  const feedbackTone = ref<'idle' | 'success' | 'error'>('idle')

  function resetForm() {
    form.name = ''
    form.email = ''
    form.message = ''
  }

  function clearErrors() {
    errors.name = ''
    errors.email = ''
    errors.message = ''
  }

  function clearFeedback() {
    feedback.value = ''
    feedbackTone.value = 'idle'
  }

  function updateField({ field, value }: ContactFieldUpdate) {
    form[field] = value
  }

  async function submit(contact: ContactContent) {
    clearFeedback()
    clearErrors()

    const parsed = contactFormSchema.safeParse(form)
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormInput
        errors[field] = issue.message
      })
      feedback.value = 'Please fix the form errors and try again.'
      feedbackTone.value = 'error'
      return false
    }

    isSubmitting.value = true

    try {
      const response = await contactService.sendContact(parsed.data)
      feedback.value = response.message || `Thanks. I will get back to you at ${contact.email}.`
      feedbackTone.value = 'success'
      resetForm()
      return true
    } catch {
      feedback.value = 'Something went wrong while sending your message. Please try again.'
      feedbackTone.value = 'error'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    feedback,
    feedbackTone,
    clearFeedback,
    updateField,
    submit
  }
}

