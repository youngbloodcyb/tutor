"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteGoal } from "@/lib/data/goal";
import { useToast } from "@/lib/hooks/use-toast";
import { parseActionError } from "@/lib/data/safe";

export function DeleteGoal({ goalId }: { goalId: string }) {
  const { toast } = useToast();

  const { execute, isExecuting } = useAction(deleteGoal, {
    onSuccess() {
      toast({
        title: "Success",
        description: "Goal deleted successfully",
      });
    },
    onError({ error }) {
      toast({
        title: "Error",
        description: parseActionError(error),
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            goal.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => execute({ goalId })}
            disabled={isExecuting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
