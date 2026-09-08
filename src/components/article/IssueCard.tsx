import Link from "next/link";
import type { Issue } from "@/lib/content";
import { IssueCover } from "@/components/ui/IssueCover";
import { TiltCard } from "@/components/motion/TiltCard";
import { formatDate } from "@/lib/utils";

export function IssueCard({ issue, count }: { issue: Issue; count: number }) {
  return (
    <Link href={`/issues/${issue.slug}`} className="group block" data-cursor="Open">
      <TiltCard max={7} className="rounded-[1.25rem]">
        <IssueCover
          volume={issue.volume}
          number={issue.number}
          title={issue.title}
          season={issue.season}
          year={issue.year}
          className="shadow-card"
          compact
        />
      </TiltCard>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{issue.label} · {issue.season} {issue.year}</p>
          <h3 className="mt-1.5 text-2xl transition-colors group-hover:text-accent">{issue.title}</h3>
          <p className="mt-1 text-[0.85rem] text-muted">
            {count} article{count === 1 ? "" : "s"} · {formatDate(issue.published)}
          </p>
        </div>
        {issue.current && <span className="rounded-full bg-gradient-accent px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-white">Current</span>}
      </div>
    </Link>
  );
}
