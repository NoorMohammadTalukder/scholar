import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/layout/Container";

export function PageHeader({
  eyebrow,
  title,
  lede,
  highlight,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  highlight?: number[];
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-44">
      <div
        aria-hidden
        className="animate-blob pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
      />
      <Container className="relative">
        {eyebrow && (
          <Reveal delay={0.1} y={12}>
            <p className="eyebrow mb-5">{eyebrow}</p>
          </Reveal>
        )}
        <TextReveal text={title} as="h1" className="display-lg max-w-5xl" highlight={highlight} delay={0.2} />
        {lede && (
          <Reveal delay={0.5} y={20}>
            <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{lede}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.65} y={20}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </Container>
    </div>
  );
}
