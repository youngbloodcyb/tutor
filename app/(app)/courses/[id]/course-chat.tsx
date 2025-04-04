"use client";

import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChatStore } from "@/lib/stores/chat-store";
import { useChat } from "@ai-sdk/react";
import { Textarea } from "@/components/ui/textarea";

interface CourseChatProps {
  courseId: string;
}

export function CourseChat({ courseId }: CourseChatProps) {
  const { setChatHook } = useChatStore();
  const chat = useChat({
    id: `course-${courseId}`,
    initialMessages: [],
  });

  const memoizedSetChatHook = useCallback(() => {
    setChatHook(chat);
  }, [courseId, chat.id]);

  useEffect(() => {
    memoizedSetChatHook();
  }, [memoizedSetChatHook]);

  useEffect(() => {
    const saved = localStorage.getItem(`chat-${courseId}`);
    if (saved) {
      const savedMessages = JSON.parse(saved);
      chat.setMessages(savedMessages);
    }
  }, [courseId]);

  const { messages, input, handleInputChange, handleSubmit } = chat;

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
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
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
