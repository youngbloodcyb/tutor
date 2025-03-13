"use client";

import { useBlockStore } from "@/lib/stores/block-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Type, ListChecks, X } from "lucide-react";

interface BlockMenuProps {
  onClose: () => void;
}

export function BlockMenu({ onClose }: BlockMenuProps) {
  const { addBlock } = useBlockStore();

  const handleAddBlock = (type: string) => {
    addBlock(type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Add a Block</CardTitle>
            <CardDescription>
              Choose a block type to add to your content
            </CardDescription>
          </div>
          <Button variant="noShadow" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
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
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="noShadow" onClick={onClose}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
