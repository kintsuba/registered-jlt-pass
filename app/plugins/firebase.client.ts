import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebase.apiKey,
    authDomain: config.public.firebase.authDomain,
    projectId: config.public.firebase.projectId,
    storageBucket: config.public.firebase.storageBucket,
    messagingSenderId: config.public.firebase.messagingSenderId,
    appId: config.public.firebase.appId,
  };

  // Only initialize if we have the config (to avoid errors in local dev without .env)
  let app;
  if (import.meta.dev) {
    // 開発環境ではダミーのConfigで初期化し、エミュレータを使用する
    const dummyConfig = {
      apiKey: firebaseConfig.apiKey || "demo-dummy-key",
      authDomain: firebaseConfig.authDomain || "demo-project.firebaseapp.com",
      projectId: firebaseConfig.projectId || "demo-project",
      storageBucket: firebaseConfig.storageBucket || "demo-project.appspot.com",
      messagingSenderId: firebaseConfig.messagingSenderId || "000000000000",
      appId: firebaseConfig.appId || "1:000000000000:web:0000000000000000000000",
    };
    app = !getApps().length ? initializeApp(dummyConfig) : getApp();
  } else if (firebaseConfig.apiKey) {
    // 本番環境
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  }

  const auth = app ? getAuth(app) : null;
  if (auth && import.meta.dev) {
    import("firebase/auth").then(({ connectAuthEmulator }) => {
      // Authエミュレータのデフォルトポート9099に接続
      try {
        connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      } catch (e) {
        // すでに接続済みの場合は無視
      }
    });
  }

  return {
    provide: {
      firebaseApp: app,
      auth,
    },
  };
});
