"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={className ?? "grid h-10 w-10 place-items-center rounded-full border border-line bg-elevated/60 text-fg transition-colors hover:border-line-strong"}
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="grid place-items-center"
      >
        {mounted ? dark ? <Sun size={18} /> : <Moon size={18} /> : <span className="h-[18px] w-[18px]" />}
      </motion.span>
    </button>
  );
}
