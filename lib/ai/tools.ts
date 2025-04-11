import { tool as createTool } from "ai";
import { z } from "zod";
import { findRelevantContent } from "@/lib/ai/embedding";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: "Sunny", temperature: 75, location };
  },
});

export const fractionTool = createTool({
  description: "Display, or explain the fraction for a number",
  parameters: z.object({
    numerator: z.number().describe("The numerator of the fraction"),
    denominator: z.number().describe("The denominator of the fraction"),
  }),
  execute: async function ({ numerator, denominator }) {
    return { initialNumerator: numerator, initialDenominator: denominator };
  },
});

export const getInformationTool = createTool({
  description: `get information from your knowledge base to answer questions.`,
  parameters: z.object({
    question: z.string().describe("the users question"),
  }),
  execute: async ({ question }) => {
    const relevantContent = await findRelevantContent(question);
    return relevantContent;
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayFraction: fractionTool,
  getInformation: getInformationTool,
};
