"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface QuizOption {
  text: string;
  correct: boolean;
  selected: boolean;
}

interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

interface QuizData {
  id: string;
  type: string;
  title: string;
  questions: QuizQuestion[];
}

export function Quiz({ quizData }: { quizData: QuizData }) {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<
    { correct: boolean; correctAnswer: string }[]
  >([]);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    const newResults = quizData.questions.map((question, qIndex) => {
      const selectedOptionIndex = selectedAnswers[qIndex];
      const isCorrect =
        selectedOptionIndex !== undefined &&
        question.options[selectedOptionIndex].correct;

      const correctOptionIndex = question.options.findIndex(
        (option) => option.correct
      );
      const correctAnswer = question.options[correctOptionIndex].text;

      return {
        correct: isCorrect,
        correctAnswer,
      };
    });

    setResults(newResults);
    setSubmitted(true);
  };

  return (
    <Card className="min-w-[500px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">{quizData.title}</CardTitle>
        <Button
          variant="noShadow"
          size="sm"
          onClick={() => {
            setSelectedAnswers({});
            setSubmitted(false);
            setResults([]);
          }}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Restart Quiz</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex} className="space-y-4">
            <h3 className="text-lg font-medium">{question.text}</h3>
            <RadioGroup
              value={selectedAnswers[qIndex]?.toString()}
              onValueChange={(value) =>
                handleOptionSelect(qIndex, Number.parseInt(value))
              }
              className="space-y-3"
              disabled={submitted}
            >
              {question.options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className={`flex items-center space-x-2 rounded-md border-2 border-black p-3 ${
                    submitted && selectedAnswers[qIndex] === oIndex
                      ? option.correct
                        ? "border-green-500 bg-green-200"
                        : "border-red-500 bg-red-200"
                      : submitted && option.correct
                      ? "border-green-500 bg-green-200"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value={oIndex.toString()}
                    id={`q${qIndex}-o${oIndex}`}
                  />
                  <Label
                    htmlFor={`q${qIndex}-o${oIndex}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    {option.text}
                  </Label>
                  {submitted && option.correct && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {submitted &&
                    selectedAnswers[qIndex] === oIndex &&
                    !option.correct && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                </div>
              ))}
            </RadioGroup>
            {submitted && results[qIndex] && (
              <div
                className={`p-3 rounded-md ${
                  results[qIndex].correct
                    ? "bg-green-200 text-green-700 dark:text-green-400"
                    : "bg-red-200 text-red-700 dark:text-red-400"
                }`}
              >
                {results[qIndex].correct
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${results[qIndex].correctAnswer}`}
              </div>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={
            submitted ||
            Object.keys(selectedAnswers).length !== quizData.questions.length
          }
          className="w-full"
        >
          {submitted ? "Submitted" : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
