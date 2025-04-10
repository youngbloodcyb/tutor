"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { evaluatePerformance } from "@/lib/data/progress";
import { toast } from "@/lib/hooks/use-toast";

export function Evaluate() {
  const { execute, isExecuting } = useAction(evaluatePerformance, {
    onSuccess: () => {
      toast({
        title: "Performance evaluated",
      });
    },
    onError: () => {
      toast({
        title: "Failed to evaluate performance",
      });
    },
  });
  return (
    <Button
      className="inline-flex items-center gap-2"
      onClick={() => execute()}
      disabled={isExecuting}
    >
      Evaluate performance
      <Sparkles className="h-4 w-4" />
    </Button>
  );
}
