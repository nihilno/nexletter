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
    <header className="border-primary border-b border-dashed">
      <nav className="flex h-22.5 items-center justify-between px-4">
        <Button onClick={handleSignOut} size={"sm"}>
          Logout
        </Button>{" "}
      </nav>
    </header>
  );
}

export default Navbar;
