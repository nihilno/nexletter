import { inngest } from "@/lib/inngest/client";
import { fetchArticles } from "@/lib/news/news";

export default inngest.createFunction(
  { id: "newsletter/scheduled" },
  { event: "newsletter.schedule" },
  async ({ event, step, runId }) => {
    const categories = ["technology", "business"];
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    // ai summary
    const summary = await step.ai.infer("summarize-news", {
      model: step.ai.models.openai({ model: "gpt-4o" }),
      body: {
        messages: [
          {
            role: "system",
            content: `Act as an expert newsletter editor and create a personalized newsletter for me. 
            Your goal is to produce a concise, engaging summary that: 
            - Highlights the most important stories
            - Provides context and insights
            - Uses a friendly, conversational tone
            - Is well‑structured with clear sections
            - Keeps me informed and engaged
            Format the response as a proper newsletter with a title and organized content. 
            Make it email‑friendly with clear sections and engaging subject lines.`,
          },
          {
            role: "user",
            content: `Create a newsletter summary for these articles from the past week.
            Categories requested: ${categories.join(",")}
            
            Articles: 
            ${allArticles.map((article: any, index: number) => `${index + 1}. ${article.title}\n ${article.description}\n Source: ${article.url}\n`).join("\n")}`,
          },
        ],
      },
    });

    console.log(summary.choices[0].message.content);
  },
);
