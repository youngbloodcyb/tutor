"use client"

import { useChat } from "@ai-sdk/react"
import { Weather } from "@/components/ai/weather"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendHorizonal } from "lucide-react"

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <main className="p-20 w-full flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Chat</h1>
      <p className="text-muted-foreground">Ask questions</p>
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div>{message.role === "user" ? "User: " : "AI: "}</div>
            <div>{message.content}</div>

            <div className="space-y-4 min-h-[300px]">
              {message.toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation

                if (state === "result") {
                  if (toolName === "displayWeather") {
                    const { result } = toolInvocation
                    return (
                      <div key={toolCallId}>
                        <Weather {...result} />
                      </div>
                    )
                  }
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === "displayWeather" ? (
                        <div>Loading weather...</div>
                      ) : null}
                    </div>
                  )
                }
              })}
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="shadow-shadow"
            />
            <Button type="submit" size="icon" className="px-4">
              <SendHorizonal />
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
