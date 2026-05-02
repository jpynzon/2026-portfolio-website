<script setup lang="ts">
import type { LinkItem } from '~/types/portfolio'

defineProps<{
  links: LinkItem[]
}>()
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <a href="#home" class="app-header__brand" aria-label="Go to homepage">
        JPY
      </a>

      <nav class="app-header__nav" aria-label="Main navigation">
        <a v-for="link in links" :key="link.href" :href="link.href" class="app-header__link">
          {{ link.label }}
        </a>
      </nav>

      <a class="app-header__cta" href="#contact">Let's Talk</a>
    </div>
  </header>
</template>

