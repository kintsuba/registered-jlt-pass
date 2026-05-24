<template>
  <div class="min-h-screen bg-slate-50 md:bg-slate-100 flex flex-col items-center">
    <ClientOnly>
      <div
        v-if="!session || !currentQuestion"
        class="flex items-center justify-center min-h-screen text-slate-400"
      >
        読み込み中...
      </div>

      <div
        v-else
        class="flex flex-col w-full min-h-screen md:max-w-5xl md:min-h-[calc(100vh-4rem)] md:my-8 md:bg-white md:rounded-3xl md:shadow-xl md:border md:border-slate-200 relative md:overflow-hidden"
      >
        <!-- ヘッダー -->
        <header
          class="flex-none p-4 md:px-6 md:py-5 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100 z-10 shrink-0 md:bg-transparent md:border-none"
        >
          <button
            @click="confirmExit"
            class="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div class="flex-1 px-4 md:px-6">
            <div class="h-2.5 w-full bg-slate-100 md:bg-slate-200 rounded-full overflow-hidden">
              <div
                class="h-full bg-sakura-400 transition-all duration-500 ease-out"
                :style="{ width: `${((currentIndex + 1) / session.questionCount) * 100}%` }"
              ></div>
            </div>
            <p
              class="text-center text-[11px] md:text-xs font-bold text-slate-400 md:text-slate-500 mt-1.5 md:mt-2"
            >
              {{ currentIndex + 1 }} / {{ session.questionCount }}
            </p>
          </div>
          <button
            @click="toggleBookmark"
            class="w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            :class="
              isBookmarked
                ? 'text-amber-400 bg-amber-50'
                : 'text-slate-300 hover:bg-slate-100 hover:text-slate-500'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              :fill="isBookmarked ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </button>
        </header>

        <!-- コンテンツエリア (モバイル:縦積み, PC:横並び) -->
        <div class="flex flex-col md:flex-row flex-1 md:overflow-hidden relative">
          <!-- メインコンテンツ (左側) -->
          <main
            class="flex-1 md:overflow-y-auto p-5 md:p-8 pb-10 md:pb-8 scrollbar-hide md:scrollbar-default"
          >
            <div class="max-w-2xl mx-auto">
              <div class="mb-8 md:mb-10">
                <div
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md bg-slate-200 text-slate-500 text-[10px] md:text-xs font-bold mb-3 md:mb-4"
                >
                  {{ currentQuestion.officialCategory || "未分類" }}
                </div>
                <h2
                  id="question-heading"
                  tabindex="-1"
                  class="text-[17px] md:text-xl font-bold text-slate-800 leading-relaxed md:leading-loose whitespace-pre-wrap outline-none"
                >
                  {{ currentQuestion.questionText }}
                </h2>
              </div>

              <div class="space-y-3 md:space-y-4">
                <button
                  v-for="(choice, idx) in currentChoices"
                  :key="idx"
                  @click="selectChoice(choice.originalIndex)"
                  :disabled="hasAnswered"
                  class="w-full text-left p-4 md:p-5 rounded-2xl md:rounded-2xl border-2 md:border-2 transition-all relative overflow-hidden cursor-pointer disabled:cursor-default"
                  :class="getChoiceClass(choice.originalIndex)"
                >
                  <div class="flex items-start gap-3 md:gap-4">
                    <div
                      class="flex-none w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-bold text-sm md:text-[15px] border-2 mt-0.5 md:mt-0"
                      :class="getChoiceIndicatorClass(choice.originalIndex)"
                    >
                      {{ ["A", "B", "C", "D", "E"][idx] || idx + 1 }}
                    </div>
                    <span class="text-sm md:text-base font-bold flex-1 pt-0.5">{{
                      choice.text
                    }}</span>
                  </div>
                </button>
              </div>
            </div>
          </main>

          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8 md:translate-y-0 md:translate-x-8"
            enter-to-class="opacity-100 translate-y-0 md:translate-x-0"
          >
            <aside
              v-if="hasAnswered"
              ref="explanationRef"
              class="w-full md:w-[420px] shrink-0 bg-white md:bg-slate-50 md:border-l md:border-slate-200 z-10 flex flex-col md:overflow-y-auto"
            >
              <div class="p-6 md:p-8 pt-6 md:pt-8 flex-1">
                <div class="max-w-2xl mx-auto">
                  <div class="flex flex-col gap-6 md:gap-8">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-4">
                        <div
                          v-if="isCorrect"
                          class="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 md:w-7 md:h-7"
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
                        <div
                          v-else
                          class="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 md:w-7 md:h-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </div>
                        <h3
                          class="text-xl md:text-2xl font-bold"
                          :class="isCorrect ? 'text-emerald-600' : 'text-rose-600'"
                        >
                          {{ isCorrect ? "正解！" : "不正解..." }}
                        </h3>
                      </div>

                      <div
                        class="prose prose-sm md:prose-sm prose-slate max-w-none text-sm leading-relaxed mb-8 md:mb-0"
                      >
                        <h4 class="text-slate-500 mb-2 font-bold text-xs uppercase tracking-wider">
                          解説
                        </h4>
                        <div class="whitespace-pre-wrap">{{ currentQuestion.explanation }}</div>

                        <template v-if="currentQuestion.choiceExplanations">
                          <h4
                            class="text-slate-500 mt-6 mb-2 font-bold text-xs uppercase tracking-wider"
                          >
                            選択肢の解説
                          </h4>
                          <div class="whitespace-pre-wrap">
                            {{ currentQuestion.choiceExplanations }}
                          </div>
                        </template>
                      </div>
                    </div>

                    <div class="w-full shrink-0">
                      <button
                        @click="nextQuestion"
                        class="w-full bg-slate-800 text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform shadow-lg md:text-base cursor-pointer"
                      >
                        {{ isLastQuestion ? "結果を見る" : "次の問題へ" }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </Transition>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  questionCollection,
  sessionCollection,
  progressCollection,
  upsertLocal,
  type Session,
  type Question,
  type Progress,
} from "~/lib/collections";
import { useLiveQuery } from "@tanstack/vue-db";
import { eq, queryOnce } from "@tanstack/db";

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

