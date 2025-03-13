"use client";

import { useBlockStore } from "@/lib/stores/block-store";
import { Button } from "@/components/ui/button";
import { TiptapConfig } from "@/components/admin/tiptap-config";
import { QuizConfig } from "@/components/admin/quiz-config";
import { X } from "lucide-react";

export function ConfigPanel() {
  const blocks = useBlockStore((state) => state.blocks);
  const selectedBlockId = useBlockStore((state) => state.selectedBlockId);
  const selectBlock = useBlockStore((state) => state.selectBlock);
  const updateBlock = useBlockStore((state) => state.updateBlock);
  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  if (!selectedBlock) return null;

  const renderConfig = () => {
    switch (selectedBlock.type) {
      case "tiptap":
        return <TiptapConfig block={selectedBlock} />;
      case "quiz":
        return <QuizConfig block={selectedBlock} />;
      default:
        return <div>No configuration available</div>;
    }
  };

  return (
    <div className="w-full md:w-1/4 bg-muted p-4 rounded-lg border animate-in slide-in-from-right">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">
          {selectedBlock.type === "tiptap"
            ? "Text Editor Settings"
            : "Quiz Settings"}
        </h3>
        <Button
          variant="noShadow"
          size="icon"
          onClick={() => selectBlock(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {renderConfig()}
    </div>
  );
}
