"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, signOut } = useAuth();
  const { replace } = useRouter();

  async function handleSignOut() {
    await signOut();
    replace("/auth");
  }

  if (!user) return null;

  return (
    <header className="bg-foreground">
      <nav className="flex items-center justify-between p-4">
        <Button onClick={handleSignOut}>Logout</Button>{" "}
        <div className="text-background">{user?.email}</div>
      </nav>
    </header>
  );
}

export default Navbar;
