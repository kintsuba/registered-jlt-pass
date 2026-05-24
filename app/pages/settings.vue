<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useSync } from "~/composables/useSync";

const { currentUser, isAuthReady, logout } = useAuth();
const { syncAll } = useSync();
const isSyncing = ref(false);
const lastSyncedAt = ref<string | null>(null);

const handleSync = async () => {
  if (!currentUser.value) return;
  isSyncing.value = true;

  try {
    await syncAll();
    const now = new Date();
    lastSyncedAt.value = now.toLocaleString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Sync failed:", error);
    alert("同期に失敗しました。後でもう一度お試しください。");
  } finally {
    isSyncing.value = false;
  }
};

const handleLogout = async () => {
  if (confirm("ログアウトしてもよろしいですか？（未同期のローカルデータはそのまま残ります）")) {
    await logout();
  }
};

const handleDeleteAccount = () => {
  alert("アカウント削除機能は準備中です。");
};
</script>

<template>
  <div class="max-w-xl mx-auto py-6 px-4 md:py-10 space-y-6 md:space-y-8">
    <header>
      <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">設定</h1>
    </header>

    <div v-if="!isAuthReady" class="py-10 text-center">
      <div
        class="w-8 h-8 border-4 border-slate-300 border-t-transparent rounded-full animate-spin mx-auto"
      ></div>
    </div>

    <template v-else>
      <!-- Logged In View -->
      <section v-if="currentUser" class="space-y-6">
        <div
          class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-4"
        >
          <div
            class="w-14 h-14 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div class="overflow-hidden">
            <p class="text-xs text-slate-400 font-bold mb-0.5">ログイン中のアカウント</p>
            <p class="text-slate-800 font-bold truncate">{{ currentUser.email }}</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          <div class="p-6 border-b border-slate-100">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="font-bold text-slate-800 text-lg">クラウド同期</h2>
                <p class="text-xs text-slate-500 mt-1">
                  学習データをクラウドに保存し、複数端末で引き継ぐことができます。
                </p>
              </div>
              <div
                class="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9"
                  />
                </svg>
              </div>
            </div>

            <div class="flex items-center justify-between text-sm mb-6">
              <span class="text-slate-500 font-bold">最終同期</span>
              <span class="text-slate-800 font-mono">{{ lastSyncedAt || "同期記録なし" }}</span>
            </div>

            <button
              @click="handleSync"
              class="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-blue-600 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              :disabled="isSyncing"
            >
              <svg
                v-if="!isSyncing"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 21v-5h5" />
              </svg>
              <span
                v-else
                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></span>
              <span>{{ isSyncing ? "同期中..." : "今すぐ同期する" }}</span>
            </button>
          </div>
        </div>

        <div class="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          <button
            @click="handleLogout"
            class="w-full text-left px-6 py-4 border-b border-slate-100 text-slate-700 font-bold hover:bg-slate-50 flex items-center justify-between transition-colors"
          >
            <span>ログアウト</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
          </button>
          <button
            @click="handleDeleteAccount"
            class="w-full text-left px-6 py-4 text-rose-500 font-bold hover:bg-rose-50 flex items-center justify-between transition-colors"
          >
            <span>アカウントを削除</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 opacity-70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      </section>

      <!-- Logged Out View -->
      <section
        v-else
        class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 text-center"
      >
        <div
          class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-slate-800 mb-3">データを保護・同期する</h2>
        <p class="text-slate-500 text-sm leading-relaxed mb-8">
          現在、学習データはこの端末（ブラウザ）内のみに保存されています。<br />
          ログインすると、データがクラウドにバックアップされ、複数の端末で進捗を共有できます。
        </p>
        <NuxtLink
          to="/login"
          class="inline-flex w-full md:w-auto bg-sakura-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-sm hover:bg-sakura-600 hover:shadow transition-all justify-center items-center gap-2"
        >
          <span>ログイン・新規登録へ</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </NuxtLink>
      </section>
    </template>
  </div>
</template>
