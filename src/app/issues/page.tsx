import type { Metadata } from "next";
import { getArticlesForIssue, getIssues } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { IssueCard } from "@/components/article/IssueCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Issues",
  description: "Browse every volume and issue of Scholar.",
};

export default function IssuesPage() {
  const issues = getIssues();
  const byYear = new Map<number, typeof issues>();
  for (const i of issues) byYear.set(i.year, [...(byYear.get(i.year) ?? []), i]);

  return (
    <>
      <PageHeader eyebrow="Archive" title="Every issue, every volume." lede="Each issue is a curated set of articles with an editorial note. Older issues remain open and citable indefinitely." highlight={[1]} />
      <Container className="pb-24">
        {[...byYear.entries()].map(([year, list]) => (
          <div key={year} className="grid gap-8 border-t border-line py-12 lg:grid-cols-[10rem_1fr]">
            <p className="font-display text-4xl text-fg/30">{year}</p>
            <StaggerGroup className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
              {list.map((issue) => (
                <StaggerItem key={issue.slug}>
                  <IssueCard issue={issue} count={getArticlesForIssue(issue).length} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </Container>
    </>
  );
}