watch(session, (newVal) => {
  if (newVal === undefined && sessionItems.value !== undefined) {
    // データがロードされたがセッションが無い場合
    alert("セッションが見つかりません");
    router.replace("/");
  }
});

const currentIndex = ref(0);
const hasAnswered = ref(false);
const selectedChoice = ref<number | null>(null);
const isCorrect = ref(false);
const isBookmarked = ref(false);
const explanationRef = ref<HTMLElement | null>(null);

// シャッフルされた選択肢を保持
const currentChoices = ref<{ text: string; originalIndex: number }[]>([]);

const { data: allQuestions } = useLiveQuery((q) =>
  q.from({ qs: questionCollection }).select(({ qs }) => qs),
);

const currentQuestion = computed(() => {
  if (!session.value) return null;
  const qId = session.value.questionIds[currentIndex.value];
  const qObj = allQuestions.value?.find((x) => x.id === qId);
  return qObj || null;
});

const isLastQuestion = computed(() => {
  if (!session.value) return false;
  return currentIndex.value === session.value.questionCount - 1;
});

const loadQuestion = async () => {
  hasAnswered.value = false;
  selectedChoice.value = null;
  isCorrect.value = false;

  if (!currentQuestion.value) return;

  const rawChoices = currentQuestion.value.choices || [];

  const choices = rawChoices.map((text: string, i: number) => ({ text, originalIndex: i }));
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  currentChoices.value = choices;

  // progressの取得
  const progressList = await queryOnce((q) =>
    q.from({ p: progressCollection }).select(({ p }) => p),
  );
  const existing = progressList.find((p) => p.questionId === currentQuestion.value?.id);
  isBookmarked.value = existing?.bookmarked || false;
};

watch(
  currentQuestion,
  (newQ) => {
    if (newQ && currentChoices.value.length === 0) {
      loadQuestion();
    }
  },
  { immediate: true },
);

