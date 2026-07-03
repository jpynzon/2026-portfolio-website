<script setup lang="ts">
import type { LinkItem } from '~/types/portfolio'

defineProps<{
  links: LinkItem[]
}>()

const { toggle, sync } = useTheme()

const isMenuOpen = ref(false)
const headerEl = ref<HTMLElement | null>(null)

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close the menu after navigating, when tapping outside, or on Escape.
const route = useRoute()
watch(() => route.fullPath, closeMenu)

const onDocumentClick = (event: MouseEvent) => {
  if (isMenuOpen.value && headerEl.value && !headerEl.value.contains(event.target as Node)) {
    closeMenu()
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => {
  sync()
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header ref="headerEl" class="app-header">
    <div class="app-header__inner">
      <NuxtLink to="/" class="app-header__brand" aria-label="Go to homepage">
        <img src="/logo.svg" alt="" width="38" height="38" class="app-header__brand-mark">
      </NuxtLink>

      <nav class="app-header__nav" aria-label="Main navigation">
        <NuxtLink v-for="link in links" :key="link.href" :to="link.href" class="app-header__link">
          {{ link.label }}
        </NuxtLink>
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

        <NuxtLink class="app-header__cta" to="/#contact">Let's Talk</NuxtLink>

        <button
          type="button"
          class="app-header__toggle app-header__menu-btn"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg v-if="!isMenuOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-if="isMenuOpen" id="mobile-nav" class="app-header__menu" aria-label="Mobile navigation">
      <NuxtLink
        v-for="link in links"
        :key="link.href"
        :to="link.href"
        class="app-header__menu-link"
        @click="closeMenu"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
