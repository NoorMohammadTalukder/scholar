import type { NewsPost } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export function CallForPapers({ call }: { call?: NewsPost }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="noise bg-gradient-accent relative overflow-hidden rounded-[2rem] px-6 py-16 text-white sm:px-14 sm:py-24">
          <div aria-hidden className="animate-blob absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div aria-hidden className="animate-blob absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-accent-3/40 blur-3xl [animation-delay:-9s]" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Reveal>
                <p className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-white/80">Call for papers</p>
              </Reveal>
              <TextReveal
                text={call ? call.title.replace(/^Call for Papers:\s*/i, "") : "Have work that does not fit in a lane?"}
                as="h2"
                className="display-lg"
                inView
              />
              <Reveal delay={0.3}>
                <p className="mt-6 max-w-xl text-lg text-white/85">
                  {call?.summary ?? "We welcome research articles, reviews, and perspectives that draw on two or more disciplines."}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.4}>
              <div className="flex flex-col items-start gap-6 lg:items-end">
                {call?.deadline && (
                  <div className="lg:text-right">
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/70">Deadline</p>
                    <p className="font-display text-3xl">{formatDate(call.deadline)}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Magnetic>
                    <Button href={call ? `/news/${call.slug}` : "/for-authors"} variant="inverse" size="lg" arrow className="!bg-white !text-fg hover:!bg-fg hover:!text-white">
                      Read the call
                    </Button>
                  </Magnetic>
                  <Button href="/for-authors" variant="outline" size="lg" className="border-white/50 text-white hover:border-white hover:bg-white hover:text-fg">
                    Guidelines
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
