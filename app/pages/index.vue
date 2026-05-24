<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useLiveQuery } from "@tanstack/vue-db";
import {
  questionCollection,
  sessionCollection,
  upsertLocal,
  type Session,
} from "~/lib/collections";
import { getRandomQuestions, getIncorrectQuestions, getBookmarkedQuestions } from "~/utils/quiz";

const router = useRouter();

// 動的メッセージのモックデータ
const dynamicMessages = [
  { sub: "3日連続学習中！", main: "素晴らしいペースです" },
  { sub: "未正解が18問あります", main: "苦手克服から始めますか？" },
  { sub: "本日の演習: 50問", main: "少し休憩しませんか？☕️" },
  { sub: "新しい一日です", main: "今日もコツコツ進めましょう" },
];

const currentMessage = ref(dynamicMessages[0]);

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * dynamicMessages.length);
  currentMessage.value = dynamicMessages[randomIndex];
});

const { data: dbQuestions } = useLiveQuery((q) =>
  q.from({ questions: questionCollection }).select(({ questions }) => questions),
);

// 取得した問題数を計算
const loadedCount = computed(() => dbQuestions.value?.length || 0);

const createAndGoToSession = async (
  mode: "random" | "incorrect" | "bookmark",
  getQuestions: () => Promise<any[]>,
) => {
  const questions = await getQuestions();
  if (questions.length === 0) {
    alert("対象の問題がありません");
    return;
  }

  const sessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const newSession: Session = {
    sessionId,
    mode,
    questionIds: questions.map((q) => q.id),
    questionCount: questions.length,
    correctCount: 0,
  };

  upsertLocal(sessionCollection, sessionId, newSession);

  router.push(`/session/${sessionId}`);
};

const startRandomSession = () => createAndGoToSession("random", () => getRandomQuestions(10));
const startIncorrectSession = () =>
  createAndGoToSession("incorrect", () => getIncorrectQuestions(10));
const startBookmarkSession = () =>
  createAndGoToSession("bookmark", () => getBookmarkedQuestions(10));
</script>

<template>
  <div class="space-y-8 md:space-y-12">
    <!-- 動的ダッシュボードヘッダー -->
    <section class="mb-6 md:mb-10 min-h-[84px] md:min-h-[100px] flex flex-col justify-end">
      <p class="text-sm md:text-base text-sakura-600 font-bold mb-1.5">{{ currentMessage?.sub }}</p>
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
        {{ currentMessage?.main }}
      </h1>
    </section>

    <!-- メイン学習メニュー -->
    <section>
      <div class="grid gap-4 mt-6">
        <button
          @click="startRandomSession"
          class="group flex items-center justify-between p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:border-sakura-200 hover:shadow-md hover:bg-sakura-50/30 text-sakura-500 active:scale-[0.98] transition-all cursor-pointer"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sakura-50 text-sakura-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </div>
            <div>
              <h2 class="font-bold text-slate-800 text-[18px] md:text-2xl text-left">
                ランダム演習
              </h2>
              <p class="text-[12px] md:text-sm text-slate-500 mt-1 md:mt-1.5 font-bold">
                全範囲から10問出題
              </p>
            </div>
          </div>
          <div class="text-sakura-400 group-hover:translate-x-1 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </button>

        <div class="grid grid-cols-2 gap-3 md:gap-4 mt-2">
          <button
            @click="startIncorrectSession"
            class="flex flex-col items-center justify-center p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:border-rose-200 hover:shadow-md hover:bg-rose-50/30 text-rose-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div
              class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 md:mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 text-[17px] md:text-xl">間違えた問題</h3>
            <p class="text-[12px] md:text-sm text-slate-400 mt-1.5 md:mt-2">弱点を克服</p>
          </button>

          <NuxtLink
            to="/categories"
            class="flex flex-col items-center justify-center p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md hover:bg-blue-50/30 text-blue-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div
              class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4 md:mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 7h-9" />
                <path d="M14 17H5" />
                <circle cx="17" cy="17" r="3" />
                <circle cx="7" cy="7" r="3" />
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 text-[17px] md:text-xl">ジャンル別</h3>
            <p class="text-[12px] md:text-sm text-slate-400 mt-1.5 md:mt-2">出題範囲から選ぶ</p>
          </NuxtLink>

          <button
            @click="startBookmarkSession"
            class="flex flex-col items-center justify-center p-5 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:border-amber-200 hover:shadow-md hover:bg-amber-50/30 text-amber-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div
              class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4 md:mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 text-[17px] md:text-xl">ブックマーク</h3>
            <p class="text-[12px] md:text-sm text-slate-400 mt-1.5 md:mt-2">保存した問題</p>
          </button>

          <div
            class="flex flex-col items-center justify-center p-5 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm opacity-60"
          >
            <div
              class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mb-4 md:mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 md:w-8 md:h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 text-[17px] md:text-xl">過去問演習</h3>
            <p class="text-[12px] md:text-sm text-slate-400 mt-1.5 md:mt-2">準備中</p>
          </div>
        </div>
      </div>
    </section>

    <!-- その他のメニュー -->
    <section class="pt-4 md:pt-6 border-t border-slate-200/60">
      <div class="space-y-4">
        <NuxtLink
          to="/settings"
          class="flex items-center justify-between bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 hover:border-sakura-200 hover:shadow-md transition-all active:scale-[0.98]"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 text-[16px] md:text-lg">設定・同期</h3>
            </div>
          </div>
          <div class="text-slate-300">
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </NuxtLink>
      </div>

      <!-- TanStack DB Status (検証用) -->
      <div class="mt-8 text-center">
        <p class="text-xs text-slate-400 font-mono">
          <ClientOnly>
            <span>TanStack DB: {{ loadedCount }} questions loaded.</span>
            <template #fallback>
              <span>Loading local database...</span>
            </template>
          </ClientOnly>
        </p>
      </div>
    </section>
  </div>
</template>
