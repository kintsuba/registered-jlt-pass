<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "~/composables/useAuth";

const { sendLoginLink, finishLoginWithLink, currentUser, isAuthReady } = useAuth();
const router = useRouter();
const route = useRoute();

const email = ref("");
const isSending = ref(false);
const emailSent = ref(false);
const errorMsg = ref("");

const isFinishingSignIn = ref(false);

onMounted(async () => {
  if (route.query.finishSignIn) {
    isFinishingSignIn.value = true;
    try {
      await finishLoginWithLink(window.location.href);
      router.push("/settings");
    } catch (error: any) {
      errorMsg.value =
        "ログイン処理に失敗しました。リンクが無効になっているか、期限が切れています。";
      console.error(error);
    } finally {
      isFinishingSignIn.value = false;
    }
  }
});

const handleLogin = async () => {
  if (!email.value) return;

  isSending.value = true;
  errorMsg.value = "";

  try {
    await sendLoginLink(email.value);
    emailSent.value = true;
  } catch (error: any) {
    errorMsg.value = "メールの送信に失敗しました。時間をおいて再度お試しください。";
    console.error(error);
  } finally {
    isSending.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto py-10 px-4">
    <h1 class="text-2xl font-extrabold text-slate-800 mb-6 text-center">ログイン / 新規登録</h1>

    <div v-if="!isAuthReady || isFinishingSignIn" class="text-center py-10">
      <div class="animate-pulse flex flex-col items-center">
        <div
          class="w-8 h-8 border-4 border-sakura-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-slate-500 font-bold">認証処理中...</p>
      </div>
    </div>

    <div
      v-else-if="currentUser"
      class="text-center py-10 bg-slate-50 rounded-3xl border border-slate-100"
    >
      <div
        class="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
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
      <p class="text-lg font-bold text-slate-800 mb-2">ログイン済みです</p>
      <p class="text-sm text-slate-500 mb-6">{{ currentUser.email }}</p>
      <NuxtLink
        to="/settings"
        class="inline-block bg-sakura-500 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-sakura-600 transition-colors"
      >
        設定へ進む
      </NuxtLink>
    </div>

    <div
      v-else-if="emailSent"
      class="bg-blue-50 p-6 rounded-3xl text-center border border-blue-100"
    >
      <div
        class="w-16 h-16 bg-white text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
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
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-slate-800 mb-2">メールを送信しました</h2>
      <p class="text-slate-600 text-sm leading-relaxed mb-4">
        <strong>{{ email }}</strong> 宛にログイン用のリンクを記載したメールを送信しました。<br />
        メールボックスを開き、リンクをクリックしてログインを完了してください。
      </p>
      <button @click="emailSent = false" class="text-blue-600 text-sm font-bold hover:underline">
        メールアドレスを間違えた場合
      </button>
    </div>

    <div v-else class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
      <p class="text-slate-600 text-sm mb-6 leading-relaxed">
        パスワードは不要です。メールアドレスを入力すると、ログイン用のリンクをお送りします。
      </p>

      <div
        v-if="errorMsg"
        class="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-bold mb-6 flex items-start gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <span>{{ errorMsg }}</span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-bold text-slate-700 mb-1"
            >メールアドレス</label
          >
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="you@example.com"
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sakura-500 focus:ring-2 focus:ring-sakura-200 outline-none transition-all"
            :disabled="isSending"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-sakura-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm hover:bg-sakura-600 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          :disabled="isSending || !email"
        >
          <span
            v-if="isSending"
            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          <span>{{ isSending ? "送信中..." : "ログインリンクを送信" }}</span>
        </button>
      </form>
    </div>
  </div>
</template>
