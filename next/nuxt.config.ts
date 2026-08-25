// AUGA — Nuxt 3 ko'chirish bosqichi. Etalon: ../*.html (30 ekran).
export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'AUGA — Davlat aktivlarini boshqarish tizimi',
      htmlAttrs: { lang: 'uz' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Onest:wght@300..800&display=swap' }
      ]
    }
  }
})
