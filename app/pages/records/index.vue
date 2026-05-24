<script setup lang="ts">
import { computed } from "vue";
import { useLiveQuery } from "@tanstack/vue-db";
import { sessionCollection, progressCollection, questionCollection } from "~/lib/collections";

const { data: sessions } = useLiveQuery((q) =>
  q.from({ s: sessionCollection }).select(({ s }) => s),
);
const { data: progresses } = useLiveQuery((q) =>
  q.from({ p: progressCollection }).select(({ p }) => p),
);
const { data: questions } = useLiveQuery((q) =>
  q.from({ q: questionCollection }).select(({ q }) => q),
);

const totalQuestions = computed(() => questions.value?.length || 0);

const totalAnswered = computed(() => {
  if (!progresses.value) return 0;
  return progresses.value.filter((p) => p.hasAnswered).length;
});

const overallAccuracy = computed(() => {
  if (!sessions.value || sessions.value.length === 0) return 0;
  let totalAttempted = 0;
  let totalCorrect = 0;
  sessions.value.forEach((s) => {
    if (s.completedAt) {
      totalAttempted += s.questionCount;
      totalCorrect += s.correctCount;
    }
  });
  if (totalAttempted === 0) return 0;
  return Math.round((totalCorrect / totalAttempted) * 100);
});

const completedSessions = computed(() => {
  if (!sessions.value) return [];
  return sessions.value
    .filter((s) => s.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());
});

const categoryStats = computed(() => {
  if (!questions.value || !progresses.value) return [];

  const stats: Record<string, { total: number; correct: number }> = {};

  questions.value.forEach((q) => {
    const cat = q.officialCategory || "未分類";
    if (!stats[cat]) stats[cat] = { total: 0, correct: 0 };
    stats[cat].total++;

    const p = progresses.value.find((p) => p.questionId === q.id);
    if (p && p.hasCorrect) {
      stats[cat].correct++;
    }
  });

  return Object.entries(stats)
    .map(([name, data]) => ({
      name,
      total: data.total,
      correct: data.correct,
      rate: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    }))
    .sort((a, b) => b.rate - a.rate);
});

