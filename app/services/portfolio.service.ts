import type { PortfolioPayload } from '~/types/portfolio'

export const portfolioService = {
  async fetchPortfolio() {
    const { public: publicConfig } = useRuntimeConfig()
    return $fetch<PortfolioPayload>('/portfolio', {
      baseURL: publicConfig.apiBase
    })
  }
}