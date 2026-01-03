import { sendEmail } from "@/lib/apis/email";
import { fetchArticles } from "@/lib/apis/news";
import { inngest } from "@/lib/inngest/client";
import { openRouter } from "@/lib/open-router";
import { createClient } from "@supabase/supabase-js";
import { marked } from "marked";

export default inngest.createFunction(
  {
    id: "newsletter/scheduled",
    cancelOn: [
      {
        event: "newsletter.schedule.deleted",
        if: "async.data.user_id == event.data.user_id",
      },
    ],
  },
  { event: "newsletter.schedule" },

  // preparing categories based on user choices
  async ({ event, step }) => {
    const isActive = await step.run("check-status", async () => {
      // const supabase = await createClient();
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );
      const { data, error } = await supabase
        .from("user_preferences")
        .select("is_active")
        .eq("user_id", event.data.user_id)
        .single();

      if (error) {
        console.error(error);
        return false;
      }

      return data.is_active || false;
    });

    if (!isActive) {
      return {};
    }

    const categories = event.data.categories;
    const allArticles = await step.run("fetch-news", async () => {
      return fetchArticles(categories);
    });

    // summaring articles with ai
    const summary = await step.run("summarize-news", async () => {
      return openRouter.chat.send({
        model: "xiaomi/mimo-v2-flash:free",
        messages: [
          {
            role: "system",
            content: `You are an expert newsletter editor creating a personalized newsletter.
              Write a concise, engaging summary that:
              - Highlights the most important stories
              - Provides context and insights
              - Uses a friendly, conversational tone
              - Is well-structured with clear sections
              - Keeps the reader informed and engaged
              Format the response as a proper newsletter with a title and organized content.
              Make it email-friendly with clear sections and engaging subject lines.
              Dont use any placeholder names, just use some generic greeting.`,
          },
          {
            role: "user",
            content: `Create a newsletter summary for these articles from the past week.
              Categories requested: ${event.data.categories.join(", ")}

              Articles:
              ${allArticles
                .map(
                  (article: any, index: number) =>
                    `${index + 1}. ${article.title}\n   ${
                      article.description
                    }\n   Source: ${article.url}\n`,
                )
                .join("\n")}`,
          },
        ],
      });
    });

    const newsletterContent = summary.choices[0].message.content as string;
    if (!newsletterContent) {
      throw new Error("Failed to generate newsletter content.");
    }

    // md --> html
    const htmlResult = await marked(newsletterContent);

    // sending an initial email
    await step.run("send-email", async () => {
      await sendEmail(
        event.data.email,
        event.data.categories.join(", "),
        allArticles.length,
        htmlResult,
      );
    });

    // schedule the next email based on user frequency setting
    await step.run("schedule-email", async () => {
      const now = new Date();
      let nextScheduleTime: Date;

      switch (event.data.frequency) {
        case "daily":
          nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          break;

        case "weekly":
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          break;

        case "biweekly":
          nextScheduleTime = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
          break;

        default:
          nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      }

      nextScheduleTime.setHours(9, 0, 0, 0);

      await inngest.send({
        name: "newsletter.schedule",
        data: {
          user_id: event.data.user_id,
          categories,
          email: event.data.email,
          frequency: event.data.frequency,
        },
        ts: nextScheduleTime.getTime(),
      });
    });

    return {
      newsletter: htmlResult,
      articleCount: allArticles.length,
      nextScheduled: true,
    };
  },
);
