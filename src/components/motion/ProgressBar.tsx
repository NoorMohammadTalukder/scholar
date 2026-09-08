"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="bg-gradient-accent fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX }}
    />
  );
}
