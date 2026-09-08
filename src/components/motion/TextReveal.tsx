"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./constants";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  /** Words (0-indexed) to render with the gradient treatment. */
  highlight?: number[];
  inView?: boolean;
};

export function TextReveal({
  text,
  as = "h1",
  className,
  delay = 0,
  stagger = 0.06,
  highlight = [],
  inView = false,
}: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");
  const animate = { y: "0%", opacity: 1, rotate: 0 };
  const initial = reduce ? { y: "0%", opacity: 0, rotate: 0 } : { y: "115%", opacity: 0, rotate: 4 };

  return (
    <Tag
      className={cn("inline-block", className)}
      aria-label={text}
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } } : { animate: "show" })}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block origin-bottom-left will-change-transform", highlight.includes(i) && "text-gradient")}
            variants={{ hidden: initial, show: animate }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
