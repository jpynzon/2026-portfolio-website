<script setup lang="ts">
import type { LinkItem } from '~/types/portfolio'

defineProps<{
  links: LinkItem[]
}>()

const { toggle, sync } = useTheme()

onMounted(() => {
  sync()
})
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

      <div class="app-header__actions">
        <button
          type="button"
          class="app-header__toggle"
          aria-label="Toggle color theme"
          title="Toggle light / dark"
          @click="toggle"
        >
          <svg class="ti-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg class="ti-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </button>

        <a class="app-header__cta" href="#contact">Let's Talk</a>
      </div>
    </div>
  </header>
</template>
