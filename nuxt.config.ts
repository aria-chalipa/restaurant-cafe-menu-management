import Material from '@primeuix/themes/material';
import tailwindcss from "@tailwindcss/vite";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@primevue/nuxt-module'],
  css: ['~/assets/css/main.css'],
  primevue: {
    options: {
      theme: {
        preset: Material,
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})