<script setup lang="ts">
import type { ContactContent } from '~/types/portfolio'

defineProps<{
  year: number
  contact: ContactContent
}>()
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner">
      <p class="app-footer__copy">
        (c) {{ year }} Joshua Ynzon. Built with Nuxt and clean, scalable architecture.
      </p>
      <div class="app-footer__links">
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        <a :href="contact.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        <a :href="contact.github" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  </footer>
</template>

