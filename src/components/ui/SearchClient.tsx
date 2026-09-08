"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "motion/react";
import { Search as SearchIcon } from "lucide-react";
import { fuseOptions, type SearchDoc } from "@/lib/search";
import { Badge } from "@/components/ui/Badge";
import { cn, formatMonthYear } from "@/lib/utils";

const kindLabel: Record<SearchDoc["kind"], string> = { article: "Article", author: "Author", news: "News", issue: "Issue" };
const kinds: SearchDoc["kind"][] = ["article", "author", "issue", "news"];

export function SearchClient({ docs }: { docs: SearchDoc[] }) {
  const initialQ = useSearchParams().get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [kind, setKind] = useState<SearchDoc["kind"] | null>(null);
  const fuse = useMemo(() => new Fuse(docs, fuseOptions), [docs]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [q]);

  const results = useMemo(() => {
    const base = q.trim() ? fuse.search(q.trim()).map((r) => r.item) : docs.filter((d) => d.kind === "article");
    return kind ? base.filter((d) => d.kind === kind) : base;
  }, [q, kind, fuse, docs]);

  return (
    <div>
      <label className="relative block">
        <SearchIcon size={22} className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-muted" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles, authors, issues, news"
          className="h-16 w-full rounded-full border border-line bg-elevated pl-16 pr-6 font-display text-xl outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)] sm:h-20 sm:text-2xl"
        />
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {kinds.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(kind === k ? null : k)}
            aria-pressed={kind === k}
            className={cn("rounded-full border px-4 py-1.5 text-[0.85rem] transition-all", kind === k ? "border-transparent bg-fg text-bg" : "border-line text-fg/80 hover:border-line-strong")}
          >
            {kindLabel[k]}s
          </button>
        ))}
        <span className="ml-auto font-mono text-[0.72rem] uppercase tracking-widest text-muted">
          {results.length} result{results.length === 1 ? "" : "s"}
          {!q.trim() && " · showing all articles"}
        </span>
      </div>

      <motion.ul layout className="mt-8 divide-y divide-line border-t border-line">
        <AnimatePresence mode="popLayout" initial={false}>
          {results.map((r) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={r.href} className="group grid gap-2 py-5 sm:grid-cols-[7rem_1fr_auto] sm:items-baseline" data-cursor="Open">
                <Badge tone={r.kind === "article" ? "accent" : r.kind === "news" ? "warm" : "neutral"}>{kindLabel[r.kind]}</Badge>
                <div className="min-w-0">
                  <p className="font-display text-xl leading-snug transition-colors group-hover:text-accent sm:text-2xl">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-[0.9rem] text-muted">{r.subtitle}</p>
                </div>
                {r.date && <span className="font-mono text-[0.72rem] uppercase tracking-widest text-muted">{formatMonthYear(r.date)}</span>}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {results.length === 0 && (
        <p className="mt-10 rounded-[1.25rem] border border-dashed border-line-strong p-10 text-center text-muted">
          Nothing matched &ldquo;{q}&rdquo;. Try a broader term or a keyword.
        </p>
      )}
    </div>
  );
}
