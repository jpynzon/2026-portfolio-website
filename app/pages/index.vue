<script setup lang="ts">
import type { ContactFieldUpdate } from '~/composables/useContactForm'

const { content, isLoading, error, featuredProjects, navLinks, initialize } = usePortfolioPage()
const {
  form,
  errors: formErrors,
  isSubmitting,
  feedback,
  feedbackTone,
  clearFeedback,
  updateField,
  submit
} = useContactForm()

await callOnce(async () => {
  await initialize()
})

useSeoMeta({
  title: 'Software Developer Portfolio',
  description:
    'Portfolio of Joshua Ynzon, a software developer building reliable APIs, scalable systems, and modern web products.'
})

const currentYear = new Date().getFullYear()

function handleFieldUpdate(payload: ContactFieldUpdate) {
  clearFeedback()
  updateField(payload)
}

async function handleSubmit() {
  if (!content.value) return
  await submit(content.value.contact)
}
</script>

<template>
  <main class="portfolio-page">
    <div class="bg-orb bg-orb--one" />
    <div class="bg-orb bg-orb--two" />

    <AppHeader :links="navLinks" />

    <p v-if="error" class="state-banner state-banner--error">{{ error }}</p>
    <p v-if="isLoading && !content" class="state-banner">Loading portfolio content...</p>

    <template v-if="content">
      <HeroSection :hero="content.hero" />
      <StatsSection :hero="content.hero" />
      <AboutSection :about="content.about" />
      <SkillsSection :groups="content.skills" />
      <JourneySection :items="content.journey" />
      <Chatbot
        :avatar-src="content.hero.photo.src"
        :avatar-alt="content.hero.photo.alt"
      />
      <ProjectsSection :projects="featuredProjects" />
      <ContactSection
        :contact="content.contact"
        :form="form"
        :errors="formErrors"
        :is-submitting="isSubmitting"
        :feedback="feedback"
        :feedback-tone="feedbackTone"
        @field-update="handleFieldUpdate"
        @submit="handleSubmit"
      />
      <AppFooter :year="currentYear" :contact="content.contact" />
    </template>
  </main>
</template>