const formatDate = (isoString: string) => {
  const d = new Date(isoString);
  return d.toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getModeLabel = (mode: string) => {
  const labels: Record<string, string> = {
    random: "ランダム演習",
    incorrect: "間違えた問題",
    bookmark: "ブックマーク",
    category: "ジャンル別演習",
  };
  return labels[mode] || "演習";
};
</script>

<template>
  <div class="space-y-8 md:space-y-12 pb-20">
    <section class="mb-6 md:mb-10 min-h-[84px] md:min-h-[100px] flex flex-col justify-end">
      <p class="text-sm md:text-base text-blue-600 font-bold mb-1.5">Learning Records</p>
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
        学習記録
      </h1>
    </section>

    <!-- サマリー・統計 -->
    <section class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      <!-- 全体 ＆ ジャンル別 (Full Width on Desktop) -->
      <div
        class="col-span-full bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
      >
        <div class="flex flex-wrap gap-8 items-center">
          <!-- 左側：総合正答率 -->
          <div
            class="flex-1 min-w-[200px] flex flex-col items-center justify-center text-center md:border-r border-slate-100"
          >
            <p class="text-slate-500 font-bold text-sm mb-4">総合正答率</p>
            <div class="relative w-[140px] h-[140px] mx-auto flex items-center justify-center">
              <svg class="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="currentColor"
                  stroke-width="10"
                  class="text-slate-100"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="currentColor"
                  stroke-width="10"
                  stroke-linecap="round"
                  class="text-blue-500 transition-all duration-1000 ease-out"
                  :stroke-dasharray="251.2"
                  :stroke-dashoffset="251.2 - (251.2 * overallAccuracy) / 100"
                />
              </svg>
              <div class="z-10 flex items-baseline gap-1 text-blue-600">
                <span class="text-5xl font-extrabold tracking-tighter">{{ overallAccuracy }}</span>
                <span class="text-lg font-bold">%</span>
              </div>
            </div>
          </div>

          <!-- 右側：ジャンル別正答率 -->
          <div class="flex-[2_1_300px] flex flex-col justify-center">
            <p class="text-slate-500 font-bold text-sm mb-4">ジャンル別正答率</p>
            <div class="flex flex-col gap-4">
              <div v-if="categoryStats.length === 0" class="text-sm text-slate-400">
                データがありません
              </div>
              <div v-for="cat in categoryStats" :key="cat.name" class="flex flex-col gap-1.5">
                <div class="flex justify-between items-center text-sm">
                  <span
                    class="font-bold text-slate-700 overflow-hidden text-ellipsis whitespace-nowrap mr-2"
                    >{{ cat.name }}</span
                  >
                  <span class="font-bold text-slate-500 whitespace-nowrap"
                    >{{ cat.rate }}%
                    <span class="font-normal text-slate-400"
                      >({{ cat.correct }}/{{ cat.total }})</span
                    ></span
                  >
                </div>
                <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-blue-400 rounded-full transition-all duration-1000 ease-out"
                    :style="{ width: `${cat.rate}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 解答済み問題 -->
      <div
        class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
      >
        <div>
          <p class="text-slate-500 font-bold text-sm mb-1">解答済み問題</p>
          <div class="flex items-baseline gap-1.5 text-slate-800">
            <span class="text-3xl md:text-4xl font-extrabold">{{ totalAnswered }}</span>
            <span class="text-sm font-bold text-slate-400">/ {{ totalQuestions }}問</span>
          </div>
        </div>
        <div class="mt-5 h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            class="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
            :style="{
              width: `${totalQuestions > 0 ? (totalAnswered / totalQuestions) * 100 : 0}%`,
            }"
          ></div>
        </div>
      </div>

      <!-- 完了セッション -->
      <div
        class="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
      >
        <div>
          <p class="text-slate-500 font-bold text-sm mb-1">完了セッション</p>
          <div class="flex items-baseline gap-1.5 text-slate-800">
            <span class="text-3xl md:text-4xl font-extrabold">{{ completedSessions.length }}</span>
            <span class="text-sm font-bold text-slate-400">回</span>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-2 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span class="text-xs font-bold">継続は力なり</span>
        </div>
      </div>
    </section>

    <!-- セッション履歴 -->
    <section class="mt-10 md:mt-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">最近の履歴</h2>
      </div>

      <div
        v-if="completedSessions.length === 0"
        class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center"
      >
        <p class="text-slate-400 font-bold text-sm md:text-base">
          まだ演習の履歴がありません。<br />ホームから問題を解いてみましょう！
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        <div
          v-for="session in completedSessions"
          :key="session.sessionId"
          class="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              :class="
                session.correctCount === session.questionCount
                  ? 'bg-emerald-50 text-emerald-500'
                  : 'bg-slate-50 text-slate-400'
              "
            >
              <svg
                v-if="session.correctCount === session.questionCount"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <svg
                v-else
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
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <p class="text-[11px] md:text-xs font-bold text-slate-400">
              {{ formatDate(session.completedAt!) }}
            </p>
          </div>

          <div>
            <h3 class="font-bold text-slate-800 text-base md:text-lg mb-1">
              {{ getModeLabel(session.mode) }}
            </h3>
            <div class="flex items-baseline justify-between mt-3 pt-3 border-t border-slate-50">
              <p
                class="text-xs font-bold"
                :class="
                  session.correctCount === session.questionCount
                    ? 'text-emerald-500'
                    : 'text-slate-400'
                "
              >
                正答率 {{ Math.round((session.correctCount / session.questionCount) * 100) }}%
              </p>
              <div
                class="text-xl font-extrabold tracking-tight"
                :class="
                  session.correctCount === session.questionCount
                    ? 'text-emerald-500'
                    : 'text-slate-700'
                "
              >
                {{ session.correctCount }}
                <span class="text-sm text-slate-400 font-bold">/ {{ session.questionCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- クラウド同期機能への導線 -->
    <section
      class="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 rounded-3xl border border-indigo-100 relative overflow-hidden"
    >
      <div
        class="absolute -right-12 -bottom-12 w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-50"
      ></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div
          class="w-12 h-12 bg-white rounded-2xl shadow-sm text-indigo-500 flex items-center justify-center shrink-0"
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
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </div>
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-lg md:text-xl font-bold text-indigo-900 mb-2">学習データを同期</h2>
          <p class="text-sm text-indigo-700/80 font-bold max-w-md">
            ログインすると、学習記録をクラウドに保存して複数のデバイス間で進捗を同期できます。
          </p>
        </div>
        <NuxtLink
          to="/settings"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98] shrink-0"
        >
          設定を開く
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
