<template>
  <div class="min-h-screen bg-slate-50 md:bg-slate-100 flex flex-col items-center">
    <ClientOnly>
      <div v-if="!session" class="flex items-center justify-center min-h-screen text-slate-400">
        読み込み中...
      </div>

      <div
        v-else
        class="flex flex-col w-full min-h-screen md:max-w-3xl md:min-h-[calc(100vh-4rem)] md:my-8 md:bg-white md:rounded-3xl md:shadow-xl md:border md:border-slate-200 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <header
          class="flex-none p-4 md:pt-10 flex items-center justify-center bg-transparent z-10 pt-8 shrink-0"
        >
          <h1 class="text-lg md:text-2xl font-bold text-slate-800">演習結果</h1>
        </header>

        <main
          class="flex-1 overflow-y-auto px-5 md:px-10 pb-32 md:pb-40 scrollbar-hide md:scrollbar-default"
        >
          <div class="max-w-2xl mx-auto">
            <!-- Result Summary Card -->
            <div
              class="bg-white md:bg-slate-50 rounded-3xl p-8 md:p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 md:border-slate-200 mb-8 md:mb-10 mt-2"
            >
              <p class="text-slate-500 font-bold mb-2 md:text-base">正答率</p>
              <div class="flex items-end justify-center gap-1 mb-2">
                <span
                  class="text-6xl md:text-7xl font-black"
                  :class="
                    percentage >= 80
                      ? 'text-emerald-500'
                      : percentage >= 60
                        ? 'text-amber-500'
                        : 'text-rose-500'
                  "
                >
                  {{ percentage }}
                </span>
                <span class="text-2xl md:text-3xl font-bold text-slate-400 mb-1.5 md:mb-2">%</span>
              </div>
              <p
                class="text-sm md:text-[15px] font-bold text-slate-400 bg-slate-50 md:bg-white inline-block px-3 py-1.5 md:px-4 md:py-1.5 rounded-full mt-2 md:mt-3 shadow-sm border border-slate-100"
              >
                {{ session.correctCount }} / {{ session.questionCount }} 問正解
              </p>
            </div>

            <!-- Incorrect Questions List -->
            <div v-if="incorrectQuestions.length > 0">
              <h2
                class="text-base md:text-lg font-bold text-slate-700 mb-4 md:mb-5 flex items-center gap-2"
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
                  class="text-rose-500 md:w-5 md:h-5"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                今回間違えた問題
              </h2>
              <div class="space-y-4 md:space-y-5">
                <div
                  v-for="q in incorrectQuestions"
                  :key="q.id"
                  class="bg-white md:bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-100 md:border-slate-200 shadow-sm"
                >
                  <div
                    class="inline-block px-2 py-1 md:px-2.5 md:py-1 bg-slate-100 text-slate-500 text-[10px] md:text-[11px] font-bold rounded md:rounded mb-2 md:mb-3"
                  >
                    {{ q.officialCategory || "未分類" }}
                  </div>
                  <p
                    class="text-sm md:text-base font-bold text-slate-800 mb-4 md:mb-5 leading-relaxed md:leading-relaxed"
                  >
                    {{ q.questionText.substring(0, 100)
                    }}{{ q.questionText.length > 100 ? "..." : "" }}
                  </p>
                  <div
                    class="p-3 md:p-4 bg-emerald-50 rounded-xl md:rounded-xl border border-emerald-100"
                  >
                    <p
                      class="text-[10px] md:text-[11px] font-bold text-emerald-600 mb-1 md:mb-1.5 uppercase tracking-wider"
                    >
                      正解
                    </p>
                    <p class="text-sm md:text-[15px] font-bold text-emerald-800">
                      {{ q.choices[q.correctChoice] }}
                    </p>
                  </div>

                  <!-- Accordion for explanation -->
                  <details class="group mt-3 md:mt-4">
                    <summary
                      class="text-[11px] md:text-xs font-bold text-sakura-600 cursor-pointer list-none flex items-center gap-1 p-2 md:p-2 -ml-2 rounded-lg md:rounded-lg hover:bg-sakura-50 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="transition-transform group-open:rotate-180 md:w-4 md:h-4"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                      解説を読む
                    </summary>
                    <div
                      class="pt-3 md:pt-4 text-xs md:text-[13px] text-slate-600 leading-relaxed md:leading-relaxed whitespace-pre-wrap border-t border-slate-100 md:border-slate-200 mt-2 md:mt-3"
                    >
                      <p class="font-bold text-slate-400 mb-1 md:mb-1.5">【解説】</p>
                      {{ q.explanation }}

                      <template v-if="q.choiceExplanations">
                        <p class="font-bold text-slate-400 mt-4 md:mt-5 mb-1 md:mb-1.5">
                          【選択肢の解説】
                        </p>
                        {{ q.choiceExplanations }}
                      </template>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            <div
              v-else
              class="bg-emerald-50 text-emerald-600 rounded-2xl md:rounded-2xl p-6 md:p-10 text-center shadow-sm"
            >
              <div
                class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-3 md:mb-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <p class="font-bold md:text-lg">全問正解です！素晴らしい！</p>
            </div>
          </div>
        </main>

        <!-- Bottom Actions -->
        <div
          class="absolute md:absolute bottom-0 left-0 right-0 w-full bg-white/95 md:bg-white/90 backdrop-blur-lg border-t border-slate-100 p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] md:pb-6 z-20"
        >
          <div class="flex gap-3 md:gap-4 max-w-2xl mx-auto">
            <NuxtLink
              to="/"
              class="flex-1 py-4 md:py-4 flex items-center justify-center font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-2xl md:rounded-xl transition-colors active:scale-[0.98] md:text-[15px] cursor-pointer"
            >
              ホームへ
            </NuxtLink>
            <button
              @click="retrySession"
              class="flex-[2] py-4 md:py-4 text-center font-bold text-white bg-sakura-600 hover:bg-sakura-700 rounded-2xl md:rounded-xl shadow-[0_4px_12px_rgba(244,114,182,0.3)] transition-all active:scale-[0.98] md:text-[15px] cursor-pointer"
            >
              同じ条件でもう一度
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  questionCollection,
  sessionCollection,
  upsertLocal,
  type Session,
  type Question,
} from "~/lib/collections";
import {
  getCategoryQuestions,
  getRandomQuestions,
  getIncorrectQuestions,
  getBookmarkedQuestions,
} from "~/utils/quiz";
import { useLiveQuery } from "@tanstack/vue-db";
import { eq } from "@tanstack/db";

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const sessionId = route.params.id as string;

