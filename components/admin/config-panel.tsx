"use client";

import { useBlockStore } from "@/lib/stores/block-store";
import { Button } from "@/components/ui/button";
import { TiptapConfig } from "@/components/admin/tiptap-config";
import { QuizConfig } from "@/components/admin/quiz-config";
import { Trash2, X } from "lucide-react";

export function ConfigPanel() {
  const blocks = useBlockStore((state) => state.blocks);
  const selectedBlockId = useBlockStore((state) => state.selectedBlockId);
  const selectBlock = useBlockStore((state) => state.selectBlock);
  const removeBlock = useBlockStore((state) => state.removeBlock);
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
    <div className="w-full bg-muted rounded-none animate-in slide-in-from-right col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">
          {selectedBlock.type === "tiptap"
            ? "Text Editor Settings"
            : "Quiz Settings"}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="noShadow"
            size="icon"
            onClick={() => removeBlock(selectedBlockId || "")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="noShadow"
            size="icon"
            onClick={() => selectBlock(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {renderConfig()}
    </div>
  );
}
