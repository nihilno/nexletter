import { OpenRouter } from "@openrouter/sdk";

export const openRouter = new OpenRouter({
  apiKey: process.env.AI_API_KEY!,
});