const selectChoice = async (originalIndex: number) => {
  if (hasAnswered.value || !currentQuestion.value || !session.value) return;

  selectedChoice.value = originalIndex;
  hasAnswered.value = true;
  isCorrect.value = originalIndex === currentQuestion.value.correctChoice;

  // スマホなどでの閲覧時、自然に解説が画面に入るようにスクロール
  // PC（横並び）ではスクロール不要＆アニメーション中のバウンスを防ぐ
  if (window.innerWidth < 768) {
    // アニメーション（500ms）完了後にスクロールすることで、スクロール位置のバウンス（行き過ぎて戻る）を完全に防ぐ
    setTimeout(() => {
      if (explanationRef.value) {
        explanationRef.value.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 400);
  }

  if (isCorrect.value) {
    sessionCollection.update(session.value.sessionId, (draft) => {
      draft.correctCount++;
    });
  } else {
    sessionCollection.update(session.value.sessionId, (draft) => {
      draft.incorrectQuestionIds = [
        ...(draft.incorrectQuestionIds || []),
        currentQuestion.value!.id,
      ];
    });
  }

  const progressList = await queryOnce((q) =>
    q.from({ p: progressCollection }).select(({ p }) => p),
  );
  const existing = progressList.find((p) => p.questionId === currentQuestion.value?.id);

  const newProgress: Progress = existing
    ? { ...existing }
    : {
        questionId: currentQuestion.value.id,
        hasAnswered: false,
        hasCorrect: false,
        attemptCount: 0,
        wrongCount: 0,
        bookmarked: false,
      };

  newProgress.hasAnswered = true;
  newProgress.attemptCount++;
  if (isCorrect.value) {
    newProgress.hasCorrect = true;
  } else {
    newProgress.wrongCount++;
  }
  newProgress.lastAnsweredAt = new Date().toISOString();
  newProgress.bookmarked = isBookmarked.value;

  upsertLocal(progressCollection, newProgress.questionId, newProgress);
};

const toggleBookmark = async () => {
  if (!currentQuestion.value) return;
  isBookmarked.value = !isBookmarked.value;

  const progressList = await queryOnce((q) =>
    q.from({ p: progressCollection }).select(({ p }) => p),
  );
  const existing = progressList.find((p) => p.questionId === currentQuestion.value?.id);
  if (existing) {
    progressCollection.update(existing.questionId, (draft) => {
      draft.bookmarked = isBookmarked.value;
    });
  } else {
    progressCollection.insert({
      questionId: currentQuestion.value.id,
      hasAnswered: false,
      hasCorrect: false,
      attemptCount: 0,
      wrongCount: 0,
      bookmarked: isBookmarked.value,
    });
  }
};

const getChoiceClass = (originalIndex: number) => {
  if (!hasAnswered.value) return "border-slate-200 bg-white hover:border-slate-300";

  const isSelected = selectedChoice.value === originalIndex;
  const isActualCorrect = currentQuestion.value?.correctChoice === originalIndex;

  if (isActualCorrect) {
    return "border-emerald-500 bg-emerald-50 text-emerald-900 z-10 scale-[1.02] shadow-md";
  }

  if (isSelected && !isActualCorrect) {
    return "border-rose-400 bg-rose-50 text-rose-900 z-10 scale-[1.02] shadow-md";
  }

  return "border-slate-100 bg-slate-50 opacity-50";
};

const getChoiceIndicatorClass = (originalIndex: number) => {
  if (!hasAnswered.value) return "border-slate-200 text-slate-400 bg-slate-50";

  const isSelected = selectedChoice.value === originalIndex;
  const isActualCorrect = currentQuestion.value?.correctChoice === originalIndex;

  if (isActualCorrect) {
    return "border-emerald-500 bg-emerald-500 text-white";
  }

  if (isSelected && !isActualCorrect) {
    return "border-rose-400 bg-rose-400 text-white";
  }

  return "border-slate-200 text-slate-300";
};

const nextQuestion = async () => {
  if (!session.value) return;

  if (isLastQuestion.value) {
    sessionCollection.update(session.value.sessionId, (draft) => {
      draft.completedAt = new Date().toISOString();
    });

    // ページ遷移（Nuxt側の experimental.viewTransition に任せる）
    router.push(`/result/${session.value?.sessionId}`);
  } else {
    // View Transitions による同一ページ内のスライドイン効果
    if (document.startViewTransition) {
      document.documentElement.style.setProperty("--vt-direction", "-100%");
      const transition = document.startViewTransition(async () => {
        window.scrollTo(0, 0);
        currentIndex.value++;
        await loadQuestion();
      });
      // MANDATORY Accessibility Routing (from modern-web-guidance)
      transition.finished.finally(() => {
        document.getElementById("question-heading")?.focus();
      });
    } else {
      window.scrollTo(0, 0);
      currentIndex.value++;
      loadQuestion();
      // Accessibility routing fallback
      setTimeout(() => document.getElementById("question-heading")?.focus(), 0);
    }
  }
};

const confirmExit = () => {
  if (confirm("演習を中断してホームに戻りますか？\n（進捗は次回引き継がれます）")) {
    router.push("/");
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
