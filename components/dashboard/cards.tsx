import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Actions from "./actions";
import Preferences from "./preferences";
import { Empty } from "./skeletons";

export default async function Cards() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: preferences, error } = await supabase
    .from("user_preferences")
    .select("*")
    .maybeSingle();

  if (error || !preferences) {
    return <Empty />;
  }

  return (
    <section className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-y-4 sm:gap-x-8 md:grid-cols-2 md:gap-x-16">
      <Preferences preferences={preferences} />
      <Actions isActive={preferences.is_active} />
    </section>
  );
}
