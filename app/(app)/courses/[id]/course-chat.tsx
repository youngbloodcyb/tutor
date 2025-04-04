"use client";

import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface CourseChatProps {
  courseId: string;
}

export function CourseChat({ courseId }: CourseChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: `course-${courseId}`, // Unique chat identifier for this course
  });

  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      <div className="flex flex-col gap-4 w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg p-4 max-w-[26rem] ${
                message.role === "user" ? "bg-white" : "bg-gray-100"
              }`}
            >
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 w-full p-4"
      >
        <div className="flex gap-2 w-full">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about this course..."
            className="shadow-shadow"
          />
          <Button type="submit" size="icon" className="px-4">
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
}
