import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNews, getNewsPost } from "@/lib/content";
import { Mdx } from "@/lib/content/mdx";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { tagLabel } from "@/components/home/NewsPreview";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, openGraph: { type: "article", publishedTime: post.date } };
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();
  return (
    <Container size="narrow" className="pb-24 pt-32 sm:pt-44">
      <Reveal y={12}>
        <Link href="/news" className="mb-8 inline-flex items-center gap-2 text-[0.9rem] text-muted hover:text-fg">
          <ArrowLeft size={14} /> All news
        </Link>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge tone={post.tag === "call-for-papers" ? "warm" : post.tag === "event" ? "accent" : "neutral"}>{tagLabel[post.tag]}</Badge>
          <span className="eyebrow">{formatDate(post.date)}</span>
        </div>
      </Reveal>
      <TextReveal text={post.title} as="h1" className="display-md" delay={0.15} stagger={0.04} />
      <Reveal delay={0.4}>
        <p className="mt-6 text-xl text-muted">{post.summary}</p>
        {post.deadline && (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-accent/30 bg-accent-soft p-6">
            <div>
              <p className="eyebrow !text-accent">Submission deadline</p>
              <p className="font-display text-3xl">{formatDate(post.deadline)}</p>
            </div>
            <Button href="/for-authors" arrow>
              How to submit
            </Button>
          </div>
        )}
        <div className="prose mt-10">
          <Mdx source={post.body} />
        </div>
      </Reveal>
    </Container>
  );
}
