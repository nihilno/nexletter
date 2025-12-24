"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePreferences } from "@/contexts/preferences-context";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import CategoriesCard from "./categories-card";
import FrequencyCard from "./frequency-card";
import Summary from "./summary";

function SelectForm() {
  const { selectedCategory, selectedFrequency } = usePreferences();
  const { user } = useAuth();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSavePreferences(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (selectedCategory.length === 0) {
      toast.warning("Please select at least one category.");
      return;
    }

    if (!user) {
      toast.warning("Please sign in to continue.");
      return;
    }

    try {
      const response = await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categories: selectedCategory,
          frequency: selectedFrequency,
          email: user.email,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to save preferences.");
        return;
      }

      toast.success("Success!", {
        description: "Your newsletter preferences have been saved.",
      });
      push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="grid grid-cols-1 items-stretch gap-8 md:mt-16 md:grid-cols-2"
      onSubmit={handleSavePreferences}
    >
      <div>
        <CategoriesCard />
      </div>
      <div className="flex flex-col gap-8">
        <FrequencyCard />
        <Summary isLoading={isLoading} />
      </div>
    </form>
  );
}

export default SelectForm;
