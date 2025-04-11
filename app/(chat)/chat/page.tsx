"use client";

import { useChat } from "@ai-sdk/react";
import { Weather } from "@/components/ai/weather";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { FractionVisualizer } from "@/components/ai/fraction";
import { LineVisualizer } from "@/components/ai/line";
import { DecimalVisualizer } from "@/components/ai/decimal";
import { IntegerVisualizer } from "@/components/ai/integer";
import { PythagoreanVisualizer } from "@/components/ai/pythagorean";
import ReactMarkdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { ReferenceCard } from "@/components/ai/reference";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="p-20 w-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Chat</h1>
      <div className="flex flex-col gap-4 w-[600px]">
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

              <div className="space-y-4">
                {message.toolInvocations?.map((toolInvocation) => {
                  const { toolName, toolCallId, state } = toolInvocation;

                  switch (state) {
                    case "result": {
                      switch (toolName) {
                        case "displayWeather": {
                          const { result } = toolInvocation;
                          return (
                            <div key={toolCallId}>
                              <Weather {...result} />
                            </div>
                          );
                        }
                        case "displayFraction": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div key={toolCallId}>
                              <FractionVisualizer {...result} />
                            </div>
                          );
                        }
                        case "displayLine": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div key={toolCallId}>
                              <LineVisualizer {...result} />
                            </div>
                          );
                        }
                        case "displayDecimal": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div key={toolCallId}>
                              <DecimalVisualizer {...result} />
                            </div>
                          );
                        }
                        case "displayInteger": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div key={toolCallId}>
                              <IntegerVisualizer {...result} />
                            </div>
                          );
                        }
                        case "displayPythagorean": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div key={toolCallId}>
                              <PythagoreanVisualizer {...result} />
                            </div>
                          );
                        }
                        case "getInformation": {
                          const { result } = toolInvocation;
                          console.log("result", result);
                          return (
                            <div
                              key={toolCallId}
                              className="flex flex-col gap-2"
                            >
                              {result.map((item: any, index: number) => (
                                <ReferenceCard key={index} {...item} />
                              ))}
                            </div>
                          );
                        }
                        default:
                          return null;
                      }
                    }
                    default: {
                      switch (toolName) {
                        case "displayWeather":
                          return (
                            <div key={toolCallId}>
                              <div>Loading weather...</div>
                            </div>
                          );
                        default:
                          return null;
                      }
                    }
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-[600px] relative">
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
            placeholder="Type a message..."
            className="shadow-shadow resize-none min-h-[100px]"
            rows={4}
          />
          <Button type="submit" size="icon" className="px-4">
            <SendHorizonal />
          </Button>
        </div>
      </form>
    </div>
  );
}
