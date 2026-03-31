export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: { exposeConfig: true },
  compatibilityDate: '2025-01-01',
  devServer: {
    host: '0.0.0.0',
  },
  vite: {
    server: {
      allowedHosts: 'all',
      hmr: {
        clientPort: 443,
        protocol: 'wss',
      }
    }
  }
})
