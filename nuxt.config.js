export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Oráculo Gratis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'El oráculo gratis más fiable de internet.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Global JS: https://go.nuxtjs.dev/config-js
  script: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/sitemap
    '@nuxtjs/sitemap',
    // https://go.nuxtjs.dev/gtm
    ['@nuxtjs/google-tag-manager', { id: 'G-98YJ7DPL49' }],
    // https://go.nuxtjs.dev/adsense
    ['@nuxtjs/google-adsense', { id: 'ca-pub-1497368073837433' }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
    proxyHeaders: false,
    credentials: false
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'es'
    }
  },

  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300, 500, 700],
      Raleway: {
        wght: [100, 300, 400, 500, 700],
        ital: [100]
      }
    },
    display: 'swap',
    prefetch: true
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  target: 'static',
  
  sitemap: {
    hostname: 'https://oraculogratis.net',
    gzip: true,
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/oraculo-si-o-no',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/oraculo-de-cartas',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/oraculo-del-amor',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/oraculo-de-nombres',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/oraculo-de-signos',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/tienda',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/usuario',
        changefreq: 'daily',
        priority: 0.8,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/registro',
        changefreq: 'daily',
        priority: 0.64,
        lastmod: '2023-02-18T20:47:34+00:00'
      },
      {
        url: '/politica-de-privacidad',
        changefreq: 'daily',
        priority: 0.51,
        lastmod: '2023-02-18T20:47:34+00:00'
      }
    ]
  }
}
