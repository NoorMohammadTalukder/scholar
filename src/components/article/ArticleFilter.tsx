"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import type { ArticleSummary } from "@/lib/content/summary";
import { typeLabel } from "@/components/ui/Badge";
import { ArticleCard } from "./ArticleCard";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ArticleFilter({
  articles,
  keywords,
  years,
}: {
  articles: ArticleSummary[];
  keywords: string[];
  years: number[];
}) {
  const [q, setQ] = useState("");
  const [keyword, setKeyword] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const dq = useDeferredValue(q.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        if (keyword && !a.keywords.includes(keyword)) return false;
        if (type && a.type !== type) return false;
        if (year && Number(a.published.slice(0, 4)) !== year) return false;
        if (dq) {
          const hay = `${a.title} ${a.subtitle ?? ""} ${a.abstract} ${a.authors.map((x) => x.name).join(" ")} ${a.keywords.join(" ")}`.toLowerCase();
          if (!hay.includes(dq)) return false;
        }
        return true;
      }),
    [articles, keyword, type, year, dq],
  );

  const types = Array.from(new Set(articles.map((a) => a.type)));
  const active = keyword || type || year || dq;

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-[1.25rem] border border-line bg-elevated p-5 sm:p-6">
        <label className="relative block">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by title, author, or abstract"
            className="h-12 w-full rounded-full border border-line bg-bg pl-11 pr-4 text-[0.95rem] outline-none transition-colors focus:border-accent"
          />
        </label>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <ChipGroup label="Type" value={type} onChange={setType} options={types.map((t) => ({ value: t, label: typeLabel[t] }))} />
          <ChipGroup label="Year" value={year} onChange={setYear} options={years.map((y) => ({ value: y, label: String(y) }))} />
        </div>
        <ChipGroup label="Keyword" value={keyword} onChange={setKeyword} options={keywords.map((k) => ({ value: k, label: k }))} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-mono text-[0.75rem] uppercase tracking-widest text-muted">
          {filtered.length} of {articles.length} article{articles.length === 1 ? "" : "s"}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setKeyword(null);
              setType(null);
              setYear(null);
            }}
            className="flex items-center gap-1 text-[0.85rem] text-accent hover:underline"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((a) => (
            <motion.div
              key={a.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <ArticleCard article={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && (
        <p className="mt-10 rounded-[1.25rem] border border-dashed border-line-strong p-10 text-center text-muted">
          No articles match those filters.
        </p>
      )}
    </div>
  );
}

function ChipGroup<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T | null;
  onChange: (v: T | null) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-1">{label}</span>
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(selected ? null : o.value)}
            aria-pressed={selected}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[0.82rem] transition-all duration-300",
              selected ? "border-transparent bg-fg text-bg" : "border-line text-fg/80 hover:border-line-strong hover:bg-fg/[0.04]",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
