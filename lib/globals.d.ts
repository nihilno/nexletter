import { Session, User } from "@supabase/supabase-js";

declare global {
  type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
  };
}
