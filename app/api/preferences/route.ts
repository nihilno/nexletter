import { inngest } from "@/lib/inngest/client";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "You must be logged in to save preferences.",
      },
      { status: 401 },
    );
  }

  const { categories, frequency, email } = await request.json();

  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return NextResponse.json(
      {
        error: "Categories array i required and must not be empty.",
      },
      { status: 400 },
    );
  }

  if (!frequency || !["daily", "weekly", "biweekly"].includes(frequency)) {
    return NextResponse.json(
      {
        error: "Valid frequency is required (daily, weekly, biweekly).",
      },
      { status: 400 },
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      {
        error: "Valid email address is required.",
      },
      { status: 400 },
    );
  }

  const { error: upsertError } = await supabase
    .from("user_preferences")
    .upsert(
      { user_id: user.id, categories, frequency, email },
      { onConflict: "user_id" },
    );

  if (upsertError) {
    console.error("Failed to save user preferences:", upsertError.message);
    return NextResponse.json(
      {
        error: "Failed to save preferences.",
      },
      { status: 500 },
    );
  }

  await inngest.send({
    name: "newsletter.schedule",
    data: { categories, email, frequency },
  });

  return NextResponse.json({
    success: true,
    message: "Preferences saved and added to table.",
  });
}
