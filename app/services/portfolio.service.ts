import type { PortfolioPayload } from '~/types/portfolio'
import { useHttpApi } from '~/config/httpApi'

export const portfolioService = {
  async fetchPortfolio() {
    const $api = useHttpApi('static')
    return $api.get<PortfolioPayload>('/portfolio')
  }
}