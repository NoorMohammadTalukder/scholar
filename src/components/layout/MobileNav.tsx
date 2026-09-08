"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [...nav, { href: "/search", label: "Search" }, { href: "/contact", label: "Contact" }];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-10 pt-28 md:hidden"
          initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {links.map((item, i) => (
              <div key={item.href} className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display block py-2 text-[2.6rem] leading-none tracking-tight transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              </div>
            ))}
          </nav>
          <motion.p
            className="eyebrow mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {site.fullName} · ISSN {site.issn.online}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
