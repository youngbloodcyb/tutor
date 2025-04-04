import { create } from "zustand";
import { useChat } from "@ai-sdk/react";

interface ChatStore {
  courseId: string | null;
  setCourseId: (id: string) => void;
  addToInput: (text: string) => void;
  chatHook: ReturnType<typeof useChat> | null;
  setChatHook: (hook: ReturnType<typeof useChat>) => void;
  pendingInputs: string[];
  addToPending: (text: string) => void;
  removePending: (index: number) => void;
  clearPending: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  courseId: null,
  chatHook: null,
  pendingInputs: [],
  setCourseId: (id) => set({ courseId: id }),
  addToInput: (text) => {
    set((state) => {
      if (state.chatHook) {
        const pending = state.pendingInputs.join("\n");
        const newInput = pending ? `${pending}\n${text}` : text;
        state.chatHook.setInput(newInput);
        state.pendingInputs = [];
      }
      return state;
    });
  },
  setChatHook: (hook) => set({ chatHook: hook }),
  addToPending: (text) =>
    set((state) => ({
      pendingInputs: [...state.pendingInputs, text],
    })),
  removePending: (index) =>
    set((state) => ({
      pendingInputs: state.pendingInputs.filter((_, i) => i !== index),
    })),
  clearPending: () => set({ pendingInputs: [] }),
}));
