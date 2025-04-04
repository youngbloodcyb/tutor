"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useChatStore } from "@/lib/stores/chat-store";

interface AddToChatButtonProps {
  content?: string;
}

export function AddToChatButton({
  content = "Help me understand this content",
}: AddToChatButtonProps) {
  const addToInput = useChatStore((state) => state.addToInput);

  const handleClick = () => {
    addToInput(content);
  };

  return (
    <Button size="sm" onClick={handleClick}>
      <Sparkles className="h-4 w-4" />
    </Button>
  );
}
