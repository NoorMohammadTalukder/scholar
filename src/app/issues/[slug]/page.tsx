import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getArticlesForIssue, getIssue, getIssues } from "@/lib/content";
import { toSummary } from "@/lib/content/summary";
import { Mdx } from "@/lib/content/mdx";
import { Container } from "@/components/layout/Container";
import { IssueCover } from "@/components/ui/IssueCover";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/article/ArticleCard";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getIssues().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/issues/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) return {};
  return { title: `${issue.label}: ${issue.title}`, description: issue.summary };
}

export default async function IssuePage({ params }: PageProps<"/issues/[slug]">) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();
  const articles = getArticlesForIssue(issue);
  const all = getIssues();
  const idx = all.findIndex((i) => i.slug === issue.slug);
  const newer = all[idx - 1];
  const older = all[idx + 1];

  return (
    <>
      <div className="relative overflow-hidden pb-16 pt-32 sm:pt-44">
        <div aria-hidden className="animate-blob pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, var(--accent-2), transparent 65%)" }} />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
          <Reveal blur className="mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="group">
              <TiltCard max={8} className="rounded-[1.25rem]">
                <IssueCover volume={issue.volume} number={issue.number} title={issue.title} season={issue.season} year={issue.year} className="shadow-card" />
              </TiltCard>
            </div>
          </Reveal>
          <div>
            <Reveal y={12}>
              <p className="eyebrow mb-5 flex flex-wrap items-center gap-3">
                <Link href="/issues" className="hover:text-fg">Issues</Link>
                <span>/</span>
                {issue.label} · {issue.season} {issue.year}
                {issue.current && <span className="bg-gradient-accent rounded-full px-2.5 py-0.5 text-[0.62rem] text-white">Current</span>}
              </p>
            </Reveal>
            <TextReveal text={issue.title} as="h1" className="display-lg" delay={0.15} />
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-2xl text-lg text-muted">{issue.summary}</p>
              <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-widest text-muted">
                Published {formatDate(issue.published)} · {articles.length} articles
              </p>
            </Reveal>
          </div>
        </Container>
      </div>

      <Container className="grid gap-16 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-4">From the editors</p>
            <div className="prose text-[1rem]">
              <Mdx source={issue.body} />
            </div>
          </div>
        </Reveal>
        <div>
          <p className="eyebrow mb-6">In this issue</p>
          <StaggerGroup className="grid gap-5" stagger={0.1}>
            {articles.map((a, i) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={toSummary(a)} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-8">
            {older ? (
              <Link href={`/issues/${older.slug}`} className="group flex items-center gap-2 text-muted hover:text-fg">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> {older.label}: {older.title}
              </Link>
            ) : <span />}
            {newer && (
              <Link href={`/issues/${newer.slug}`} className="group flex items-center gap-2 text-muted hover:text-fg">
                {newer.label}: {newer.title} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
