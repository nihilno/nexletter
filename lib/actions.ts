"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export async function changeStatus(is_active: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You need to be Signed In to perform this action.",
    };
  }

  try {
    const { error } = await supabase
      .from("user_preferences")
      .update({ is_active })
      .eq("user_id", user.id);

    if (error) {
      return {
        success: false,
        message: "We couldn’t save your changes. Try again in a moment.",
      };
    }

    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to update user_preferences.is_active:", error);
    return {
      success: false,
      message: "Something went wrong on our side. Try again shortly.",
    };
  }
}
