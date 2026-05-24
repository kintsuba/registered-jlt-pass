<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="state.isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      @click="handleBackdropClick"
    >
      <Transition
        enter-active-class="transition-all duration-300 ease-out delay-75"
        enter-from-class="opacity-0 translate-y-8 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div
          v-if="state.isOpen"
          class="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
          @click.stop
        >
          <div class="p-6 md:p-8 text-center">
            <div
              v-if="state.type === 'confirm'"
              class="mx-auto w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-5"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <div
              v-else
              class="mx-auto w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-5"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>

            <p
              class="text-slate-700 font-bold text-base md:text-lg whitespace-pre-wrap leading-relaxed"
            >
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
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useDialog } from "~/composables/useDialog";

const { state, close } = useDialog();

const handleBackdropClick = () => {
  if (state.value.type === "confirm") {
    close(false);
  } else {
    close(true);
  }
};
</script>
