<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
const route = useRoute();
const { currentUser } = useAuth();
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-0">
    <div class="w-full md:max-w-3xl lg:max-w-5xl mx-auto relative min-h-screen bg-white/60 md:bg-transparent shadow-xl md:shadow-none shadow-slate-200/40 flex flex-col">
      <!-- ヘッダー -->
      <header class="sticky top-0 z-40 bg-white/80 md:bg-white/60 backdrop-blur-md border-b border-slate-100 px-5 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <!-- 洗練されたシンボルマーク -->
          <div class="w-8 h-8 rounded-lg bg-sakura-500 text-white flex items-center justify-center shadow-sm shadow-sakura-200">
            <UIcon name="i-lucide-book" class="w-5 h-5" />
          </div>
          <span class="font-bold text-slate-700 tracking-tight text-[15px] md:text-lg">登録日本語教員パス</span>
        </NuxtLink>

        <!-- PC用ナビゲーション -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-sm font-bold text-slate-500 hover:text-sakura-600 transition-colors">ホーム</NuxtLink>
          <NuxtLink to="/records" class="text-sm font-bold text-slate-500 hover:text-sakura-600 transition-colors">学習記録</NuxtLink>
          <NuxtLink to="/settings" class="text-sm font-bold text-slate-500 hover:text-sakura-600 transition-colors">設定</NuxtLink>
          <UButton v-if="!currentUser" to="/login" color="neutral" variant="solid" class="ml-2 font-bold rounded-full">ログイン</UButton>
        </div>

        <!-- スマホ用ログインボタン -->
        <UButton v-if="!currentUser" to="/login" color="primary" variant="link" class="md:hidden font-bold">ログイン</UButton>
      </header>

      <!-- メインコンテンツ -->
      <main class="px-5 py-6 flex-1 flex flex-col">
        <slot />
      </main>

      <!-- スマホ用ボトムナビゲーション -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div class="w-full mx-auto bg-white/95 backdrop-blur-lg border-t border-slate-100 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          <div class="flex items-center justify-around h-16 px-2">
            <NuxtLink to="/" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors" :class="route.path === '/' ? 'text-sakura-600' : 'text-slate-400 hover:text-slate-600'">
              <UIcon name="i-lucide-home" class="w-6 h-6" />
              <span class="text-[10px] font-bold">ホーム</span>
            </NuxtLink>

            <NuxtLink to="/records" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors" :class="route.path === '/records' ? 'text-sakura-600' : 'text-slate-400 hover:text-slate-600'">
              <UIcon name="i-lucide-calendar-days" class="w-6 h-6" />
              <span class="text-[10px] font-bold">記録</span>
            </NuxtLink>

            <NuxtLink to="/settings" class="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors" :class="route.path === '/settings' ? 'text-sakura-600' : 'text-slate-400 hover:text-slate-600'">
              <UIcon name="i-lucide-settings" class="w-6 h-6" />
              <span class="text-[10px] font-bold">設定</span>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
