"use server";

import { createClient } from "./supabase/server";

export async function fetchPreferences(): Promise<{
  success: boolean;
  message?: string;
  preferences?: UserPreferences;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      success: false,
      message: "Please sign in first.",
    };

  try {
    const { data: preferences, error } = await supabase
      .from("user_preferences")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return {
        success: false,
        message: "Error fetching preferences.",
      };
    }

    return {
      success: true,
      preferences,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal error while fetching preferences.",
    };
  }
}