const { data: sessionItems } = useLiveQuery((q) =>
  q
    .from({ s: sessionCollection })
    .where(({ s }) => eq(s.sessionId, sessionId))
    .select(({ s }) => s),
);
const session = computed(() => sessionItems.value?.[0] || null);

const percentage = computed(() => {
  if (!session.value || session.value.questionCount === 0) return 0;
  return Math.round((session.value.correctCount / session.value.questionCount) * 100);
});

const { data: allQsItems } = useLiveQuery((q) =>
  q.from({ qs: questionCollection }).select(({ qs }) => qs),
);

const incorrectQuestions = computed(() => {
  if (!session.value || !session.value.incorrectQuestionIds) return [];

  const allQs = allQsItems.value || [];
  return session.value.incorrectQuestionIds
    .map((id) => allQs.find((q) => q.id === id))
    .filter((q): q is Question => q !== undefined);
});

const retrySession = async () => {
  if (!session.value) return;

  const mode = session.value.mode;
  let questions: Question[] = [];

  if (mode === "random") questions = await getRandomQuestions(10);
  else if (mode === "category" && session.value.categoryId)
    questions = await getCategoryQuestions(session.value.categoryId, 10);
  else if (mode === "incorrect") questions = await getIncorrectQuestions(10);
  else if (mode === "bookmark") questions = await getBookmarkedQuestions(10);

  if (questions.length === 0) {
    alert("対象の問題がありません");
    return;
  }

  const newSessionId = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const newSession: Session = {
    sessionId: newSessionId,
    mode,
    categoryId: session.value.categoryId,
    questionIds: questions.map((q) => q.id),
    questionCount: questions.length,
    correctCount: 0,
  };

  upsertLocal(sessionCollection, newSessionId, newSession);

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      router.push(`/session/${newSessionId}`);
    });
  } else {
    router.push(`/session/${newSessionId}`);
  }
};
</script>

<style scoped>
/* Hide scrollbar for cleaner mobile look */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
