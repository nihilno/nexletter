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
    <header>
      <nav>
        <Button onClick={handleSignOut}>Logout</Button>{" "}
        <div className="text-white">{user?.email}</div>
      </nav>
    </header>
  );
}

export default Navbar;
