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

export const lineTool = createTool({
  description:
    "Visualize a linear equation by providing slope and y-intercept values",
  parameters: z.object({
    slope: z
      .number()
      .describe("The slope (m) of the line, representing rise over run"),
    yIntercept: z
      .number()
      .describe("The y-intercept (b) where the line crosses the y-axis"),
  }),
  execute: async function ({ slope, yIntercept }) {
    return {
      initialSlope: slope,
      initialYIntercept: yIntercept,
    };
  },
});

export const decimalTool = createTool({
  description: "Display a decimal number",
  parameters: z.object({
    decimal: z.number().describe("The decimal number to display"),
  }),
  execute: async function ({ decimal }) {
    return { initialDecimal: decimal };
  },
});

export const integerTool = createTool({
  description: "Display an integer number",
  parameters: z.object({
    integer: z.number().describe("The integer number to display"),
  }),
  execute: async function ({ integer }) {
    return { initialInteger: integer };
  },
});

export const pythagoreanTool = createTool({
  description: "Display the Pythagorean theorem",
  parameters: z.object({
    a: z.number().describe("The length of one leg of the triangle"),
    b: z.number().describe("The length of the other leg of the triangle"),
  }),
  execute: async function ({ a, b }) {
    return { initialA: a, initialB: b };
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayFraction: fractionTool,
  getInformation: getInformationTool,
  displayLine: lineTool,
  displayDecimal: decimalTool,
  displayInteger: integerTool,
  displayPythagorean: pythagoreanTool,
};
