"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE, VIEWPORT } from "./constants";

const group: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={group}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ ...VIEWPORT, once }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, scale: reduce ? 1 : 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
