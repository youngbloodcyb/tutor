import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { tools } from "@/lib/ai/tools";

export async function POST(request: Request) {
  const { messages, combinedInput } = await request.json();

  const messageArray = [...messages];
  if (combinedInput) {
    messageArray.push({ role: "user", content: combinedInput });
  }

  const result = streamText({
    model: openai("gpt-4o"),
    system: "You are a friendly assistant!",
    messages: messageArray,
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse();
}
