import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NewsPost } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export const tagLabel: Record<NewsPost["tag"], string> = {
  announcement: "Announcement",
  "call-for-papers": "Call for papers",
  event: "Event",
};

export function NewsPreview({ posts }: { posts: NewsPost[] }) {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="eyebrow mb-4">News & calls</p>
            <h2 className="display-md">What&rsquo;s happening</h2>
            <p className="mt-4 max-w-sm text-muted">Calls for papers, policy changes, and events from the editorial office.</p>
            <div className="mt-8">
              <Button href="/news" variant="outline" arrow>
                All news
              </Button>
            </div>
          </Reveal>
          <StaggerGroup className="divide-y divide-line border-t border-line" stagger={0.1}>
            {posts.map((n) => (
              <StaggerItem key={n.slug}>
                <Link href={`/news/${n.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-start" data-cursor="Read">
                  <div className="space-y-2">
                    <Badge tone={n.tag === "call-for-papers" ? "warm" : n.tag === "event" ? "accent" : "neutral"}>{tagLabel[n.tag]}</Badge>
                    <p className="font-mono text-[0.72rem] uppercase tracking-widest text-muted">{formatDate(n.date)}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl leading-tight transition-colors group-hover:text-accent">{n.title}</h3>
                    <p className="mt-2 text-[0.95rem] text-muted">{n.summary}</p>
                  </div>
                  <ArrowUpRight className="hidden self-center text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}
