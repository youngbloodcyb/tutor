import { create } from "zustand";
import { useChat } from "@ai-sdk/react";

interface ChatStore {
  courseId: string | null;
  setCourseId: (id: string) => void;
  addToInput: (text: string) => void;
  chatHook: ReturnType<typeof useChat> | null;
  setChatHook: (hook: ReturnType<typeof useChat>) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  courseId: null,
  chatHook: null,
  setCourseId: (id) => set({ courseId: id }),
  addToInput: (text) => {
    set((state) => {
      if (state.chatHook) {
        state.chatHook.setInput((prev) => prev + (prev ? "\n" : "") + text);
      }
      return state;
    });
  },
  setChatHook: (hook) => set({ chatHook: hook }),
}));
