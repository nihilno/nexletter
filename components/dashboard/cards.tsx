import { fetchPreferences } from "@/lib/actions";
import { toast } from "sonner";
import Actions from "./actions";
import Preferences from "./preferences";

async function Cards() {
  const data = await fetchPreferences();

  if (!data.success) {
    toast.error(data.message);
  }

  const preferences = data.preferences;

  return (
    <section className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-y-4 sm:gap-x-8 md:grid-cols-2 md:gap-x-16">
      <Preferences preferences={preferences} />
      <Actions isActive={preferences?.is_active} />
    </section>
  );
}

export default Cards;
