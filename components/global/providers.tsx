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
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <AuthProvider>
          <PreferencesProvider>
            <LenisProvider />
            {children}
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
