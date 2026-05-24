<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 font-sans text-slate-800 pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-0"
  >
    <!-- スマホ・PC両対応コンテナ -->
    <div
      class="w-full md:max-w-3xl lg:max-w-5xl mx-auto relative min-h-screen bg-white/60 md:bg-transparent shadow-xl md:shadow-none shadow-slate-200/40 flex flex-col"
    >
      <!-- ヘッダー -->
      <header
        class="sticky top-0 z-40 bg-white/80 md:bg-white/60 backdrop-blur-md border-b border-slate-100 px-5 py-4 flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center gap-2">
          <!-- 洗練されたシンボルマーク (SVG) -->
          <div
            class="w-8 h-8 rounded-lg bg-sakura-500 text-white flex items-center justify-center shadow-sm shadow-sakura-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <span class="font-bold text-slate-700 tracking-tight text-[15px] md:text-lg"
            >登録日本語教員パス</span
          >
        </NuxtLink>

        <!-- PC用ナビゲーション -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/"
            class="text-sm font-bold text-slate-500 hover:text-sakura-600 transition-colors"
            >ホーム</NuxtLink
          >
          <NuxtLink
            to="/records"
            class="text-sm font-bold text-slate-500 hover:text-sakura-600 transition-colors"
            >学習記録</NuxtLink
          >
          <NuxtLink
            to="/settings"
            class="text-sm font-bold text-slate-500 hover:text-sakura-600 transition-colors"
            >設定</NuxtLink
          >
          <NuxtLink
            to="/login"
            class="text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-colors ml-2"
            >ログイン</NuxtLink
          >
        </div>

        <!-- スマホ用ログインボタン -->
        <NuxtLink to="/login" class="md:hidden text-xs font-bold text-sakura-600"
          >ログイン</NuxtLink
        >
      </header>

      <!-- メインコンテンツ -->
      <main class="px-5 py-6 flex-1 flex flex-col">
        <slot />
      </main>

      <!-- スマホ用ボトムナビゲーション -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div
          class="w-full mx-auto bg-white/95 backdrop-blur-lg border-t border-slate-100 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
        >
          <div class="flex items-center justify-around h-16 px-2">
            <NuxtLink
              to="/"
              class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors"
              :class="
                route.path === '/' ? 'text-sakura-600' : 'text-slate-400 hover:text-slate-600'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span class="text-[10px] font-bold">ホーム</span>
            </NuxtLink>

            <NuxtLink
              to="/records"
              class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors"
              :class="
                route.path === '/records'
                  ? 'text-sakura-600'
                  : 'text-slate-400 hover:text-slate-600'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
              <span class="text-[10px] font-bold">記録</span>
            </NuxtLink>

            <NuxtLink
              to="/settings"
              class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors"
              :class="
                route.path === '/settings'
                  ? 'text-sakura-600'
                  : 'text-slate-400 hover:text-slate-600'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span class="text-[10px] font-bold">設定</span>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
