import {
  getAuth,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  type User,
} from "firebase/auth";

let listenerRegistered = false;

export const useAuth = () => {
  const nuxtApp = useNuxtApp();
  const auth = nuxtApp.$auth as ReturnType<typeof getAuth> | null;

  const currentUser = useState<User | null>("auth-user", () => null);
  const isAuthReady = useState<boolean>("auth-ready", () => false);

  if (!listenerRegistered && auth && import.meta.client) {
    listenerRegistered = true;
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user;
      isAuthReady.value = true;
    });
  } else if (!auth) {
    isAuthReady.value = true;
  }

  const sendLoginLink = async (email: string) => {
    if (!auth) throw new Error("Firebase auth not initialized.");

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain must be whitelisted in the Firebase Console.
      url: window.location.origin + "/login?finishSignIn=true",
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Save email locally so we don't have to ask the user again when they click the link
    window.localStorage.setItem("emailForSignIn", email);
  };

  const finishLoginWithLink = async (url: string) => {
    if (!auth) throw new Error("Firebase auth not initialized.");

    if (isSignInWithEmailLink(auth, url)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. Prompt for email.
        email = window.prompt("確認のため、ログインに使用したメールアドレスを入力してください。");
      }

      if (email) {
        const result = await signInWithEmailLink(auth, email, url);
        window.localStorage.removeItem("emailForSignIn");
        return result.user;
      }
    }
    throw new Error("Invalid or missing email link.");
  };

  const logout = async () => {
    if (!auth) throw new Error("Firebase auth not initialized.");
    await signOut(auth);
  };

  return {
    currentUser,
    isAuthReady,
    sendLoginLink,
    finishLoginWithLink,
    logout,
  };
};
