import type { PortfolioPayload } from '~/types/portfolio'
import { portfolioService } from '~/services/portfolio.service'

export const usePortfolioStore = defineStore('portfolio', () => {
  const content = ref<PortfolioPayload | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const featuredProjects = computed(
    () => content.value?.projects.filter((project) => project.featured) ?? []
  )

  const navLinks = computed(() => [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ])

  async function load(force = false) {
    if (isLoading.value) return
    if (content.value && !force) return

    isLoading.value = true
    error.value = null

    try {
      content.value = await portfolioService.fetchPortfolio()
    } catch {
      error.value = 'Unable to load portfolio content right now.'
    } finally {
      isLoading.value = false
    }
  }

  return {
    content,
    isLoading,
    error,
    featuredProjects,
    navLinks,
    load
  }
})
