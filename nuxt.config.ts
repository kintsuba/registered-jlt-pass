// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
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
