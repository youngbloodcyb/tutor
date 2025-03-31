import { tool as createTool } from "ai"
import { z } from "zod"

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return { weather: "Sunny", temperature: 75, location }
  },
})

export const fractionTool = createTool({
  description: "Display, or explain the fraction for a number",
  parameters: z.object({
    numerator: z.number().describe("The numerator of the fraction"),
    denominator: z.number().describe("The denominator of the fraction"),
  }),
  execute: async function ({ numerator, denominator }) {
    console.log("numerator", numerator)
    console.log("denominator", denominator)
    return { initialNumerator: numerator, initialDenominator: denominator }
  },
})

export const tools = {
  displayWeather: weatherTool,
  displayFraction: fractionTool,
}
