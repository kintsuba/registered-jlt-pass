<template>
  <UModal
    :open="state.isOpen"
    @update:open="onOpenChange"
    :ui="{
      content: 'bg-transparent shadow-none ring-0 sm:max-w-sm p-0',
      overlay: 'bg-slate-900/40 backdrop-blur-sm'
    }"
  >
    <template #content>
      <div class="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto">
        <div class="p-6 md:p-8 text-center">
          <div
            v-if="state.type === 'confirm'"
            class="mx-auto w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-5"
          >
            <UIcon name="i-lucide-alert-circle" class="w-6 h-6" />
          </div>
          <div
            v-else
            class="mx-auto w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-5"
          >
            <UIcon name="i-lucide-info" class="w-6 h-6" />
          </div>

          <p class="text-slate-700 font-bold text-base md:text-lg whitespace-pre-wrap leading-relaxed">
            {{ state.message }}
          </p>
        </div>

        <div class="flex gap-3 p-4 md:p-6 pt-0 bg-slate-50 border-t border-slate-100">
          <button
            v-if="state.type === 'confirm'"
            @click="close(false)"
            class="flex-1 py-3 px-4 rounded-xl font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            キャンセル
          </button>
          <button
            @click="close(true)"
            class="flex-1 py-3 px-4 rounded-xl font-bold text-white transition-colors"
            :class="
              state.type === 'confirm'
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-blue-500 hover:bg-blue-600'
            "
          >
            OK
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useDialog } from "~/composables/useDialog";

const { state, close } = useDialog();

const onOpenChange = (isOpen: boolean) => {
  if (!isOpen && state.value.isOpen) {
    if (state.value.type === "confirm") {
      close(false);
    } else {
      close(true);
    }
  }
};
</script>
