import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getArticlesByAuthor, getAuthor, getAuthors } from "@/lib/content";
import { toSummary } from "@/lib/content/summary";
import { Mdx } from "@/lib/content/mdx";
import { Container } from "@/components/layout/Container";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { ArticleCard } from "@/components/article/ArticleCard";

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/authors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return {};
  return { title: a.name, description: `${a.name}, ${a.affiliation}. Articles published in Scholar.` };
}

export default async function AuthorPage({ params }: PageProps<"/authors/[slug]">) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const articles = getArticlesByAuthor(slug).map(toSummary);

  return (
    <>
      <div className="pb-12 pt-32 sm:pt-44">
        <Container className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal blur>
            <Avatar name={author.name} size={160} className="shadow-card" />
          </Reveal>
          <div>
            <Reveal y={12}>
              <p className="eyebrow mb-4">{author.role ?? "Author"}</p>
            </Reveal>
            <TextReveal text={author.name} as="h1" className="display-lg" delay={0.15} />
            <Reveal delay={0.35}>
              <p className="mt-4 text-xl text-muted">
                {author.department ? `${author.department}, ` : ""}
                {author.affiliation}
                {author.country ? ` · ${author.country}` : ""}
              </p>
              <div className="prose mt-6 text-[1.05rem]">
                <Mdx source={author.body} />
              </div>
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-[0.8rem]">
                {author.orcid && (
                  <a href={`https://orcid.org/${author.orcid}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 hover:border-accent hover:text-accent">
                    ORCID {author.orcid} <ExternalLink size={12} />
                  </a>
                )}
                {author.website && (
                  <a href={author.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 hover:border-accent hover:text-accent">
                    Website <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
      <Container className="pb-24">
        <Reveal>
          <p className="eyebrow mb-6 border-t border-line pt-10">
            {articles.length} article{articles.length === 1 ? "" : "s"} in Scholar
          </p>
        </Reveal>
        <StaggerGroup className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" stagger={0.1}>
          {articles.map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleCard article={a} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </>
  );
}
