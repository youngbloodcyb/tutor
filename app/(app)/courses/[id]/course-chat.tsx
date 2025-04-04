"use client";

import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonal, X, Paperclip } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatStore } from "@/lib/stores/chat-store";
import { useChat } from "@ai-sdk/react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface CourseChatProps {
  courseId: string;
}

export function CourseChat({ courseId }: CourseChatProps) {
  const {
    setChatHook,
    pendingInputs,
    removePending,
    clearPending,
    setMessagesForCourse,
    messagesByCourse,
  } = useChatStore();

  // Initialize chat with stored messages
  const storedMessages = messagesByCourse[courseId] || [];
  console.log("Stored messages for course:", courseId, storedMessages);

  const chat = useChat({
    id: `course-${courseId}`,
    initialMessages: storedMessages,
  });

  // Set chat hook for global access
  const memoizedSetChatHook = useCallback(() => {
    setChatHook(chat);
  }, [courseId, chat.id, setChatHook]);

  useEffect(() => {
    memoizedSetChatHook();
  }, [memoizedSetChatHook]);

  // Update store when messages change, but debounce it
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessagesForCourse(courseId, chat.messages);
      console.log("Updated messages:", chat.messages);
    }, 100); // Small delay to prevent multiple rapid updates

    return () => clearTimeout(timeoutId);
  }, [chat.messages, courseId, setMessagesForCourse]);

  const { messages, input, handleInputChange, handleSubmit } = chat;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || pendingInputs.length > 0) {
      const combinedInput = [...pendingInputs, input.trim()]
        .filter((text) => text)
        .join("\n");

      console.log("combinedInput", combinedInput);

      handleSubmit(e, {
        body: { combinedInput },
      });
      clearPending();
    }
  };

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
        onSubmit={handleFormSubmit}
        className="absolute bottom-0 left-0 w-full p-4"
      >
        {pendingInputs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {pendingInputs.map((_, index) => (
              <Badge
                key={index}
                className="inline-flex items-center gap-2 py-2"
              >
                <Paperclip className="h-4 w-4" />#{index + 1}
                <button type="button" onClick={() => removePending(index)}>
                  <X className="h-4 w-4" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2 w-full">
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleFormSubmit(e);
              }
            }}
            placeholder="Ask a question about this course..."
            className="shadow-shadow resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" className="px-4">
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
}
