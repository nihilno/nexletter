"use client";

import { createContext, useContext, useState } from "react";

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined,
);

function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("weekly");

  function handleCategoryChange(id: string) {
    setSelectedCategory((prev: string[]) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }
  return (
    <PreferencesContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedFrequency,
        setSelectedFrequency,
        handleCategoryChange,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside <PreferencesProvider>");
  }
  return context;
}

export { PreferencesProvider, usePreferences };
