import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    alias: {
      "bun:test": "vite-plus/test",
    },
    server: {
      deps: {
        inline: ["@nuxt/test-utils", "@vue/compiler-sfc"],
      },
    },
  },
});
