<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
      @click="emit('close')"
    ></div>

    <!-- Modal Content -->
    <div
      class="relative bg-white rounded-3xl w-full max-w-sm md:max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
    >
      <div class="p-6 md:p-8 text-center">
        <div
          class="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-5"
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
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        </div>

        <h2 class="text-xl font-bold text-slate-800 mb-2">学習記録を保存しませんか？</h2>
        <p class="text-sm text-slate-500 font-bold leading-relaxed mb-6">
          5回分の演習お疲れ様です！<br />
          ログインすると、学習データがクラウドに同期され、どの端末からでも続きを学習できるようになります。
        </p>

        <div class="flex flex-col gap-3">
          <NuxtLink
            to="/settings"
            class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98] cursor-pointer"
            @click="emit('close')"
          >
            設定を開いてログインする
          </NuxtLink>
          <button
            @click="emit('close')"
            class="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
          >
            今はしない
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
