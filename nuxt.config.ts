import { navbarData, seoData } from './data'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: navbarData.homeTitle,
      titleTemplate: `%s - ${navbarData.homeTitle}`,
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      enableI18n: process.env.ENABLE_I18N
    }
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },
  site: {
    url: seoData.mySite,
    identity: {
      type: 'Person',
    },
    twitter: seoData.twitterHandle,
  },

  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },

  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/fontaine',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxtjs/i18n',
  ],

  content: {
    highlight: {
      theme: 'dracula',
    },
  },

  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix",
    defaultLocale: 'en',
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en-US.json"
      },
      {
        code: "zh",
        iso: "zh-CN",
        name: "普通话",
        file: "zh_CN.json"
      },
      {
        code: "de",
        iso: "de-DE",
        name: "Deutsch",
        file: "de_DE.json"
      },
      {
        code: "bn",
        iso: "bn-BD",
        name: "বাংলা",
        file: "bn-BD.json"
      }

    ],
  },
  
})
