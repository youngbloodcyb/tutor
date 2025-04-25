import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface QuizSection {
  score: number;
  section: string;
}

export function QuizResults({ sections }: { sections: QuizSection[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>See Results</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Quiz Results</DialogTitle>
          <DialogDescription>Your performance by section</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{section.section}</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(section.score * 100)}%
                </span>
              </div>
              <Progress value={section.score * 100} className="h-2" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
