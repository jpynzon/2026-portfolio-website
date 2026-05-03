// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-02',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/motion/nuxt', '@nuxt/image'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.jpynzon.dev'
    }
  },
  image: {
    domains: ['picsum.photos', 'i.pravatar.cc']
  },
  app: {
    head: {
      titleTemplate: '%s | Joshua Paulo Ynzon',
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