"use client";

import { Button } from "@/components/ui/button";
import { completeCourse } from "@/lib/data/progress";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/lib/hooks/use-toast";
import { CircleCheck } from "lucide-react";

export function CompleteForm({
  completed,
  courseId,
}: {
  completed: boolean;
  courseId: string;
}) {
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
      {completed ? (
        <Button disabled className="inline-flex items-center gap-2">
          <CircleCheck className="w-4 h-4" />
          Course Completed
        </Button>
      ) : (
        <Button onClick={() => execute({ courseId })} disabled={isExecuting}>
          Complete Course
        </Button>
      )}
    </div>
  );
}
