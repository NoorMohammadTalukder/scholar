import type { Metadata } from "next";
import { getAllArticles, getAllKeywords } from "@/lib/content";
import { toSummary } from "@/lib/content/summary";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { ArticleFilter } from "@/components/article/ArticleFilter";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Articles",
  description: "All peer-reviewed articles published in Scholar, filterable by type, year, and keyword.",
};

export default function ArticlesPage() {
  const articles = getAllArticles().map(toSummary);
  const keywords = getAllKeywords();
  const years = Array.from(new Set(articles.map((a) => Number(a.published.slice(0, 4))))).sort((a, b) => b - a);
  return (
    <>
      <PageHeader eyebrow="Articles" title="The complete archive." lede="Every article is open access, carries a DOI, and is free to read, share, and build on." highlight={[2]} />
      <Container className="pb-24">
        <Reveal delay={0.2}>
          <ArticleFilter articles={articles} keywords={keywords} years={years} />
        </Reveal>
      </Container>
    </>
  );
}
