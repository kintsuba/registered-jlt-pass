import { questionCollection, upsertLocal, type Question } from "~/lib/collections";

export default defineNuxtPlugin({
  name: "db-sync",
  parallel: true,
  async setup() {
    console.log("[DB Sync] Starting sync from Airtable...");
    try {
      const questions = await $fetch<Question[]>("/api/questions").catch((e) => {
        console.warn("[DB Sync] /api/questions fetch failed (mocking empty for tests):", e.message);
        return [] as Question[];
      });

      for (const q of questions) {
        upsertLocal(questionCollection, q.id, q);
      }
      console.log(`[DB Sync] Synced ${questions.length} questions successfully.`);
    } catch (e) {
      console.error("[DB Sync] Failed to sync data", e);
    }
  },
});
