"use client";

import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Block {
  id: string;
  type: string;
  [key: string]: any;
}

interface BlockStore {
  blocks: Block[];
  selectedBlockId: string | null;
  addBlock: (type: string) => void;
  updateBlock: (id: string, data: any) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  removeBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
}

export const useBlockStore = create<BlockStore>((set) => ({
  blocks: [],
  selectedBlockId: null,

  addBlock: (type) =>
    set((state) => {
      const newBlock: Block = {
        id: uuidv4(),
        type,
      };

      // Add default content based on block type
      if (type === "tiptap") {
        newBlock.content = "<p>Start typing here...</p>";
        newBlock.title = "Text Block";
        newBlock.showToolbar = true;
        newBlock.maxHeight = 300;
      } else if (type === "quiz") {
        newBlock.title = "Quiz";
        newBlock.questions = [
          {
            text: "Question 1",
            options: [
              { text: "Option 1", selected: false, correct: true },
              { text: "Option 2", selected: false, correct: false },
              { text: "Option 3", selected: false, correct: false },
              { text: "Option 4", selected: false, correct: false },
            ],
          },
        ];
      }

      return {
        blocks: [...state.blocks, newBlock],
        selectedBlockId: newBlock.id,
      };
    }),

  updateBlock: (id, data) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, ...data } : block
      ),
    })),

  moveBlock: (fromIndex, toIndex) =>
    set((state) => {
      const newBlocks = [...state.blocks];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return { blocks: newBlocks };
    }),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== id),
      selectedBlockId:
        state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  selectBlock: (id) => set({ selectedBlockId: id }),
}));
