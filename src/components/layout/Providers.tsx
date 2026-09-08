"use client";

import { ThemeProvider } from "next-themes";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
