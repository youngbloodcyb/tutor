"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useBlockStore } from "@/lib/stores/block-store";
import { BlockMenu } from "@/components/admin/block-menu";
import { ConfigPanel } from "@/components/admin/config-panel";
import { TiptapBlock } from "@/components/admin/tiptap-block";
import { QuizBlock } from "@/components/admin/quiz-block";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BlockEditor() {
  const { blocks, addBlock, moveBlock, removeBlock, selectedBlockId } =
    useBlockStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    moveBlock(result.source.index, result.destination.index);
  };

  const renderBlock = (block: any, index: number) => {
    const isSelected = selectedBlockId === block.id;

    switch (block.type) {
      case "tiptap":
        return (
          <TiptapBlock key={block.id} block={block} isSelected={isSelected} />
        );
      case "quiz":
        return (
          <QuizBlock key={block.id} block={block} isSelected={isSelected} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 relative">
      <div className="w-full bg-background border p-4 min-h-[500px] border-dashed border-black rounded-none">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 border-2 p-6 text-center">
            <p className="text-muted-foreground mb-4">No blocks added yet</p>
            <Button
              variant="noShadow"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Your First Block
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="blocks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {blocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border rounded-lg p-4 ${
                            selectedBlockId === block.id
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          {renderBlock(block, index)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {selectedBlockId && <ConfigPanel />}
      {isMenuOpen && <BlockMenu onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
}
