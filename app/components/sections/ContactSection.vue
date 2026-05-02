<script setup lang="ts">
import type { ContactContent, ContactFormInput } from '~/types/portfolio'
import type { ContactFieldUpdate } from '~/composables/useContactForm'

defineProps<{
  contact: ContactContent
  form: ContactFormInput
  errors: Record<keyof ContactFormInput, string>
  isSubmitting: boolean
  feedback: string
  feedbackTone: 'idle' | 'success' | 'error'
}>()

const emit = defineEmits<{
  'field-update': [payload: ContactFieldUpdate]
  submit: []
}>()
</script>

<template>
  <section
    id="contact"
    class="section"
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 560 } }"
  >
    <SectionTitle
      eyebrow="Contact"
      title="Let's build something meaningful."
      description="If you are hiring or starting a new product, I am open to software developer roles and collaborative projects."
    />

    <div class="contact-grid">
      <div class="contact-info">
        <p>{{ contact.note }}</p>
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a :href="contact.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="contact.github" target="_blank" rel="noreferrer">GitHub</a>
        <p>{{ contact.location }}</p>
      </div>

      <form class="contact-form" novalidate @submit.prevent="emit('submit')">
        <label>
          Name
          <input
            :value="form.name"
            name="name"
            type="text"
            autocomplete="name"
            @input="
              emit('field-update', {
                field: 'name',
                value: ($event.target as HTMLInputElement).value
              })
            "
          />
          <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
        </label>

        <label>
          Email
          <input
            :value="form.email"
            name="email"
            type="email"
            autocomplete="email"
            @input="
              emit('field-update', {
                field: 'email',
                value: ($event.target as HTMLInputElement).value
              })
            "
          />
          <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
        </label>

        <label>
          Message
          <textarea
            :value="form.message"
            name="message"
            rows="5"
            @input="
              emit('field-update', {
                field: 'message',
                value: ($event.target as HTMLTextAreaElement).value
              })
            "
          />
          <span v-if="errors.message" class="form-error">{{ errors.message }}</span>
        </label>

        <button class="button button--primary" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>

        <p v-if="feedback" :class="`form-feedback form-feedback--${feedbackTone}`">
          {{ feedback }}
        </p>
      </form>
    </div>
  </section>
</template>

