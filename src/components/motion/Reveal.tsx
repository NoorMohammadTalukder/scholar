"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, VIEWPORT } from "./constants";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  blur?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 36, duration = 0.9, once = true, blur = false }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: blur && !reduce ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration: reduce ? 0.3 : duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
