"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Trophy } from "lucide-react";
import { quizData } from "./data";
import { saveQuizStatus } from "@/lib/data/quiz";
import { useAction } from "next-safe-action/hooks";
import { parseActionError } from "@/lib/data/safe";
import { useToast } from "@/lib/hooks/use-toast";

export function Quiz() {
  const { toast } = useToast();

  const { execute } = useAction(saveQuizStatus, {
    onSuccess() {
      toast({
        title: "Quiz score saved.",
      });
    },
    onError({ error }) {
      toast({
        title: "Error",
        description: parseActionError(error),
      });
    },
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const sections = quizData;
  const currentSectionData = sections[currentSection];
  const questions = currentSectionData?.questions || [];
  const question = questions[currentQuestion];
  const totalQuestions = sections.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );

  // Calculate overall progress
  let questionsSoFar = 0;
  for (let i = 0; i < currentSection; i++) {
    questionsSoFar += sections[i].questions.length;
  }
  questionsSoFar += currentQuestion + 1;
  const progress = (questionsSoFar / totalQuestions) * 100;

  const handleAnswerChange = (value: string) => {
    // Remove all spaces from the input value
    const sanitizedValue = value.replace(/\s/g, "");
    setUserAnswers({
      ...userAnswers,
      [`${currentSection}-${currentQuestion}`]: sanitizedValue,
    });
  };

  const isLastQuestion =
    currentSection === sections.length - 1 &&
    currentQuestion === sections[currentSection].questions.length - 1;

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      // Calculate final score first
      let correctAnswers = 0;

      sections.forEach((section, sectionIndex) => {
        section.questions.forEach((question, questionIndex) => {
          const userAnswer =
            userAnswers[`${sectionIndex}-${questionIndex}`] || "";
          if (
            userAnswer.trim().toLowerCase() ===
            question.answer.trim().toLowerCase()
          ) {
            correctAnswers++;
          }
        });
      });

      // Calculate section-by-section scores
      const sectionResults = sections.map((section) => {
        const sectionQuestions = section.questions.length;
        let sectionCorrect = 0;

        section.questions.forEach((question, questionIndex) => {
          const sectionIndex = sections.indexOf(section);
          const userAnswer =
            userAnswers[`${sectionIndex}-${questionIndex}`] || "";
          if (
            userAnswer.trim().toLowerCase() ===
            question.answer.trim().toLowerCase()
          ) {
            sectionCorrect++;
          }
        });

        return {
          section: section.title,
          score: sectionCorrect / sectionQuestions,
        };
      });

      // Set the score first
      setScore(correctAnswers);

      // Then save with the calculated score
      execute({ score: correctAnswers, results: sectionResults });

      setQuizCompleted(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentSection(0);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizCompleted(false);
    setScore(0);
  };

  const currentQuestionId = `${currentSection}-${currentQuestion}`;
  const userAnswer = userAnswers[currentQuestionId] || "";
  const isAnswered = !!userAnswer.trim();

  if (quizCompleted) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription className="text-lg">
            You scored {score} out of {totalQuestions}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Trophy className="h-24 w-24 text-yellow-500 mb-6" />
          <div className="text-center space-y-4">
            <p className="text-xl font-medium">
              Your Score: {Math.round((score / totalQuestions) * 100)}%
            </p>
            <p className="text-gray-600">
              {score === totalQuestions
                ? "Perfect score! Excellent work!"
                : score > totalQuestions * 0.7
                ? "Great job! You've mastered most of the concepts."
                : score > totalQuestions * 0.5
                ? "Good effort! Keep practicing to improve."
                : "Keep studying! You'll get better with practice."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={restartQuiz}>Restart Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Question {questionsSoFar} of {totalQuestions}
          </span>
          <span>{currentSectionData.title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Question {questionsSoFar}</CardTitle>
          <CardDescription className="text-base">
            {question.questionText}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">
                Your Answer: <span className="text-red-500">*</span>
              </label>
              <Input
                id="answer"
                value={userAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                required
              />
              {!isAnswered && (
                <p className="text-sm text-amber-600">
                  An answer is required before proceeding
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={goToPreviousQuestion}
            disabled={currentSection === 0 && currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={goToNextQuestion} disabled={!isAnswered}>
            {isLastQuestion ? "Finish Quiz" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
