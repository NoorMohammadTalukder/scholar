"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content/mdx";
import { cn } from "@/lib/utils";

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );
    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents" className="text-[0.88rem]">
      <p className="eyebrow mb-4">Contents</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-4 transition-colors duration-300",
                item.level === 3 && "pl-7 text-[0.82rem]",
                active === item.id ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
