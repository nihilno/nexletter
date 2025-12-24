import { Session, User } from "@supabase/supabase-js";

declare global {
  type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
  };

  type PreferencesContextType = {
    selectedCategory: string[];
    setSelectedCategory: Dispatch<SetStateAction<string[]>>;
    selectedFrequency: string;
    setSelectedFrequency: Dispatch<SetStateAction<string>>;
    handleCategoryChange: (id: string) => void;
  };

  type TitleProps = {
    children: React.ReactNode;
    subtitle: string;
  };

  type UserPreferences = {
    categories: string[];
    frequency: string;
    email: string;
    is_active: boolean;
    created_at: string;
  };
}
