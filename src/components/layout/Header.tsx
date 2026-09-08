"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Search, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { Magnetic } from "@/components/motion/Magnetic";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      >
        <div className={cn("mx-auto flex max-w-[96rem] items-center justify-between px-5 transition-[height] duration-500 sm:px-8", scrolled ? "h-16" : "h-20 sm:h-24")}>
          <Link href="/" className="group flex items-baseline gap-2" aria-label={`${site.name} home`}>
            <span className="font-display text-[1.65rem] font-medium leading-none tracking-tight">
              {site.name}
              <span className="text-gradient">.</span>
            </span>
            <span className="eyebrow hidden lg:inline">est. {site.founded}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-underline relative text-[0.95rem] font-medium transition-colors",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -right-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Magnetic strength={0.25}>
              <Link
                href="/search"
                aria-label="Search"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elevated/60 transition-colors hover:border-line-strong"
              >
                <Search size={18} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ThemeToggle />
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elevated/60 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
