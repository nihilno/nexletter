"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function Navbar() {
  const supabase = createClient();
  const { replace } = useRouter();

  function Logout() {
    supabase.auth.signOut();
    replace("/auth");
  }

  return (
    <header>
      <nav>
        <Button onClick={Logout}>Logout</Button>
      </nav>
    </header>
  );
}

export default Navbar;
