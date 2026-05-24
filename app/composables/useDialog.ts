import { ref } from "vue";

type DialogType = "alert" | "confirm";

interface DialogState {
  isOpen: boolean;
  type: DialogType;
  message: string;
  resolve: ((value: boolean) => void) | null;
}

const state = ref<DialogState>({
  isOpen: false,
  type: "alert",
  message: "",
  resolve: null,
});

export const useDialog = () => {
  const alert = (message: string): Promise<void> => {
    return new Promise((resolve) => {
      state.value = {
        isOpen: true,
        type: "alert",
        message,
        resolve: () => resolve(),
      };
    });
  };

  const confirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      state.value = {
        isOpen: true,
        type: "confirm",
        message,
        resolve,
      };
    });
  };

  const close = (result: boolean = false) => {
    if (state.value.resolve) {
      state.value.resolve(result);
    }
    state.value.isOpen = false;
    // Delay resetting other fields to allow exit animation to complete smoothly
    setTimeout(() => {
      if (!state.value.isOpen) {
        state.value.resolve = null;
      }
    }, 300);
  };

  return {
    state,
    alert,
    confirm,
    close,
  };
};
