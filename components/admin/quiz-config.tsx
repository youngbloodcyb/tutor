"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Check, X } from "lucide-react";
import { useBlockStore } from "@/lib/stores/block-store";

interface QuizConfigProps {
  block: any;
}

export function QuizConfig({ block }: QuizConfigProps) {
  const updateBlock = useBlockStore((state) => state.updateBlock);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const handleTitleChange = (value: string) => {
    updateBlock(block.id, {
      ...block,
      title: value,
    });
  };

  const addQuestion = () => {
    const questions = block.questions || [];
    const newQuestion = {
      text: `Question ${questions.length + 1}`,
      options: [
        { text: "Option 1", selected: false, correct: true },
        { text: "Option 2", selected: false, correct: false },
        { text: "Option 3", selected: false, correct: false },
        { text: "Option 4", selected: false, correct: false },
      ],
    };

    updateBlock(block.id, {
      ...block,
      questions: [...questions, newQuestion],
    });

    // Expand the newly added question
    setExpandedQuestion(questions.length);
  };

  const removeQuestion = (index: number) => {
    const questions = [...(block.questions || [])];
    questions.splice(index, 1);

    updateBlock(block.id, {
      ...block,
      questions,
    });

    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    }
  };

  const updateQuestion = (index: number, key: string, value: any) => {
    const questions = [...(block.questions || [])];
    questions[index] = {
      ...questions[index],
      [key]: value,
    };

    updateBlock(block.id, {
      ...block,
      questions,
    });
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    key: string,
    value: any
  ) => {
    const questions = [...(block.questions || [])];
    const options = [...questions[questionIndex].options];

    options[optionIndex] = {
      ...options[optionIndex],
      [key]: value,
    };

    // If marking this option as correct, make sure others are not correct
    if (key === "correct" && value === true) {
      options.forEach((option, idx) => {
        if (idx !== optionIndex) {
          options[idx] = { ...option, correct: false };
        }
      });
    }

    questions[questionIndex] = {
      ...questions[questionIndex],
      options,
    };

    updateBlock(block.id, {
      ...block,
      questions,
    });
  };

  const addOption = (questionIndex: number) => {
    const questions = [...(block.questions || [])];
    const options = [...questions[questionIndex].options];

    options.push({
      text: `Option ${options.length + 1}`,
      selected: false,
      correct: false,
    });

    questions[questionIndex] = {
      ...questions[questionIndex],
      options,
    };

    updateBlock(block.id, {
      ...block,
      questions,
    });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const questions = [...(block.questions || [])];
    const options = [...questions[questionIndex].options];

    // Don't remove if it's the last option or if it's marked as correct
    if (options.length <= 1 || options[optionIndex].correct) {
      return;
    }

    options.splice(optionIndex, 1);

    questions[questionIndex] = {
      ...questions[questionIndex],
      options,
    };

    updateBlock(block.id, {
      ...block,
      questions,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="quizTitle">Quiz Title</Label>
        <Input
          id="quizTitle"
          value={block.title || ""}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Enter quiz title"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Questions</Label>
          <Button
            variant="noShadow"
            size="sm"
            onClick={addQuestion}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-3 w-3" />
            Add
          </Button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {block.questions &&
            block.questions.map((question: any, qIndex: number) => (
              <div key={qIndex} className="border rounded-md p-2">
                <div className="flex justify-between items-center">
                  <Button
                    variant="noShadow"
                    size="sm"
                    className="text-left justify-start font-normal w-full overflow-hidden"
                    onClick={() =>
                      setExpandedQuestion(
                        expandedQuestion === qIndex ? null : qIndex
                      )
                    }
                  >
                    <span className="truncate">
                      {question.text || `Question ${qIndex + 1}`}
                    </span>
                  </Button>
                  <Button
                    variant="noShadow"
                    size="icon"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                {expandedQuestion === qIndex && (
                  <div className="mt-2 space-y-3 pt-2 border-t">
                    <div className="space-y-1">
                      <Label htmlFor={`q${qIndex}-text`} className="text-xs">
                        Question Text
                      </Label>
                      <Textarea
                        id={`q${qIndex}-text`}
                        value={question.text || ""}
                        onChange={(e) =>
                          updateQuestion(qIndex, "text", e.target.value)
                        }
                        placeholder="Enter question text"
                        className="min-h-[60px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs">Options</Label>
                        <Button
                          variant="noShadow"
                          size="sm"
                          onClick={() => addOption(qIndex)}
                          className="h-6 text-xs"
                        >
                          Add Option
                        </Button>
                      </div>

                      {question.options.map((option: any, oIndex: number) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <Button
                            variant={option.correct ? "default" : "noShadow"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              updateOption(
                                qIndex,
                                oIndex,
                                "correct",
                                !option.correct
                              )
                            }
                          >
                            {option.correct ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <span className="text-xs">{oIndex + 1}</span>
                            )}
                          </Button>
                          <Input
                            value={option.text || ""}
                            onChange={(e) =>
                              updateOption(
                                qIndex,
                                oIndex,
                                "text",
                                e.target.value
                              )
                            }
                            className="h-8 text-sm"
                          />
                          <Button
                            variant="noShadow"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeOption(qIndex, oIndex)}
                            disabled={
                              question.options.length <= 1 || option.correct
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

          {(!block.questions || block.questions.length === 0) && (
            <div className="text-center p-4 border border-dashed rounded-md text-muted-foreground">
              No questions added yet. Click "Add" to create your first question.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
