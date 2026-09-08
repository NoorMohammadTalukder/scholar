import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article, Issue } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { IssueCover } from "@/components/ui/IssueCover";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/motion/TiltCard";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { formatDate } from "@/lib/utils";

export function CurrentIssue({ issue, articles }: { issue: Issue; articles: Article[] }) {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-20">
          <Parallax speed={0.25} className="mx-auto w-full max-w-sm lg:max-w-none">
            <Reveal blur>
              <div className="group">
                <TiltCard max={9} className="rounded-[1.25rem]">
                  <IssueCover volume={issue.volume} number={issue.number} title={issue.title} season={issue.season} year={issue.year} className="shadow-card" />
                </TiltCard>
              </div>
            </Reveal>
          </Parallax>

          <div>
            <Reveal>
              <p className="eyebrow mb-4 flex items-center gap-3">
                <span className="bg-gradient-accent inline-block rounded-full px-2.5 py-0.5 text-[0.62rem] text-white">Current issue</span>
                {issue.label} · {formatDate(issue.published)}
              </p>
              <h2 className="display-md">{issue.title}</h2>
              <p className="mt-5 max-w-xl text-lg text-muted">{issue.summary}</p>
            </Reveal>

            <StaggerGroup className="mt-10 divide-y divide-line border-y border-line" stagger={0.08}>
              {articles.map((a, i) => (
                <StaggerItem key={a.slug} y={16}>
                  <Link href={`/articles/${a.slug}`} className="group flex items-baseline gap-5 py-4 transition-colors hover:text-accent" data-cursor="Read">
                    <span className="font-display w-8 shrink-0 text-2xl text-fg/25 transition-colors group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">
                      <span className="block text-[1.05rem] font-medium leading-snug">{a.title}</span>
                      <span className="block text-[0.85rem] text-muted">{a.authorDetails.map((x) => x.name).join(", ")}</span>
                    </span>
                    <ArrowUpRight size={18} className="shrink-0 self-center opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`/issues/${issue.slug}`} arrow>
                  Explore the issue
                </Button>
                <Button href="/issues" variant="ghost">
                  All issues
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
