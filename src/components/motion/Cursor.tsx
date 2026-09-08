"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    let shown = false;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!shown) {
        shown = true;
        setEnabled(true);
        document.documentElement.classList.add("has-custom-cursor");
      }
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [role=button], [data-cursor]");
      setHovering(Boolean(t));
      setLabel(t?.dataset.cursor ?? null);
    };
    const leave = () => {
      setEnabled(false);
      shown = false;
      document.documentElement.classList.remove("has-custom-cursor");
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduce, x, y]);

  if (reduce || !enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/60 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{
          width: label ? 88 : hovering ? 56 : 32,
          height: label ? 88 : hovering ? 56 : 32,
          backgroundColor: label ? "rgba(255,255,255,0.95)" : hovering ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label && <span className="font-mono text-[10px] uppercase tracking-widest text-black">{label}</span>}
      </motion.div>
    </>
  );
}
