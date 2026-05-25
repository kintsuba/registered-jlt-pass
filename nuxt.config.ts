import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    airtableApiKey: process.env.NUXT_AIRTABLE_API_KEY,
    airtableBaseId: process.env.NUXT_AIRTABLE_BASE_ID,
    public: {
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      },
    },
  },
  modules: ["@nuxt/ui"],
  experimental: {
    viewTransition: true,
  },
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "登録日本語教員パス",
      meta: [
        {
          name: "description",
          content: "登録日本語教員試験の合格を目指す問題演習サイト",
        },
      ],
    },
  },
});
