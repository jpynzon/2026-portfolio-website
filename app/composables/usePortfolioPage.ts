export function usePortfolioPage() {
  const portfolioStore = usePortfolioStore()
  const state = storeToRefs(portfolioStore)

  async function initialize() {
    await portfolioStore.load()
  }

  return {
    ...state,
    initialize
  }
}

