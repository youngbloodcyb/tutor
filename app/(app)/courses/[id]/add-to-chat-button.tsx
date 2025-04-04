"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function AddToChatButton() {
  return (
    <Button size="sm">
      <Sparkles className="h-4 w-4" />
    </Button>
  );
}
