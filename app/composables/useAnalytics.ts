// Google Analytics 4 (gtag.js).
//
// Boot it once, site-wide, from app.vue:
//   useAnalytics()
//
// Send custom events from anywhere:
//   const { trackEvent } = useAnalytics()
//   trackEvent('contact_submit', { method: 'form' })
//
// The measurement id lives in runtimeConfig.public.gaId
// (override per environment with NUXT_PUBLIC_GA_ID).

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function useAnalytics() {
  const {
    public: { gaId }
  } = useRuntimeConfig()

  // Load the gtag.js script into <head> (rendered on the server too, so it
  // starts fetching as early as possible). Skipped when no id is configured.
  if (gaId) {
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          async: true
        }
      ]
    })
  }

  // Initialise the dataLayer + gtag shim on the client, exactly once.
  if (import.meta.client && gaId && !window.gtag) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // gtag.js reads the arguments object off the dataLayer verbatim.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId)
  }

  function trackEvent(name: string, params: Record<string, unknown> = {}) {
    if (import.meta.client && window.gtag) {
      window.gtag('event', name, params)
    }
  }

  return { trackEvent }
}
