"use client";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { PreferencesProvider } from "@/contexts/preferences-context";
import { LenisProvider } from "@/lib/lenis";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        defaultTheme="dark"
        forcedTheme="dark"
      >
        <AuthProvider>
          <PreferencesProvider>
            <LenisProvider>{children}</LenisProvider>
          </PreferencesProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default Providers;
