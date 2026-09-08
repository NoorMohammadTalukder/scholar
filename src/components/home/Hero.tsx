"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ currentIssueHref }: { currentIssueHref: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const b1x = useTransform(sx, [0, 1], [-60, 60]);
  const b1y = useTransform(sy, [0, 1], [-40, 40]);
  const b2x = useTransform(sx, [0, 1], [50, -50]);
  const b2y = useTransform(sy, [0, 1], [30, -30]);
  const b3x = useTransform(sx, [0, 1], [-30, 30]);
  const b3y = useTransform(sy, [0, 1], [50, -50]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const chips = [
    { text: "No publication fees", delay: 0 },
    { text: "Open peer review", delay: 1.4 },
    { text: "CC BY 4.0", delay: 2.6 },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ x: b1x, y: b1y }}
          className="animate-blob absolute -left-[10%] top-[5%] h-[45vw] w-[45vw] rounded-full opacity-60 blur-3xl"
        >
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 62%)" }} />
        </motion.div>
        <motion.div
          style={{ x: b2x, y: b2y }}
          className="animate-blob absolute right-[-8%] top-[15%] h-[40vw] w-[40vw] rounded-full opacity-55 blur-3xl [animation-delay:-6s]"
        >
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--accent-2) 0%, transparent 62%)" }} />
        </motion.div>
        <motion.div
          style={{ x: b3x, y: b3y }}
          className="animate-blob absolute bottom-[-15%] left-[30%] h-[36vw] w-[36vw] rounded-full opacity-45 blur-3xl [animation-delay:-12s]"
        >
          <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, var(--accent-3) 0%, transparent 62%)" }} />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--bg))]" />
      </div>

      <Container className="relative py-16">
        <motion.p
          className="eyebrow mb-6 flex flex-wrap items-center gap-x-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Peer-reviewed · Open access · ISSN {site.issn.online}
        </motion.p>

        <TextReveal text={site.tagline} as="h1" className="display-xl max-w-[12ch]" highlight={[2, 3]} delay={0.45} stagger={0.09} />

        <motion.p
          className="mt-8 max-w-xl text-lg text-muted sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
        >
          {site.fullName} publishes rigorous work that borrows methods across fields and asks questions no single discipline could ask alone.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
        >
          <Magnetic>
            <Button href={currentIssueHref} size="lg" arrow>
              Read the current issue
            </Button>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Button href="/for-authors" size="lg" variant="outline">
              Submit your work
            </Button>
          </Magnetic>
        </motion.div>

        <div className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex xl:right-16">
          {chips.map((c, i) => (
            <motion.div
              key={c.text}
              initial={{ opacity: 0, x: 40, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: i % 2 ? 3 : -3 }}
              transition={{ duration: 1, ease: EASE, delay: 1.2 + i * 0.15 }}
              className="animate-float"
              style={{ animationDelay: `${-c.delay}s`, marginLeft: `${(i % 3) * 2.5}rem` }}
            >
              <span className="inline-block rounded-full border border-line bg-elevated/80 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-widest shadow-card backdrop-blur">
                {c.text}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col sm:flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-fg"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
