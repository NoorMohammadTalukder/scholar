import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArticleSummary } from "@/lib/content/summary";
import { Badge, typeLabel } from "@/components/ui/Badge";
import { cn, formatMonthYear } from "@/lib/utils";

export function ArticleCard({
  article,
  className,
  large = false,
  index,
}: {
  article: ArticleSummary;
  className?: string;
  large?: boolean;
  index?: number;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      data-cursor="Read"
      className={cn(
        "card-shine group relative flex h-full flex-col rounded-[1.25rem] border border-line bg-elevated p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-card sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={article.type === "research" ? "accent" : "warm"}>{typeLabel[article.type]}</Badge>
          {article.issue && <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{article.issue.label}</span>}
        </div>
        {index !== undefined && <span className="font-display text-2xl text-fg/20">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <h3 className={cn("mt-5 font-display leading-tight tracking-tight transition-colors group-hover:text-accent", large ? "text-3xl sm:text-4xl" : "text-[1.45rem]")}>
        {article.title}
      </h3>
      {article.subtitle && <p className="mt-2 text-[0.95rem] text-muted">{article.subtitle}</p>}
      <p className="mt-3 text-[0.92rem] text-fg/80">{article.authors.map((a) => a.name).join(", ")}</p>
      <p className={cn("mt-4 text-[0.95rem] text-muted", large ? "" : "line-clamp-3")}>{article.abstract}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="flex flex-wrap gap-1.5">
          {article.keywords.slice(0, 3).map((k) => (
            <span key={k} className="rounded-full border border-line px-2.5 py-0.5 text-[0.72rem] text-muted">
              {k}
            </span>
          ))}
        </div>
        <span className="flex shrink-0 items-center gap-1 font-mono text-[0.72rem] uppercase tracking-widest text-muted">
          {formatMonthYear(article.published)}
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </span>
      </div>
    </Link>
  );
}
