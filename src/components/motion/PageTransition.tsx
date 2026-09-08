"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./constants";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="bg-gradient-accent pointer-events-none fixed inset-0 z-[70] origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0 : 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
