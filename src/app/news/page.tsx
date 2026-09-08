import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getNews } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { tagLabel } from "@/components/home/NewsPreview";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "News", description: "Announcements, calls for papers, and events from Scholar." };

export default function NewsPage() {
  const posts = getNews();
  return (
    <>
      <PageHeader eyebrow="News" title="Calls, announcements, events." highlight={[0]} />
      <Container className="pb-24">
        <StaggerGroup className="divide-y divide-line border-t border-line" stagger={0.08}>
          {posts.map((n) => (
            <StaggerItem key={n.slug}>
              <Link href={`/news/${n.slug}`} className="group grid gap-4 py-8 md:grid-cols-[12rem_1fr_auto] md:items-start" data-cursor="Read">
                <div className="space-y-2">
                  <Badge tone={n.tag === "call-for-papers" ? "warm" : n.tag === "event" ? "accent" : "neutral"}>{tagLabel[n.tag]}</Badge>
                  <p className="font-mono text-[0.72rem] uppercase tracking-widest text-muted">{formatDate(n.date)}</p>
                  {n.deadline && <p className="font-mono text-[0.72rem] uppercase tracking-widest text-accent-2">Deadline {formatDate(n.deadline)}</p>}
                </div>
                <div>
                  <h2 className="text-3xl leading-tight transition-colors group-hover:text-accent">{n.title}</h2>
                  <p className="mt-3 max-w-2xl text-muted">{n.summary}</p>
                </div>
                <ArrowUpRight className="hidden self-center text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </>
  );
}
