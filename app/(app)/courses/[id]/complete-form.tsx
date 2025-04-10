"use client";

import { Button } from "@/components/ui/button";
import { completeCourse } from "@/lib/data/progress";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/lib/hooks/use-toast";

export function CompleteForm() {
  const { execute, isExecuting } = useAction(completeCourse, {
    onSuccess: () => {
      toast({
        title: "Course completed",
      });
    },
    onError: () => {
      toast({
        title: "Failed to complete course",
      });
    },
  });

  return (
    <div className="w-full flex justify-end p-4">
      <Button onClick={() => execute({ courseId: "1" })} disabled={isExecuting}>
        Complete Course
      </Button>
    </div>
  );
}
