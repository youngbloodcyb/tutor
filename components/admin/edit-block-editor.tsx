"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useBlockStore } from "@/lib/stores/block-store";
import { ConfigPanel } from "@/components/admin/config-panel";
import { TiptapBlock } from "@/components/admin/tiptap-block";
import { QuizBlock } from "@/components/admin/quiz-block";
import { Plus, PlusCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Type, ListChecks } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useToast } from "@/lib/hooks/use-toast";
import { createCourse } from "@/lib/data/course";

export function EditBlockEditor({
  name,
  id,
  defaultBlocks,
}: {
  name: string;
  id: string;
  defaultBlocks: any[];
}) {
  const { toast } = useToast();
  const { execute, isExecuting } = useAction(createCourse, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Course created successfully",
      });
    },
    onError({ error }) {
      toast({
        title: "Error",
        description: "An error occurred while creating the course",
      });
    },
  });

  const blocks = useBlockStore((state) => state.blocks);
  const addBlock = useBlockStore((state) => state.addBlock);
  const moveBlock = useBlockStore((state) => state.moveBlock);
  const removeBlock = useBlockStore((state) => state.removeBlock);
  const selectedBlockId = useBlockStore((state) => state.selectedBlockId);
  const courseName = useBlockStore((state) => state.courseName);
  const setCourseName = useBlockStore((state) => state.setCourseName);
  const getCourseInfo = useBlockStore((state) => state.getCourseInfo);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddBlock = (type: string) => {
    addBlock(type);
    setIsMenuOpen(false);
  };

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
    <div className="relative space-y-4">
      <div className="flex justify-between items-center gap-2">
        <Input
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-[300px]"
        />
        <div className="flex gap-2">
          <Button
            disabled={isExecuting}
            onClick={() => {
              const courseInfo = getCourseInfo();
              execute({
                name: courseInfo.courseName,
                id: courseInfo.courseId,
                blocks: courseInfo.blocks,
              });
            }}
            size="icon"
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsMenuOpen(true)}>
            Add Block
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="w-full bg-background border p-4 h-full border-dashed border-black rounded-none col-span-3">
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
                            className={`border-dashed border-[#88aaee] border-2 rounded-none p-4 ${
                              selectedBlockId === block.id
                                ? "ring-2 ring-green-500 border-none"
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
        {isMenuOpen && (
          <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add a Block</DialogTitle>
                <DialogDescription>
                  Choose a block type to add to your content
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Button
                  variant="default"
                  className="flex justify-start items-center gap-3 h-20 p-4"
                  onClick={() => handleAddBlock("tiptap")}
                >
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Type className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">WYSIWYG Editor</h3>
                    <p className="text-sm text-muted-foreground">
                      Rich text editor with formatting options
                    </p>
                  </div>
                </Button>

                <Button
                  variant="default"
                  className="flex justify-start items-center gap-3 h-20 p-4"
                  onClick={() => handleAddBlock("quiz")}
                >
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <ListChecks className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">Quiz Component</h3>
                    <p className="text-sm text-muted-foreground">
                      Create interactive quizzes with multiple choice questions
                    </p>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
