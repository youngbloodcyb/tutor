import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function EvaluationDialog({ evaluation }: { evaluation: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>See evaluation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Your AI Tutor Evaluation</DialogTitle>
          <DialogDescription>
            Detailed feedback on your learning progress
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="text-sm whitespace-pre-wrap">{evaluation}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
