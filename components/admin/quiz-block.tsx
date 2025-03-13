"use client";

import { useBlockStore } from "@/lib/stores/block-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Grip } from "lucide-react";

interface QuizBlockProps {
  block: any;
  isSelected: boolean;
  onClick: () => void;
}

export function QuizBlock({ block, isSelected, onClick }: QuizBlockProps) {
  const { updateBlock } = useBlockStore();

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...block.questions];

    // Reset all selected options for this question
    updatedQuestions[questionIndex].options = updatedQuestions[
      questionIndex
    ].options.map((option: any, idx: number) => ({
      ...option,
      selected: idx === optionIndex,
    }));

    updateBlock(block.id, {
      ...block,
      questions: updatedQuestions,
    });
  };

  return (
    <div onClick={onClick} className="relative">
      <div className="flex items-center gap-1 mb-2 text-muted-foreground">
        <Grip className="h-4 w-4" />
        <span className="text-xs font-medium">Quiz Component</span>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium">{block.title || "Quiz"}</h3>

        {block.questions &&
          block.questions.map((question: any, qIndex: number) => (
            <div key={qIndex} className="space-y-3 border-b pb-4 last:border-0">
              <h4 className="font-medium">
                {question.text || `Question ${qIndex + 1}`}
              </h4>

              <RadioGroup
                value={
                  question.options
                    .findIndex((o: any) => o.selected)
                    ?.toString() || ""
                }
                onValueChange={(value) =>
                  handleOptionSelect(qIndex, Number.parseInt(value))
                }
              >
                {question.options.map((option: any, oIndex: number) => (
                  <div
                    key={oIndex}
                    className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value={oIndex.toString()}
                      id={`q${qIndex}-o${oIndex}`}
                    />
                    <Label
                      htmlFor={`q${qIndex}-o${oIndex}`}
                      className="cursor-pointer w-full"
                    >
                      {option.text || `Option ${oIndex + 1}`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}

        {(!block.questions || block.questions.length === 0) && (
          <div className="text-muted-foreground text-center p-4 border border-dashed rounded-md">
            Configure this quiz in the settings panel
          </div>
        )}
      </div>
    </div>
  );
}
