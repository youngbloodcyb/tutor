"use client"

import { useChat } from "@ai-sdk/react"
import { Weather } from "@/components/ai/weather"

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.role === "user" ? "User: " : "AI: "}</div>
          <div>{message.content}</div>

          <div>
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
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
