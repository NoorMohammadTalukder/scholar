import type { ArticleSummary } from "@/lib/content/summary";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";

export function FeaturedArticles({ articles }: { articles: ArticleSummary[] }) {
  return (
    <Section className="bg-elevated/60">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4">Featured research</p>
            <h2 className="display-md max-w-2xl">Work that refuses to stay in its lane</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Button href="/articles" variant="outline" arrow>
              Browse all articles
            </Button>
          </Reveal>
        </div>
        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
          {articles.map((a, i) => (
            <StaggerItem key={a.slug} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
              <ArticleCard article={a} large={i === 0} index={i} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
