<template>
  <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <header class="flex items-center gap-3">
      <NuxtLink
        to="/"
        class="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </NuxtLink>
      <h1 class="text-xl font-bold text-slate-800">ジャンル別演習</h1>
    </header>

    <div class="grid gap-3">
      <div
        v-if="categories.length === 0"
        class="text-center py-10 text-slate-400 text-sm font-bold"
      >
        ジャンルデータがありません
      </div>
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="startSession(cat.id)"
        class="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-sakura-300 hover:shadow-md transition-all text-left active:scale-[0.98] cursor-pointer"
      >
        <div class="flex-1">
          <h2 class="font-bold text-slate-700">{{ cat.name }}</h2>
          <p class="text-xs text-slate-400 mt-1 font-bold">{{ cat.count }}問収録</p>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  questionCollection,
  sessionCollection,
  upsertLocal,
  type Session,
} from "~/lib/collections";
import { getCategoryQuestions } from "~/utils/quiz";
import { useLiveQuery } from "@tanstack/vue-db";

const router = useRouter();
const { data: dbItems } = useLiveQuery((q) =>
  q.from({ qs: questionCollection }).select(({ qs }) => qs),
);

const categories = computed(() => {
  const allQs = dbItems.value || [];
  const counts = new Map<string, number>();
  for (const q of allQs) {
    if (q && q.officialCategory) {
      counts.set(q.officialCategory, (counts.get(q.officialCategory) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({
      id,
      name: id,
      count,
    }))
    .sort((a, b) => b.count - a.count);
});

const startSession = async (categoryId: string) => {
  const questions = await getCategoryQuestions(categoryId, 10);
  if (questions.length === 0) {
    alert("問題がありません");
    return;
  }

  const sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const newSession: Session = {
    sessionId,
    mode: "category",
    categoryId,
    questionIds: questions.map((q) => q.id),
    questionCount: questions.length,
    correctCount: 0,
  };

  upsertLocal(sessionCollection, sessionId, newSession);

  router.push(`/session/${sessionId}`);
};
</script>
