"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePreferences } from "@/contexts/preferences-context";
import { FormEvent } from "react";
import { toast } from "sonner";
import CategoriesCard from "./categories-card";
import FrequencyCard from "./frequency-card";
import Summary from "./summary";

function SelectForm() {
  const { selectedCategory } = usePreferences();
  const { user } = useAuth();

  async function handleSavePreferences(e: FormEvent) {
    e.preventDefault();
    if (selectedCategory.length === 0) {
      toast.warning("Please select at least one category.");
      return;
    }

    if (!user) {
      toast.warning("Please sign in to continue.");
      return;
    }

    try {
    } catch (error) {}
  }

  return (
    <form className="grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2">
      <div>
        <CategoriesCard />
      </div>
      <div className="flex h-full! flex-col justify-between gap-8">
        <FrequencyCard />
        <Summary />
      </div>
    </form>
  );
}

export default SelectForm;
