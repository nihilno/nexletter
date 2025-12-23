"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { navLinks } from "@/lib/consts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const { user, signOut } = useAuth();
  const { replace } = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
    replace("/auth");
  }

  if (!user) return null;

  return (
    <header className="border-primary bg-background/50 sticky top-0 z-50 border-b border-dashed px-4 backdrop-blur-3xl">
      <nav className="mx-auto flex h-22.5 max-w-5xl items-center justify-center gap-4">
        {navLinks.map(({ href, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(pathname === href && "text-primary")}
          >
            {icon}
          </Link>
        ))}

        <Button
          onClick={handleSignOut}
          size={"sm"}
          className="ml-auto transition-all duration-200 ease-in-out hover:translate-y-0.5"
        >
          Logout
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
