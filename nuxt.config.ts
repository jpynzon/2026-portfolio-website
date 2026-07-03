// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-02',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/motion/nuxt', '@nuxt/image', '@vercel/analytics/nuxt'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      staticApiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      apiBase: process.env.NUXT_BACKEND_API_BASE || 'https://portfolio-api.jpynzon.dev/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.jpynzon.dev',
      turnstile: {
        siteKey: process.env.NUXT_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'
      }
    }
  },
  image: {
    domains: ['picsum.photos', 'i.pravatar.cc']
  },
  app: {
    head: {
      titleTemplate: '%s | Joshua Paulo Ynzon',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/logo.svg' }
      ],
      script: [
        {
          // Apply the saved/system theme before first paint (no flash).
          innerHTML:
            "(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();",
          tagPosition: 'head',
          tagPriority: 'critical'
        },
        {
          src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
          async: true,
          defer: true
        }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Software developer portfolio focused on clean architecture, reliable systems, and scalable web delivery.'
        }
      ]
    }
  }
})